import React , {useEffect,useState} from 'react'

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

export function backendlookup(method , endpoint, callback, data){
  console.log(typeof data)
  console.log(data)
  let jsonData

  let Data
  if(data){
    Data=data.content
    jsonData=JSON.stringify(data)
  }
  // if (data){
  //   jsonData=JSON.stringify(data)
  // }



    const xhr=new XMLHttpRequest()
    const url=`http://localhost:8000/api${endpoint}`

    xhr.responseType="json"
    const csrftoken = getCookie('csrftoken');
    xhr.open(method,url)
    xhr.withCredentials = true;
    if(csrftoken){
        xhr.setRequestHeader("HTTP_X_REQUESTED_WITH", "XMLHttpRequest");
        xhr.setRequestHeader("X-CSRFToken",getCookie('csrftoken'));
    }
    xhr.onload = function(){
      if (xhr.status===403 && xhr.response ){
        const detail = xhr.response.detail
        if(detail==="Authentication credentials were not provided."){
          window.location.href="/login"
        }
      }
      callback(xhr.response,xhr.status)

    }
    xhr.onerror=function(e){
      console.log("error",e)
      console.log("hello")

      callback({"message":"the request was error"},400)
    }
    var formData = new FormData();
    if (data){

      if(data.action && data.action ==="like" ){
        formData.append("id", data.id);
        formData.append("action", data.action);
      }
      else if(data.action && data.action ==="retweet" ){
        formData.append("id", data.id);
        formData.append("action", data.action);
        formData.append("content", data.content);
      }
      else if(data.action && data.action ==="unlike" ){
        formData.append("id", data.id);
        formData.append("action", data.action);
      }
      else{
        formData.append("content", Data);
      }
        console.log(...formData)
    }



    xhr.send(formData)

}
