import React , {useEffect,useState} from 'react'
import {apiTweetList} from './lookup'
import {Tweet} from './detail'

export function TweetsList(props){
  const [tweetsInit,setTweetsInit]=useState([])
  const[tweets,setTweets]=useState([])
  const [tweetsDidSet,setTweetsDidSet]=useState(false)
  useEffect(()=>{
    const final=[...props.newTweets].concat(tweetsInit)
    if (final.length!==tweets.length){
      setTweets(final)
    }
  }, [props.newTweets,tweets,tweetsInit])
  useEffect(()=>{
    if(tweetsDidSet ===false){
    const handTweetListLookup=(response,status)=>{
      if (status===200){
        setTweetsInit(response)
        setTweetsDidSet(true)
      }else{
        alert("there was am error")
      }
    }
    apiTweetList(props.username,handTweetListLookup)}
},[tweetsInit,tweetsDidSet,setTweetsDidSet,props.username])
const handleDidRetweet=(newTweet)=>{
    const updatedTweetsInit=[...tweetsInit]
    updatedTweetsInit.unshift(newTweet)
    setTweetsInit(updatedTweetsInit)

    const updateFinalTweets=[...tweetsInit]
    updateFinalTweets.unshift(newTweet)
    setTweets(updateFinalTweets)
}
  return tweets.map((item,index)=>{
      return <Tweet
      tweet ={item}
      didRetweet={handleDidRetweet}
      className='my-5 py-5 border bg-white text-dark' key={'${index}-{item.id}'} />
    })}
