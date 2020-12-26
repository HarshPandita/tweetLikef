from rest_framework import serializers
from .models import Tweet
from django.conf import settings
from profiles.serializers import PublicProfileSerializer

TWEET_ACTION_OPTIONS=settings.TWEET_ACTION_OPTIONS
MAXTLENGTH=settings.MAXTLENGTH
class TweetActionSerializer(serializers.Serializer):
    id=serializers.IntegerField()
    action=serializers.CharField()
    content =serializers.CharField(allow_blank=True,required=False)

    def validate_action(self,value):
        value=value.lower().strip()
        if not value in TWEET_ACTION_OPTIONS:
            raise serializer.ValidationError("not a vvalid option for tweets")
        return value


class TweetCreateSerializer(serializers.ModelSerializer):
    user=PublicProfileSerializer(source='user.profile',read_only=True)#serializers.SerializerMethodField(read_only=True)

    likes=serializers.SerializerMethodField(read_only=True)


    class Meta:
        model=Tweet
        fields=['user','id','content','likes','timestamp']
    def get_likes(self,obj):
        return obj.likes.count()
    def validate_content(self,value):
        if len(value) > MAXTLENGTH:
            raise serializers.ValidationError("TOO LONG!")
        return value
    # def get_user(self,obj):
    #     return obj.user.id

class TweetSerializer(serializers.ModelSerializer):
    user=PublicProfileSerializer(source='user.profile',read_only=True)
    likes=serializers.SerializerMethodField(read_only=True)
    parent=TweetCreateSerializer(read_only=True)
    #is_retweet=serializers.SerializerMethodField(read_only=True)
    class Meta:
        model=Tweet
        fields=['user','id','content','likes','is_retweet','parent','timestamp']

    def get_likes(self,obj):
        return obj.likes.count()
    # def get_user(self,obj):
    #     return obj.user.id
    '''def get_content(self,obj):
        content = obj.content

        if obj.is_retweet:
            content = obj.parent.content

        return content'''
