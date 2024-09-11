import { useState } from "react";
import PropTypes from "prop-types";
import { HiOutlineUserAdd } from "react-icons/hi";
import { LiaUserCheckSolid } from "react-icons/lia";
import { useToggleSubscription } from "../hooks/subscription.hook";
import SpecialButton from "./SpecialButton";
import Button from "./Button";
import { useSelector } from "react-redux";
import LoginPopup from "./LoginPopup";

function SubscribeButton({ isSubscribed, channelId }) {
  const authStatus = useSelector((state) => state.auth.authStatus);
  const { mutateAsync: subscribe } = useToggleSubscription();

  const [isSubscribedState, setIsSubscribedState] = useState(isSubscribed);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const handleSubscribe = async () => {
    if (!authStatus) {
      return setShowLoginPopup(true);
    }

    setIsSubscribedState(!isSubscribedState); //Toggle subscription
    await subscribe(channelId); //api call
  };

  if (showLoginPopup) {
    return (
      <LoginPopup
        loginTo={"Login to Subscibe"}
        onClose={() => setShowLoginPopup(false)}
      />
    );
  }

  return (
    <>
      {isSubscribedState ? (
        <Button
          onClick={() => handleSubscribe()}
          className="flex justify-center items-center gap-3 mr-1 bg-[#b2b2b2] px-3 py-2 text-center font-bold text-black transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e] sm:w-auto"
        >
          <LiaUserCheckSolid className="w-5 h-5" />
          Subscribed
        </Button>
      ) : (
        <SpecialButton
          onClick={() => handleSubscribe()}
          className="flex justify-center items-center bg-red-600 gap-4"
        >
          <HiOutlineUserAdd className="w-5 h-5" />
          Subscribe
        </SpecialButton>
      )}
    </>
  );
}

SubscribeButton.propTypes = {
  isSubscribed: PropTypes.bool,
  channelId: PropTypes.string,
};

export default SubscribeButton;
