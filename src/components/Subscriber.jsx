import SubscribeButton from './SubscribeButton';

function Subscriber({ subscriber }) {
  return (
    <div className='flex w-full justify-between'>
        <div className='flex items-center gap-x-2'>
            <div className='h-14 w-14 shrink-0'>
                <img 
                src={subscriber?.avatar} 
                alt={subscriber?.username}
                className='h-full w-full rounded-full object-cover' 
                />
            </div>
            <div className='block'>
                <h6 className='font-semibold'>{subscriber?.fullname}</h6>
                <p>
                    {subscriber?.subscribersCount} Subscribers
                </p>
            </div>
        </div>
        <div className='block'>
            <SubscribeButton 
            isSubscribed={subscriber?.subscribedToSubscriber}
            channelId={subscriber?._id}
            />
        </div>
    </div>
  )
}

export default Subscriber;