import { Link } from 'react-router-dom';
import NextVideoCard from './NextVideoCard';
import { useNextVideos } from "../../hooks/video.hook";

function AllNextVideos({ currentVideoId }) {
    const {
        data: allNextVideos,
        isFetched,
        // isFetching,
    } = useNextVideos(currentVideoId);

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