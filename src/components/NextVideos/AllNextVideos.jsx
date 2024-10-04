import { Link } from 'react-router-dom';
import NextVideoCard from './NextVideoCard';
import { useNextVideos } from "../../hooks/video.hook";

function AllNextVideos({ currentVideoId }) {
    const {
        data: allNextVideos,
        isFetched,
        // isFetching,
    } = useNextVideos(currentVideoId);

    // if(allNextVideos.length === 0) {
    //     return <div className='text-xl text-gray-500'>No next videos available</div>
    // }
  return (
    <>
        {isFetched &&
        allNextVideos.map((video) => {
            return (
            <Link to={`/videos/${video._id}`} key={video._id}>
                <NextVideoCard video={video} />
            </Link>
            );
        })}
    </>
  )
}

export default AllNextVideos;