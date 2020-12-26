from django.shortcuts import render,redirect
from django.http import HttpResponse,Http404,JsonResponse
import random
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.conf import settings
from .forms import TweetForm
from .models import Tweet
from .serializers import TweetSerializer,TweetActionSerializer,TweetCreateSerializer
from rest_framework.decorators import api_view,permission_classes,authentication_classes # Create your views here.
from rest_framework.authentication import SessionAuthentication
from django.views.decorators.csrf import csrf_exempt


def tweet_list_view_pure_django(request,*args,**kwargs):
    qs=Tweet.objects.all()
    tweet_list=[x.serialize() for x in qs]

    data={"isUser":False,"response":tweet_list}
    return JsonResponse(data)

def tweets_list_view(request,*args,**kwargs):
    return render(request,"tweets/list.html")

def tweets_detail_view(request,tweet_id,*args,**kwargs):
    return render(request,"tweets/detail.html",context={"tweet_id":tweet_id})

# def tweets_profile_view(request,username,*args,**kwargs):
#         return render(request,"tweets/profile.html",context={"profile_username":username})


def home_view(request,*args,**kwargs):
    return render(request,"pages/home.html")

def tweet_create_view_pure_django(request,*args,**kwargs):
    user = request.user
    if not request.user.is_authenticated:
        user=None
        if request.is_ajax():
            return JsonResponse({},status=401)
        return redirect(settings.LOGIN_URL)
    form=TweetForm(request.POST or None)
    next_url=request.POST.get("next") or None

    if form.is_valid():
        obj = form.save(commit=False)
        obj.user = user or None
        obj.save()
        if request.is_ajax():
            return(JsonResponse(obj.serialize(),status=201))
        if next_url != None:
            return redirect(next_url)
        form=TweetForm()

        if form.errors:
            if request.is_ajax():
                return JsonResponse(form.errors,status=400)
    return render(request,"components/form.html",context={'form':form})



def tweet_detail_view_pure_django(request,tweet_id,*args,**kwargs):
    data={"id":tweet_id,
        }
    status=200
    try:
        obj=Tweet.objects.get(id=tweet_id)
        data['content']=obj.content

    except:
        data['message']="not found"
        status=404



    return JsonResponse(data,status=status)
