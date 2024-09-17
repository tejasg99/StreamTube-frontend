import { useState } from 'react';
import {AllNextVideos, UserNextVideos} from "../index";

function NextVideosColumn({videoId, name, userId}) {
    const [nextVideosOption, setNextVideosOption] = useState("all");

  return (
    <>
        <div className='flex gap-3'>
            <button
            onClick={() => setNextVideosOption("all")}
            className={`
                ${nextVideosOption === "all" ? "bg-blue-500 text-white" : "bg-gray-500 text-gray-200"}
                hover:bg-blue-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
            >
                All
            </button>
            <button
            onClick={() => setNextVideosOption("user")}
            className={`
                ${nextVideosOption === "user" ? "bg-blue-500 text-white" : "bg-gray-500 text-gray-200"}
                hover:bg-blue-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
            >
                By {name}
            </button>
        </div>
        {nextVideosOption === "all" ? (
            <AllNextVideos currentVideoId={videoId}/>
        ) : (
            <UserNextVideos userId={userId}/>
        )}
    </>
  )
};

export default NextVideosColumn;