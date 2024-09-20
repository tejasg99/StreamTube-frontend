import { useEffect } from 'react';
import { useGetUserChannelInformation } from "../hooks/user.hook";
import { Outlet, useParams, Link, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { MdModeEditOutline } from "react-icons/md";
import { setChannel } from "../features/channelSlice";
import { SpecialButton, SubscribeButton, MychannelSkeleton} from "../components/index";
import defaultCoverImage from "../assets/defaultCoverImage.jpg";

function MyChannel() {
    const { username } = useParams();
    const dispatch = useDispatch();
    const ownerUsername = useSelector((state) => state.auth.user?.username);
    const isOwner = ownerUsername === username ? true : false;
    const { data: channelInfo, isFetching} = useGetUserChannelInformation(username);

    useEffect(() => {
      if(channelInfo) {
        dispatch(setChannel(channelInfo)); //to update store 
      }
    }, [channelInfo, dispatch])

    const channelItems = [
        {
            name: "Videos",
            path: "videos",
        },
        {
            name: "Playlist",
            path: "playlist",
        },
        {
            name: "Tweets",
            path: "tweets",
        },
        {
            name: "Subscribers",
            path: "subscribers",
        },
        {
            name: "About",
            path: "about",
        },
    ]

    if(isFetching) {
        return <MychannelSkeleton />;
    }

  return (
    <section className='w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0'>
        <div className='relative min-h-[150px] w-full pt-[16.28%]'>
            <div
            className='absolute inset-0 overflow-hidden'
            style={{
                backgroundImage: `url${channelInfo?.coverImage?.url || defaultCoverImage}`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
            ></div>
        </div>
        <div className='px-4 pb-4'>
            <div className='flex flex-wrap gap-4 pb-4 pt-6'>
                <span className='relative -mt-12 inline-block h-28 w-28 shrink-0 overflow-hidden rounded-full border-2'>
                    <img 
                    src={channelInfo?.avatar?.url} 
                    alt="channelAvatar"
                    className='h-full w-full object-cover' 
                    />
                </span>
                <div className='mr-auto inline-block -mt-5'>
                    <h1 className='font-bold text-2xl'>{channelInfo?.fullname}</h1>
                    <p className='text-sm text-gray-400'>@{channelInfo?.username}</p>
                    <p className='text-sm text-gray-400 '>
                        {channelInfo?.subscribersCount} Subscribers · {" "}
                        {channelInfo?.subscribedToCount} Subscribed
                    </p>
                    <p>
                        {channelInfo?.description || `This channel does not have a description yet`}
                    </p>
                </div>
                <div className='inline-block'>
                    <div className='inline-flex min-w-[145px] justify-end'>
                        {!isOwner && (
                            <SubscribeButton 
                            isOwner={isOwner}
                            isSubscribed={channelInfo?.isSubscribed}
                            channelId={channelInfo?._id}
                            />
                        )}

                        {isOwner && (
                            <Link to={"/edit-profile/account-details"}>
                                <SpecialButton className='flex items-center gap-3'>
                                    {" "}
                                    <MdModeEditOutline /> Edit
                                </SpecialButton>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
            <ul className='no-scrollbar sticky top-[66px] z-[2]  flex flex-row justify-between text-wrap overflow-auto border-b-2 border-gray-400 bg-[#0e0e0e] py-2 sm:top-[82px]'>
                {channelItems.map((item, index) => (
                    <li key={index} className='w-full'> 
                        <NavLink
                        to={`/channel/${username}/${item.path}`}
                        className={({isActive}) => isActive 
                        ? "text-lg w-full flex justify-center items-center border-b-2 border-blue-500 bg-white px-3 py-1.5 text-blue-600" 
                        :  "text-lg w-full flex justify-center items-center border-b-2  border-transparent px-3 py-1.5 text-gray-400"}
                        >
                            {item.name}
                        </NavLink>
                    </li>
                ))}
            </ul>
            <Outlet />
        </div>
    </section>
  )
}

export default MyChannel;