from django.db import models
import uuid

class Post(models.Model):
    id=models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False
    )
    title= models.TextField()
    body = models.TextField()
    image= models.ImageField(upload_to="post_images")
    genre = models.CharField(max_length=20, default="")
    date_created = models.DateTimeField(auto_now_add=True)
    time_required = models.IntegerField()
    likes = models.IntegerField()
    def __str__(self):
        return self.title

class Comment(models.Model):
    id=models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False
    )
    author = models.CharField(max_length=30, blank=False, null=False)
    content = models.TextField(blank=False, null=False)
    post = models.ForeignKey('Post', on_delete=models.CASCADE, related_name="comments")
    date_created = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return f"{self.content} by {self.author}"