import {
    FaEnvelope,
    FaGlobe,
    FaVideo,
    FaEye,
    FaTwitter,
    FaCalendarAlt,
} from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGetChannelInfo } from "../../hooks/dashboard.hook";
import { ProgressBar } from "../../components/index";

function ChannelAbout() {
    const channel = useSelector((state) => state.channel.channel);
    const { data: channelAbout, isFetching } = useGetChannelInfo();

    const channelDetails = [
        {
            icon: FaEnvelope,
            text: `${channelAbout?.email}`,
            link: `mailto:${channelAbout?.email}`
        },
        // {
        //     icon: FaGlobe,
        //     text: `_SiteLink_/channel/${channelAbout?.username}`,
        //     link: `_SiteLink_/channel/${channelAbout?.username}`
        // },
        {
            icon: FaVideo,
            text: `${channelAbout?.totalVideos} Videos`,
        },
        {
            icon: FaEye,
            text: `${channelAbout?.totalViews} Views`,
        },
        {
            icon: FaTwitter,
            text: `${channelAbout?.totalTweets} Tweets`,
        },
        {
            icon: FaCalendarAlt,
            text: `Joined on ${new Date(channelAbout?.createdAt).toLocaleDateString("en-GB")}`,
        },
    ]

    if(isFetching) {
        return <ProgressBar />
    }

  return (
    <div className='text-white p-6 rounded-lg shadow-lg max-w-md'>
        {" "}
        <h2 className='text-xl font-semibold mb-4 text-slate-50'>About</h2>
        <h1 className='text-3xl font-semibold mb-4 text-white'>
            {channel?.fullname}
        </h1>
        <p className=" mb-4 text-slate-300">
            {channelAbout?.description || "No description provided for this channel"}
        </p>
        <div className='space-y-3'>
            {" "}
            {channelDetails.map((detail, index) => (
                <div key={index} className='flex items-center'>
                    {" "}
                    <detail.icon className="text-slate-200 mr-3 text-xl" />{" "}
                    {detail.link ? (
                        <Link 
                        to={detail.link}
                        className='text-slate-300 hover:text-white transition duration-300'>
                            {detail.text}
                        </Link>
                    ):(
                        <span className='text-gray-300'>{detail.text}</span>
                    )}
                </div>
            ))}
        </div>
    </div>
  )
}

export default ChannelAbout;