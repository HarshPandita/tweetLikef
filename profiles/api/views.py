from django.shortcuts import render,redirect
from django.http import HttpResponse,Http404,JsonResponse
import random
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.conf import settings
from ..models import Profile

from rest_framework.decorators import api_view,permission_classes,authentication_classes # Create your views here.
from rest_framework.authentication import SessionAuthentication
from django.contrib.auth import get_user_model


User=get_user_model()

@api_view(['POST','GET'])
@authentication_classes([SessionAuthentication])
@permission_classes([IsAuthenticated])
def user_follow_view(request,username,*args,**kwargs):
    me=request.user
    other_user_qs=User.objects.filter(username=username)
    if me.username==username:
        my_followers=me.profile.followers.all()
        return Response({"count":current_followers_qs.count()},status=200)

    if not other_user_qs.exists():
        return Response({},status=404)
    other=other_user_qs.first()
    profile=other.profile
    data={}
    try:
        data=request.data or {}
    except:
        pass
    print(data)
    action=data.get("action")
    if action=="follow":
        profile.followers.add(me) 

    elif action=="unfollow" :
        profile.followers.remove(me)
    else:
        pass
    current_followers_qs=profile.followers.all()
    return Response({"count":current_followers_qs.count()},status=200)




@api_view(['POST','GET'])
@permission_classes([IsAuthenticated])
def tweet_list_view(request,*args,**kwargs):
    qs=Tweet.objects.all()
    username=request.GET.get('username')
    if username!=None:
        qs=qs.filter(user__username__iexact=username)
    serializer=TweetSerializer(qs,many=True)

    return Response(serializer.data,status=200)
