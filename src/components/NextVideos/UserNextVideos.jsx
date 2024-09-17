import React from 'react';
import { useAllVideos } from "../../hooks/video.hook";
import { Link } from 'react-router-dom';
import NextVideoCard from './NextVideoCard';

function UserNextVideos({ userId }) {
    const {data: userVideos, isFetched} = useAllVideos({ userId });

  return (
    <>
        {isFetched && 
        userVideos?.pages.map((page, index) => {
            return (
                <React.Fragment key={index}>
                    {isFetched && 
                    page.docs.map((video) => {
                        return (
                            <Link to={`/videos/${video._id}`} key={video._id}>
                                <NextVideoCard video={video}/>
                            </Link>
                        )
                    })}
                </React.Fragment>
            )
        })}
    </>
  )
}

export default UserNextVideos