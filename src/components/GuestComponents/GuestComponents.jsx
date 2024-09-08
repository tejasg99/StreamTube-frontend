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
  <div className="flex flex-col items-center justify-center bg-black p-4 text-center">
    <Icon className="w-16 h-16 text-blue-400 mb-4" />
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
    description="Create your channel by signing in"
    icon={FaUser}
  />
);

export const GuestDashboard = () => (
  <GuestComponent
    title="Acess dashboard and get insights"
    description="Sign in to know your stats, insights and more"
    icon={FaFilm}
  />
);

export const GuestSubscriptions = () => (
  <GuestComponent
    title="Never miss a video"
    description="Subscribe to your favorite channels by signing in."
    icon={FaUsers}
  />
);

export const GuestLikedVideos = () => (
  <GuestComponent
    title="Like your favorite videos"
    description="Sign in to like the video you love"
    icon={FaHeart}
  />
);

export const GuestHistory = () => (
  <GuestComponent
    title="Keep track of what you watch"
    description="Sign in to see your watch history."
    icon={FaHistory}
  />
);

export const GuestSettings = () => (
  <GuestComponent
    title="Customize your experience"
    description="Sign in to access and modify your account settings."
    icon={FaCog}
  />
);
