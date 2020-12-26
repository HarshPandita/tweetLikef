from django.contrib import admin

# Register your models here.
from .models import Tweet,TweetLike


class TweetLikeAdmin(admin.TabularInline):
    model=TweetLike


class TweetAdmin(admin.ModelAdmin):
    inlines=[TweetLikeAdmin]
    list_display=['__str__','user']
    search_fields=['cotent','user__username', 'user__emaill']
    class Meta:
        model=Tweet
admin.site.register(Tweet,TweetAdmin)
