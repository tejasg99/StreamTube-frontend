import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useToggleLike } from "../../hooks/like.hook";
import LoginPopup from "../index";
import { IconContext } from "react-icons";
import { FaRegThumbsUp, FaThumbsUp } from "react-icons/fa";

function Like({ id, isliked, likesCount, type, className, iconSize }) {
    const authStatus = useSelector((state) => state.auth.authStatus);
    const [isLikedState, setIsLikedState] = useState(isliked)
    const [likesCountState, setLikesCountState] = useState(likesCount)
    const [showLoginPopup, setShowLoginPopup] = useState(false)

    const { mutateAsync: like } = useToggleLike(
        type === "comments" ? "comment": type === "videos" ? "video": "tweet"
    )

    useEffect(() => {
        setIsLikedState(isliked);
        setLikesCountState(likesCount);
    }, [isliked, likesCount])
    
    const handleLike = async () => {
        if(!authStatus) {
            return setShowLoginPopup(true)
        }
        
        await like(id);

        setIsLikedState((prev) => !prev);
        setLikesCountState((prev) => (isLikedState ? prev - 1 : prev + 1)) //to add or subtract like count for the particular type
    };

    if(showLoginPopup) {
        return (
            <LoginPopup 
                loginTo={`Like ${type}`}
                onClose={() => setShowLoginPopup(false)}
            />
        )
    }

    return (
        <div className={`flex justify-center items-center rounded-lg border`}>
            <IconContext.Provider value={{ className: `${iconSize}`}}>
                <button
                onClick={handleLike}
                className={`${className} w-full justify-center flex items-center gap-x-1 py-1.5 hover:bg-white/10`}
                >
                    <span className="inline-block">
                        {isLikedState ? <FaThumbsUp /> : <FaRegThumbsUp />}
                    </span>
                    <span className="text-md text-gray-400">
                        {likesCountState}
                    </span>
                </button>
            </IconContext.Provider>
        </div>
    );
}

export default Like;
