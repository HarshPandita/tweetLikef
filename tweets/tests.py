from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
# Create your tests here.
User=get_user_model()
from .models import Tweet
class TweetTestCase(TestCase):
    def setUp(self):
        self.user=User.objects.create_user(username='cfe',password='somepassword')
        Tweet.objects.create(content="my tweet",user=self.user)
        Tweet.objects.create(content="my tweet",user=self.user)
        Tweet.objects.create(content="my tweet",user=self.user)

    def test_tweet_created(self):
        tweet_obj = Tweet.objects.create(content="my II tweet",user=self.user)
        self.assertEqual(tweet_obj.id,4)
        self.assertEqual(tweet_obj.user,self.user)

    def get_client(self):
        client = APIClient()
        client.login(username=self.user.username, password='secret')
        return client

    def test_tweet_list(self):
        client=self.get_client()
        response=client.get("/api/tweets/")
        self.assertEqual(response.status_code,200)
        self.assertEqual(len(response.json()),3)

    def test_action_like(self):
        client=self.get_client()
        response=client.get("/api/tweets/action/",{"id":1,"action":"like"})
        self.assertEqual(response.status_code,405)
        like_count=response.json().get("likes")
        self.assertEqual(like_count,1)
        print(response.json())
        #self.assertEqual(len(response.json()),3)
