from rest_framework import serializers
from . import models
from django.utils.timesince import timesince
from profiles.serializers import ProfileInfo 

class CommentSerializer(serializers.ModelSerializer):
    author = ProfileInfo(many=False, read_only=True)
    date_created= serializers.SerializerMethodField()
    class Meta:
        model = models.Comment
        fields = "__all__"
    def get_date_created(self,obj):
        return f"{timesince(obj.date_created).split(',')[0]} ago"

class SinglePostSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True, read_only = True)
    date_created = serializers.SerializerMethodField()
    class Meta:
        model = models.Post
        fields = "__all__"
    def get_date_created(self,obj):
        return obj.date_created.strftime("%B %d, %Y")

class BulkPostSerializer(serializers.ModelSerializer):
    date_created= serializers.SerializerMethodField()
    comment_count = serializers.SerializerMethodField()

    class Meta:
        model = models.Post
        fields = ["id","title","image","genre", "date_created", "time_required", "likes","comment_count"]
    def get_date_created(self,obj):
        return obj.date_created.strftime("%B %d, %Y")
    def get_comment_count(self,obj):
        return obj.comments.count()