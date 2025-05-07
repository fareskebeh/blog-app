from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Post, Comment
from django.db.models import Q
from django.db import DatabaseError
from .serializers import SinglePostSerializer, BulkPostSerializer, CommentSerializer


@api_view(["GET"])
def post_list(request):
    if request.method == "GET":
        posts = Post.objects.all()
        serializer = BulkPostSerializer(posts, many=True)
    return Response({"data": serializer.data}, status=200)


@api_view(["GET"])
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
def like(request):
    pass

@api_view(["GET"])
def search(request):
    if request.method=="GET":
        query= request.GET.get("q", "").strip()
        posts = Post.objects.filter(Q(title__icontains=query) | Q(genre__icontains=query))
        if posts.exists():
            serializer= BulkPostSerializer(posts, many=True)

            return Response({"data": serializer.data}, status=200)
        else:   
            return Response({"error":"No posts found"}, status=404)