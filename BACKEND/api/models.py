from django.db import models
import uuid
from profiles.models import Profile

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
    likes = models.ManyToManyField(Profile, related_name="likes")
    def __str__(self):
        return self.title
    
class SavedPost(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE)
    post= models.ForeignKey(Post, on_delete=models.CASCADE)
    save_date=models.DateTimeField(auto_now_add=True)

class Comment(models.Model):
    id=models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False
    )
    author = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name="author")
    content = models.TextField(blank=False, null=False)
    post = models.ForeignKey('Post', on_delete=models.CASCADE, related_name="comments")
    date_created = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return f"{self.content} by {self.author}"