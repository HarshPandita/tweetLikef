"""tweetLike URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path,include,re_path
from accounts.views import(
login_view,
logout_view,
register_view,
)
from tweets.views import (
tweets_detail_view,
tweets_list_view,

)
from django.views.generic import TemplateView
urlpatterns = [
    path('admin/',admin.site.urls),
    path('login/', login_view),
    path('logout/', logout_view),
    path('register/', register_view),
    path('', tweets_list_view),
    path('<int:tweet_id>/',tweets_detail_view),

    re_path(r'profiles?/',include('profiles.urls')),
    #path('api/tweets/<str:tweet_id>/delete',tweet_delete_view),
    #path('api/tweets/action',tweet_action_view),
    path('api/tweets/',include('tweets.api.urls')),
    re_path(r'api/profiles?/',include('profiles.api.urls')),


]
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
