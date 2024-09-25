import { useState, useEffect } from 'react';
import { Header, Sidebar } from './components';
import { Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useCurrentUser } from "./hooks/auth.hook";
import { setUser } from "./features/authSlice";
import HeaderSkeleton from "./components/Skeletons/HeaderSkeleton";
import SidebarSkeleton from "./components/Skeletons/SidebarSkeleton";
import ContentSkeleton from './components/Skeletons/ContentSkeleton';

function App() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const {data: userData, isFetching, error} = useCurrentUser();
  const user = useSelector((state) => state.auth.userData);

  useEffect(()=> {
    if(!isFetching) {
      if(userData && !user) {
        dispatch(setUser(userData))
      }
      setIsLoading(false);
    }
  },[userData, isFetching, dispatch, user])
  
  if(isLoading || isFetching) {
    // Loading skeleton to be added here
    return (
      <div className="h-screen overflow-y-auto bg-[#0e0e0e] text-white">
        <HeaderSkeleton />
        <div className="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
          <SidebarSkeleton />
          <ContentSkeleton />
        </div>
      </div>
    );
  }

  if(error) {
    console.log("Error fetching user data: ", error)
  }

  return (
    <div className="h-screen overflow-y-auto bg-[#0e0e0e] text-white">
      <Header />
      <div className="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
        <Sidebar />
        <Outlet />
      </div>
    </div>  
  )
}

export default App;
