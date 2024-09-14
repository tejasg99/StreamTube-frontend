import { useState } from 'react';
import { useCreateTweet } from "../../hooks/tweet.hook";
import { useSelector } from 'react-redux';
import LoginPopup from "../index";

function TweetInput() {
    const authStatus = useSelector((state) => state.auth.authStatus);
    const [showLoginPopup, setShowLoginPopup] = useState(false);
    const [tweet, setTweet] = useState(""); 

    const {mutateAsync: addTweet, isPending} = useCreateTweet();

    const postTweet = async () => {
        if(!authStatus) {
            return setShowLoginPopup(true);
        }
        await addTweet({ tweet });
        setTweet("");
    }

    if(showLoginPopup) {
        return (
            <LoginPopup 
            loginTo={"Post a tweet"}
            onClose={() => setShowLoginPopup(false)}
            />
        );
    }

  return (
    <div className='w-full mt-3'>
        <textarea 
        className='w-full bg-transparent p-2 border rounded-lg border-slate-300'
        value={tweet}
        onChange={(e) => setTweet(e.target.value)}
        ></textarea>
        <button 
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        onClick={postTweet}
        >   
            Post
        </button>
    </div>
  );
}

export default TweetInput