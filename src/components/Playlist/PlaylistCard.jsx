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
                        className='text-white w-[6rem] bg-blue-500 px-3 py-1.5 rounded-lg'
                        >
                            Edit
                        </button>
                        <button 
                        onClick={() => setShowDeletePopup(true)}
                        className='text-white w-[6rem] bg-blue-500 px-3 py-1.5 rounded-lg'
                        >
                            Delete
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