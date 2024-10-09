import { useSelector } from "react-redux";
import { useGetSubscribedChannels } from "../hooks/subscription.hook";
import { ChannelSubscribed, VideoListCard } from "../components/index";
import { Link } from "react-router-dom";

function Subscriptions() {
  const userId = useSelector((state) => state.auth.user._id);
  const { data: subscriptions } = useGetSubscribedChannels(userId);
  console.log(subscriptions);

  if (subscriptions && subscriptions.length === 0) {
    return (
      <div className="container mx-auto px-2">
        <h1 className="text-3xl font-bold my-2">Subscriptions</h1>
        <p className="text-lg">You have not subscribed to any channel</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-2">
      <h1 className="text-3xl font-bold my-2">Subscriptions</h1>
      <div className="grid grid-cols-2 md:grid-cols-6 lg:grid-cols-10 gap-2   ">
        {subscriptions &&
          subscriptions.map((channel) => (
            <Link
              to={`/channel/${channel?.subscribedChannel?.username}`}
              key={channel?.subscribedChannel?._id}
            >
              <ChannelSubscribed channel={channel?.subscribedChannel} />
            </Link>
          ))}
      </div>
      <div>
        <h1 className="text-2xl font-semibold  my-2">
          Latest Videos from Subscriptions
        </h1>
        <div className="flex flex-col gap-4 p-4">
          {subscriptions &&
            subscriptions.map((channel) => (
              <Link
                to={`/videos/${channel?.subscribedChannel?.latestVideo?._id}`}
                key={channel?.subscribedChannel._id}
              >
                <VideoListCard
                  video={channel?.subscribedChannel?.latestVideo?.videoFile}
                  owner={{
                    avatar: channel?.subscribedChannel?.avatar,
                    username: channel?.subscribedChannel?.username,
                    fullName: channel?.subscribedChannel?.fullname,
                  }}
                />
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Subscriptions;
