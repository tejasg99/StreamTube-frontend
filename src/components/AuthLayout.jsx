import React from 'react';
import { useSelector } from 'react-redux';
import { LoginPopup } from "./index";
import {
    GuestChannel,
    GuestDashboard,
    GuestSubscriptions,
    GuestLikedVideos,
    GuestSettings,
    GuestHistory,
} from "./GuestComponents/GuestComponents";

const guestComponents = {
    MyChannel: GuestChannel,
    MyDashboard: GuestDashboard,
    Subscriptions: GuestSubscriptions,
    LikedVideos: GuestLikedVideos,
    History: GuestHistory,
    Settings: GuestSettings,
}

const loginTo = {
    MyChannel: "Create your channel",
    MyDashboard: "Access your dashboard",
    Subscriptions: "Subscribe to your favorite channel",
    LikedVideos: "Like your favorite video",
    History: "Access your watch history",
    Settings: "Change your account settings",
}

function AuthLayout({ auth, children, pageName }) {
    const authStatus = useSelector((state) => state.auth.authStatus);
    const [showLoginPopup, setShowLoginPopup] = React.useState(false)

    const handleCloseLoginPopup = () => {
        setShowLoginPopup(false);
    };

    if(auth && authStatus) {
        return children;
    }

    if(auth && !authStatus) {
        if(showLoginPopup) {
            return (
                <LoginPopup onClose={handleCloseLoginPopup} loginTo={loginTo[pageName]}/>
            )
        }
        const GuestComponent = guestComponents[pageName];
        return GuestComponent ? (
            <div className='relative overflow-hidden w-full justify-center flex bg-black'>
                <GuestComponent />
                <div className='absolute left-1/2 bottom-[30%] transform -translate-x-1/2'>
                    <button className='bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-400 transition duration-300 text-lg font-semibold'
                    onClick={() => setShowLoginPopup(true)}
                    >
                        Sign in
                    </button>
                </div>
            </div>
        ) : (
            <div>Guest Component not found</div>
        );
    }
}

export default AuthLayout