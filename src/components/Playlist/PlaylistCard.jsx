import { useState } from 'react';
import { timeAgo } from "../../assets/timeAgo";
import { useDeletePlaylist } from "../../hooks/playlist.hook";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DeletePopup, PlayListForm} from "../index";
import defaultCover from "../../assets/defaultCoverImage.jpg";


function PlaylistCard({ playlist, isEditAndDelete = false }) {
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);
    const isOwner = user?._id === playlist?.owner?._id;
    const [showPlaylistForm, setShowPlaylistForm] = useState(false);
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const { mutateAsync: deletePlaylist, isPending} = useDeletePlaylist();

    const handlePlaylistForm = () => {
        setShowPlaylistForm((prev) => !prev);
    }

    const handleDeletePlaylist = async () => {
        const res = await deletePlaylist(playlist._id);
        if(res) {
            navigate(`/channel/${user?.username}/playlist`);
        }
    };

  return (
    <>
        <div className='w-[100%]'>
            <div className='relative mb-2 w-full pt-[56%]'>
                <div className='absolute inset-0'>
                    <img 
                    src={playlist?.coverImage || defaultCover} 
                    alt={playlist?.name}
                    className='h-full w-full' 
                    />
                    <div className='absolute inset-x-0 bottom-0'>
                        <div className='relative border-t bg-white/30 p-4 text-white backdrop-blur-sm before:absolute before:inset-0 before:bg-black/40'>
                            <div className='relative z-[1]'>
                                <p className='flex justify-between'>
                                    <span className='inline-block'>
                                        Playlist
                                    </span>
                                    <span className='inline-block'>
                                        {playlist?.totalVideos} videos
                                    </span>
                                </p>
                                <p className='text-sm text-gray-200'>
                                    {playlist?.totalViews} Views · {timeAgo(playlist?.updatedAt)}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full flex justify-between'>
                <div>
                    <h6 className="mb-1 font-semibold">{playlist?.name}</h6>
                    <p className="flex text-sm text-gray-200">
                    {playlist?.description}
                    </p>
                </div>
                {isEditAndDelete && isOwner && (
                    <div className='flex gap-x-2'>
                        <button 
                        onClick={handlePlaylistForm}
                        className='text-white w-10 h-10 bg-blue-500 p-1 rounded-lg'
                        >
                            <svg width="100%" height="100%" viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000" strokeWidth="0.8640000000000001" transform="rotate(0)"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="0.144"></g><g id="SVGRepo_iconCarrier"><path fillRule="evenodd" clipRule="evenodd" d="m3.99 16.854-1.314 3.504a.75.75 0 0 0 .966.965l3.503-1.314a3 3 0 0 0 1.068-.687L18.36 9.175s-.354-1.061-1.414-2.122c-1.06-1.06-2.122-1.414-2.122-1.414L4.677 15.786a3 3 0 0 0-.687 1.068zm12.249-12.63 1.383-1.383c.248-.248.579-.406.925-.348.487.08 1.232.322 1.934 1.025.703.703.945 1.447 1.025 1.934.058.346-.1.677-.348.925L19.774 7.76s-.353-1.06-1.414-2.12c-1.06-1.062-2.121-1.415-2.121-1.415z" fill="#fcfcfc"></path></g></svg>

                        </button>
                        <button 
                        onClick={() => setShowDeletePopup(true)}
                        className='text-white w-10 h-10 bg-red-600 p-1 rounded-lg'
                        >
                            <svg width="100%" height="100%" viewBox="-102.4 -102.4 1228.80 1228.80" className="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000" stroke="#000000" strokeWidth="0.01024"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M724.3 198H296.1l54.1-146.6h320z" fill="#ffffff"></path><path d="M724.3 216.5H296.1c-6.1 0-11.7-3-15.2-7.9-3.5-5-4.3-11.3-2.2-17L332.8 45c2.7-7.3 9.6-12.1 17.4-12.1h320c7.7 0 14.7 4.8 17.4 12.1l54.1 146.6c2.1 5.7 1.3 12-2.2 17-3.5 4.9-9.2 7.9-15.2 7.9z m-401.6-37h375.1L657.3 69.9H363.1l-40.4 109.6z" fill="#000000"></path><path d="M664.3 981.6H339.7c-54.2 0-98.5-43.3-99.6-97.5L223.7 235h572.9l-32.8 651.4c-2.3 53.2-46.1 95.2-99.5 95.2z" fill="#ffffff"></path><path d="M664.3 995H339.7c-29.7 0-57.8-11.4-79-32.2-21.2-20.8-33.3-48.6-34-78.3L210 221.6h600.7L777.2 887c-2.6 60.5-52.2 108-112.9 108zM237.4 248.3l16 635.5c0.5 22.7 9.7 44 25.9 59.8 16.2 15.9 37.7 24.6 60.4 24.6h324.6c46.3 0 84.2-36.2 86.2-82.5l32.1-637.4H237.4z" fill="#000000"></path><path d="M827.1 239.5H193.3c-22.2 0-40.4-18.2-40.4-40.4v-2.2c0-22.2 18.2-40.4 40.4-40.4h633.8c22.2 0 40.4 18.2 40.4 40.4v2.2c0 22.2-18.2 40.4-40.4 40.4z" fill="#ffffff"></path><path d="M826 252.9H194.4c-30.3 0-54.9-24.6-54.9-54.9 0-30.3 24.6-54.9 54.9-54.9H826c30.3 0 54.9 24.6 54.9 54.9s-24.7 54.9-54.9 54.9z m-631.6-83.1c-15.5 0-28.2 12.6-28.2 28.2s12.6 28.2 28.2 28.2H826c15.5 0 28.2-12.6 28.2-28.2 0-15.5-12.6-28.2-28.2-28.2H194.4z" fill="#000000"></path><path d="M354.6 430.3v369.6" fill="#ffffff"></path><path d="M354.6 813.3c-7.4 0-13.4-6-13.4-13.4V430.3c0-7.4 6-13.4 13.4-13.4s13.4 6 13.4 13.4v369.6c-0.1 7.4-6 13.4-13.4 13.4z" fill="#000000"></path><path d="M458.3 430.3v369.6" fill="#ffffff"></path><path d="M458.3 813.3c-7.4 0-13.4-6-13.4-13.4V430.3c0-7.4 6-13.4 13.4-13.4s13.4 6 13.4 13.4v369.6c0 7.4-6 13.4-13.4 13.4z" fill="#000000"></path><path d="M562.1 430.3v369.6" fill="#ffffff"></path><path d="M562.1 813.3c-7.4 0-13.4-6-13.4-13.4V430.3c0-7.4 6-13.4 13.4-13.4s13.4 6 13.4 13.4v369.6c-0.1 7.4-6.1 13.4-13.4 13.4z" fill="#000000"></path><path d="M665.8 430.3v369.6" fill="#ffffff"></path><path d="M665.8 813.3c-7.4 0-13.4-6-13.4-13.4V430.3c0-7.4 6-13.4 13.4-13.4s13.4 6 13.4 13.4v369.6c0 7.4-6 13.4-13.4 13.4z" fill="#000000"></path></g></svg>
                        </button>
                    </div>
                )}
            </div>
        </div>
        {isEditAndDelete && isOwner && showPlaylistForm && (
            <PlayListForm 
            onClose={handlePlaylistForm}
            playlist={playlist}
            isEdit={true}
            />
        )}
        {isEditAndDelete && isOwner && showDeletePopup && (
            <DeletePopup 
            type="playlist"
            isDeleting={isPending}
            onDeleteConfirm={handleDeletePlaylist}
            onCancel={() => setShowDeletePopup(false)}
            />
        )}
    </>
  )
}

export default PlaylistCard;