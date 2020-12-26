from django import forms

from .models import Tweet
MAXTLENGTH=200

class TweetForm(forms.ModelForm):
    class Meta:
        model=Tweet
        fields=['content']

    def clean_content(self):
        content=self.cleaned_data.get("content")
        if len(content) > MAXTLENGTH:
            raise forms.ValidationError("TOO LONG!")
        return content
