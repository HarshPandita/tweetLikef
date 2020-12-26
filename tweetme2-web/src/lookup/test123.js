import React , {useEffect,useState} from 'react'
import {apiTweetAction,apiTweetCreate,apiTweetList} from './lookup'

 export function TweetsComponent(props) {
   const textAreaRef=React.createRef()
   const [newTweets,setNewTweets]=useState([])

   const handleBackendUpdate=(response, status)=>{
     let tempNewTweets=[...newTweets]

     if (status ===201){
       tempNewTweets.unshift(response)
         setNewTweets(tempNewTweets)
     }else{
       console.log(response)
       console.log("hello")
       alert("an error occuredmam")
     }
   }

   const handleSubmit=(event) =>{
      event.preventDefault()
      console.log(textAreaRef.current.value)
      const newVal=textAreaRef.current.value
      let tempNewTweets=[...newTweets]

      apiTweetCreate(newVal,handleBackendUpdate)


      textAreaRef.current.value=''
    }
    return<div className={props.className}>
    <div className='col-12 mb-3'>
    <form onSubmit={handleSubmit}>
    <textarea ref={textAreaRef}required={true} className='form-control' name='tweet'>

    </textarea>
    <button type='submit' className='btn btn-primary my-3'>Tweet </button>>

   </form>
   </div>
   <TweetsList newTweets={newTweets}/>
   </div>

}
 export function ActionBtn(props){
  const {tweet,action,didPerformAction}=props
  const likes=tweet.likes ? tweet.likes :0

  const className=props.className ? props.className : 'btn btn-primary btn-sm'
  const actionDisplay=action.display ? action.display :'Action'
  const handleClick=(event) => {
    event.preventDefault()
    const handleActionBackendEvent =(response,status)=>{
      console.log(response,status)
      if ((status===200 || status===201) && didPerformAction) {
          //setLikes(response.likes)
          didPerformAction(response)
        //  setUserLike(true)
      }

    }
    apiTweetAction(tweet.id,action.type,handleActionBackendEvent)

  }
  const display = action.type === 'like' ?  `${likes} ${actionDisplay}` : actionDisplay
  return  <button className={className} onClick={handleClick}>{display} </button>

}
export function ParentTweet(props){
  const {tweet} = props
  return tweet.parent ? <div className='row'>
        <div className='col-11 mx-auto p-3 border rounded'>
          <p className='mb-0 text-muted small'>Retweet</p>
          <Tweet className={' '} tweet={tweet.parent} />
          </div>
          </div> : null
}


export function Tweet(props){
  const [actionTweet,setActionTweet]=useState(props.tweet ? props.tweet : null)
  const {tweet}=props
  const className=props.className ? props.className : 'col-10 mx-auto col-md-6'
  const handlePerformAction =(newActionTweet)=>{
    setActionTweet(newActionTweet)
    //setActionTweet(null)

  }
  return <div className={className}>
        <div>
          <p>{tweet.id} - {tweet.content}</p>
          <ParentTweet tweet={tweet} />
        </div>
        {actionTweet && <div className='btn btn-group'>
        <ActionBtn tweet={actionTweet} didPerformAction={handlePerformAction} action={{type:"like",display:"Like"}}/>
        <ActionBtn tweet={actionTweet} didPerformAction={handlePerformAction} action={{type:"unlike",display:"Unlike"}}/>
        <ActionBtn tweet={actionTweet} didPerformAction={handlePerformAction} action={{type:"retweet",display:"Retweet"}}/>
        </div>
      }
  </div>
}


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
    apiTweetList(handTweetListLookup)}
},[tweetsInit,tweetsDidSet,setTweetsDidSet])
  return tweets.map((item,index)=>{
      return <Tweet tweet ={item} className='my-5 py-5 border bg-white text-dark' key={'${index}-{item.id}'} />
    })}
