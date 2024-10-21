import PropTypes from "prop-types";
import {
  FaUser,
  FaHeart,
  FaHistory,
  FaCog,
  FaFilm,
  FaUsers,
} from "react-icons/fa";

export const GuestComponent = ({ title, description, icon: Icon }) => (
  <div className="flex flex-col items-center justify-center p-4 text-center bg-transparent">
    <Icon className="w-16 h-16 text-[#6b219f] mb-4" />
    <h2 className="text-2xl font-bold mb-2 text-white ">{title}</h2>
    <p className="text-gray-300 mb-8 max-w-md">{description}</p>
  </div>
);

GuestComponent.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  icon: PropTypes.elementType,
};

export const GuestChannel = () => (
  <GuestComponent
    title="Save and share your favorite videos"
    description="Login to create your channel"
    icon={FaUser}
  />
);

export const GuestDashboard = () => (
  <GuestComponent
    title="Acess dashboard and get insights"
    description="Login to know your stats, insights and more"
    icon={FaFilm}
  />
);

export const GuestSubscriptions = () => (
  <GuestComponent
    title="Never miss a video"
    description="Login to subscribe to your favourite channels."
    icon={FaUsers}
  />
);

export const GuestLikedVideos = () => (
  <GuestComponent
    title="Like your favorite videos"
    description="Login to like the video you love"
    icon={FaHeart}
  />
);

export const GuestHistory = () => (
  <GuestComponent
    title="Keep track of what you watch"
    description="Login to see your watch history."
    icon={FaHistory}
  />
);

export const GuestSettings = () => (
  <GuestComponent 
    title="Customize your experience"
    description="Login to access and modify your account settings"
    icon={FaCog}
  />
);
