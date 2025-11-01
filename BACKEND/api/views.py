from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from .models import Post, Comment, SavedPost
from django.db.models import Q
from django.db import DatabaseError
from .serializers import SinglePostSerializer, BulkPostSerializer, CommentSerializer
from django.shortcuts import get_object_or_404
from django.http import Http404
from rest_framework import status


@api_view(["GET"])
@permission_classes([AllowAny])
def post_list(request):
    if request.method == "GET":
        posts = Post.objects.all()
        serializer = BulkPostSerializer(posts, many=True)
    return Response({"data": serializer.data}, status=200)


@api_view(["GET"])
@permission_classes([AllowAny])
def review_post(request, pk):
    try:
        post = Post.objects.get(id=pk)
        comments = Comment.objects.filter(post=post)
        if post:
            serializer = SinglePostSerializer(post)
            com_seri = CommentSerializer(comments)
            return Response({"data": serializer.data}, status=200)
        elif Post.DoesNotExist:
            return Response({"error": "Post not found"}, status=404)
    except Exception as e:
        return Response({"error": str(e)}, status=500)


@api_view(["POST"])
def comment(request, pk):
    if request.method == "POST":
        author = request.data.get("author")
        content = request.data.get("content")

        if not author or not content:
            return Response({"error": "Missing required fields."}, status=400)
        try:
            post = Post.objects.get(id=pk)
            Comment.objects.create(author=author, content=content, post=post)
            return Response({"message": "Comment added!"}, status=201)
        except Exception as e:
            return Response({"error": str(e)}, status=500)


@api_view(["GET"])
@permission_classes([AllowAny])
def latest(request):
    if request.method == "GET":
        try:
            posts = Post.objects.order_by("-date_created")[:3]
            latest_ser = BulkPostSerializer(posts, many=True)
            return Response({"data": latest_ser.data}, status=200)
        except DatabaseError as db_err:
            return Response({"error": str(db_err)}, status=500)
        except Exception as e:
            return Response({"error": str(e)}, status=500)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def save_post(request):
    post_id=request.data.get("id")
    if not post_id:
        return Response({'error':"Missing post ID"}, status=status.HTTP_400_BAD_REQUEST)
    try:
        post = get_object_or_404(Post, pk=post_id)
    except Http404:
        return Response({"error":"Post not found"}, status=status.HTTP_404_NOT_FOUND)
    profile = request.user.user_profile
    try:
        SavedPost.objects.create(post=post, profile=profile)
    except Exception as e:
        return Response({"error": "Internal Server Error"},status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    return Response({"data":"Post Saved"}, status=status.HTTP_200_OK)


@api_view(["GET"])
@permission_classes([AllowAny])
def search(request):
    if request.method=="GET":
        query= request.GET.get("q", "").strip()
        posts = Post.objects.filter(Q(title__icontains=query) | Q(genre__icontains=query))
        if posts.exists():
            serializer= BulkPostSerializer(posts, many=True)

            return Response({"data": serializer.data}, status=200)
        else:   
            return Response({"error":"No posts found"}, status=404)