import React , {useEffect,useState} from 'react'
import {TweetsList} from './list'
import {Tweet} from './detail'
import {TweetCreate} from './create'
import {apiTweetDetail} from './lookup'

 export function TweetsComponent(props) {
   const [newTweets,setNewTweets]=useState([])
   const canTweet = props.canTweet ==="false" ? false : true
   const handleNewTweet=(response, status)=>{
     let tempNewTweets=[...newTweets]
     tempNewTweets.unshift(response)
     setNewTweets(tempNewTweets)
   }
    return<div className={props.className}>
    {canTweet===true && <TweetCreate didTweet={handleNewTweet} className='col-12 mb-3'/> }
    <TweetsList newTweets={newTweets} {...props}/>
   </div>

}

export function TweetDetailComponent(props) {
  const{tweetId}=props
  const[didlookup,setDidLookup]=useState(false)
  const [tweet,setTweet]= useState(null)
  const handleBackendLookup=(response,status)=>{
    if (status===200){
      setTweet(response)
    }else{
      alert("error there was")
    }
  }
  useEffect(()=>{
    if(didlookup ===false){
      apiTweetDetail(tweetId,handleBackendLookup)
      setDidLookup(true)
    }

  },[tweetId,didlookup,setDidLookup])

return tweet===null ? null : <Tweet tweet={tweet} className={props.className}/>
}
