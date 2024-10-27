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
    return (
      <div className="h-screen overflow-y-auto text-white [background:radial-gradient(125%_125%_at_50%_10%,#000_50%,#6b219f_100%)]">
        <HeaderSkeleton />
        <div className="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
          <SidebarSkeleton />
          <ContentSkeleton />
        </div>
      </div>
    );
  }

  if(error) {
    console.log("Guest user")
  }

  return (
    <div className="h-screen overflow-y-auto bg-[#0e0e0e] text-white scrollbar-hide [background:radial-gradient(125%_125%_at_50%_10%,#000_50%,#6b219f_100%)]">
      <Header />
      <div className="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
        <Sidebar />
        <Outlet />
      </div>
    </div>  
  )
}

export default App;

// bg-gradient color original - #3d135a
//[background:radial-gradient(125%_125%_at_50%_10%,#000_50%,#6b219f_100%)]