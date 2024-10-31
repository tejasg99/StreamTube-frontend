/* eslint-disable react-refresh/only-export-components */
import { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
const App = lazy(() => import("./App.jsx"));
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const Signup = lazy(() => import("./pages/Signup.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const Home = lazy(() => import("./pages/Home.jsx"));
const VideoDetail = lazy(() => import("./pages/VideoDetail.jsx"));
const LikedVideos = lazy(() => import("./pages/LikedVideos.jsx"));
const MyChannel = lazy(() => import("./pages/MyChannel.jsx"));
const MyDashboard = lazy(() => import("./pages/MyDashboard.jsx"));
const Subscriptions = lazy(() => import("./pages/Subscriptions.jsx"));
const Support = lazy(() => import("./pages/Support.jsx"));
const History = lazy(() => import("./pages/History.jsx"));
const ChannelPlaylist = lazy(() =>
  import("./pages/Channel/ChannelPlaylist.jsx")
);
const ChannelAbout = lazy(() => import("./pages/Channel/ChannelAbout.jsx"));
const ChannelSubscribers = lazy(() =>
  import("./pages/Channel/ChannelSubscribers.jsx")
);
const ChannelTweets = lazy(() => import("./pages/Channel/ChannelTweets.jsx"));
const ChannelVideos = lazy(() => import("./pages/Channel/ChannelVideos.jsx"));
const EditProfile = lazy(() => import("./pages/EditProfile.jsx"));
const EditAccountDetails = lazy(() =>
  import("./pages/EditProfile/EditAccountDetails.jsx")
);
const EditChangePassword = lazy(() =>
  import("./pages/EditProfile/EditChangePassword.jsx")
);
const Playlist = lazy(() => import("./pages/Playlist.jsx"));
const SearchVideos = lazy(() => import("./pages/SearchVideos.jsx"));
const TweetPage = lazy(() => import("./pages/TweetPage.jsx"));
const Healthcheck = lazy(() => import("./pages/Healthcheck.jsx"));

import { AuthLayout } from "./components";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";

if (import.meta.env.MODE === "development") {
  disableReactDevTools();
}

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense
        fallback={
          <div className="w-full h-screen [background:radial-gradient(125%_125%_at_50%_10%,#000_50%,#6b219f_100%)]"></div>
        }
      >
        <App />
      </Suspense>
    ),
    children: [
      {
        path: "/",
        element: (
          <AuthLayout auth={false}>
            <Suspense
              fallback={
                <div className="w-full h-screen [background:radial-gradient(125%_125%_at_50%_10%,#000_50%,#6b219f_100%)]"></div>
              }
            >
              <Home />
            </Suspense>
          </AuthLayout>
        ),
      },
      {
        path: "/videos/:videoId",
        element: (
          <AuthLayout auth={false}>
            <Suspense
              fallback={
                <div className="w-full h-screen [background:radial-gradient(125%_125%_at_50%_10%,#000_50%,#6b219f_100%)]"></div>
              }
            >
              <VideoDetail />
            </Suspense>
          </AuthLayout>
        ),
      },
      {
        path: "/liked-videos",
        element: (
          <AuthLayout auth={true} pageName={"LikedVideos"}>
            <Suspense
              fallback={
                <div className="w-full h-screen [background:radial-gradient(125%_125%_at_50%_10%,#000_50%,#6b219f_100%)]"></div>
              }
            >
              <LikedVideos />
            </Suspense>
          </AuthLayout>
        ),
      },
      {
        path: "/watch-history",
        element: (
          <AuthLayout auth={true} pageName={"History"}>
            <Suspense
              fallback={
                <div className="w-full h-screen [background:radial-gradient(125%_125%_at_50%_10%,#000_50%,#6b219f_100%)]"></div>
              }
            >
              <History />
            </Suspense>
          </AuthLayout>
        ),
      },
      {
        path: "/channel/:username/",
        element: (
          <AuthLayout auth={true} pageName={"MyChannel"}>
            <Suspense
              fallback={
                <div className="w-full h-screen [background:radial-gradient(125%_125%_at_50%_10%,#000_50%,#6b219f_100%)]"></div>
              }
            >
              <MyChannel />
            </Suspense>
          </AuthLayout>
        ),
        children: [
          {
            path: "videos",
            element: (
              <AuthLayout auth={true} pageName={"ChannelVideos"}>
                <Suspense
                  fallback={
                    <div className="w-full h-screen [background:radial-gradient(125%_125%_at_50%_10%,#000_50%,#6b219f_100%)]"></div>
                  }
                >
                  <ChannelVideos />
                </Suspense>
              </AuthLayout>
            ),
          },
          {
            path: "tweets",
            element: (
              <AuthLayout auth={true} pageName={"ChannelTweets"}>
                <Suspense
                  fallback={
                    <div className="w-full h-screen [background:radial-gradient(125%_125%_at_50%_10%,#000_50%,#6b219f_100%)]"></div>
                  }
                >
                  <ChannelTweets />
                </Suspense>
              </AuthLayout>
            ),
          },
          {
            path: "playlist",
            element: (
              <AuthLayout auth={true} pageName={"ChannelPlaylists"}>
                <Suspense
                  fallback={
                    <div className="w-full h-screen [background:radial-gradient(125%_125%_at_50%_10%,#000_50%,#6b219f_100%)]"></div>
                  }
                >
                  <ChannelPlaylist />
                </Suspense>
              </AuthLayout>
            ),
          },
          {
            path: "subscribers",
            element: (
              <AuthLayout auth={true} pageName={"ChannelSubscribers"}>
                <Suspense
                  fallback={
                    <div className="w-full h-screen [background:radial-gradient(125%_125%_at_50%_10%,#000_50%,#6b219f_100%)]"></div>
                  }
                >
                  <ChannelSubscribers />
                </Suspense>
              </AuthLayout>
            ),
          },
          {
            path: "about",
            element: (
              <AuthLayout auth={true} pageName={"ChannelAbout"}>
                <Suspense
                  fallback={
                    <div className="w-full h-screen [background:radial-gradient(125%_125%_at_50%_10%,#000_50%,#6b219f_100%)]"></div>
                  }
                >
                  <ChannelAbout />
                </Suspense>
              </AuthLayout>
            ),
          },
        ],
      },
      {
        path: "/myDashboard",
        element: (
          <AuthLayout auth={true} pageName={"MyDashboard"}>
            <Suspense
              fallback={
                <div className="w-full h-screen [background:radial-gradient(125%_125%_at_50%_10%,#000_50%,#6b219f_100%)]"></div>
              }
            >
              <MyDashboard />
            </Suspense>
          </AuthLayout>
        ),
      },
      {
        path: "/subscriptions",
        element: (
          <AuthLayout auth={true} pageName={"Subscriptions"}>
            <Suspense
              fallback={
                <div className="w-full h-screen [background:radial-gradient(125%_125%_at_50%_10%,#000_50%,#6b219f_100%)]"></div>
              }
            >
              <Subscriptions />
            </Suspense>
          </AuthLayout>
        ),
      },
      {
        path: "/edit-profile/",
        element: (
          <AuthLayout auth={true} pageName={"Settings"}>
            <Suspense
              fallback={
                <div className="w-full h-screen [background:radial-gradient(125%_125%_at_50%_10%,#000_50%,#6b219f_100%)]"></div>
              }
            >
              <EditProfile />
            </Suspense>
          </AuthLayout>
        ),
        children: [
          {
            path: "change-password",
            element: (
              <AuthLayout auth={true} pageName={"EditChangePassword"}>
                <Suspense
                  fallback={
                    <div className="w-full h-screen [background:radial-gradient(125%_125%_at_50%_10%,#000_50%,#6b219f_100%)]"></div>
                  }
                >
                  <EditChangePassword />
                </Suspense>
              </AuthLayout>
            ),
          },
          {
            path: "edit-account-details",
            element: (
              <AuthLayout auth={true}>
                <Suspense
                  fallback={
                    <div className="w-full h-screen [background:radial-gradient(125%_125%_at_50%_10%,#000_50%,#6b219f_100%)]"></div>
                  }
                >
                  <EditAccountDetails />
                </Suspense>
              </AuthLayout>
            ),
          },
        ],
      },
      {
        path: "/playlist/:playlistId",
        element: (
          <AuthLayout auth={true} pageName={"Playlist"}>
            <Suspense
              fallback={
                <div className="w-full h-screen [background:radial-gradient(125%_125%_at_50%_10%,#000_50%,#6b219f_100%)]"></div>
              }
            >
              <Playlist />
            </Suspense>
          </AuthLayout>
        ),
      },
      {
        path: "/support",
        element: (
          <Suspense
            fallback={
              <div className="w-full h-screen [background:radial-gradient(125%_125%_at_50%_10%,#000_50%,#6b219f_100%)]"></div>
            }
          >
            <Support />
          </Suspense>
        ),
      },
      {
        path: "/search/:query",
        element: (
          <AuthLayout auth={false}>
            <Suspense
              fallback={
                <div className="w-full h-screen [background:radial-gradient(125%_125%_at_50%_10%,#000_50%,#6b219f_100%)]"></div>
              }
            >
              <SearchVideos />
            </Suspense>
          </AuthLayout>
        ),
      },
      {
        path: "/tweets-page",
        element: (
          <AuthLayout auth={false}>
            <Suspense
              fallback={
                <div className="w-full h-screen [background:radial-gradient(125%_125%_at_50%_10%,#000_50%,#6b219f_100%)]"></div>
              }
            >
              <TweetPage />
            </Suspense>
          </AuthLayout>
        ),
      },
    ],
  },
  {
    path: "/signup",
    element: (
      <AuthLayout auth={false}>
        <Suspense
          fallback={
            <div className="w-full h-screen [background:radial-gradient(125%_125%_at_50%_10%,#000_50%,#6b219f_100%)]"></div>
          }
        >
          <Signup />
        </Suspense>
      </AuthLayout>
    ),
  },
  {
    path: "/login",
    element: (
      <AuthLayout auth={false}>
        <Suspense
          fallback={
            <div className="w-full h-screen [background:radial-gradient(125%_125%_at_50%_10%,#000_50%,#6b219f_100%)]"></div>
          }
        >
          <Login />
        </Suspense>
      </AuthLayout>
    ),
  },
  {
    path: "/healthcheck",
    element: (
      <Suspense fallback={<p className="bg-slate-900 text-white">Loading</p>}>
        <Healthcheck />
      </Suspense>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
    {import.meta.env.MODE === "development" && (
      <ReactQueryDevtools initialIsOpen={false} />
    )}
    <Toaster
      position="top-right"
      reverseOrder={true}
      toastOptions={{
        error: {
          style: { borderRadius: "50", color: "red" },
        },
        success: {
          style: { borderRadius: "50", color: "green" },
        },
        duration: 2000,
      }}
    />
  </QueryClientProvider>
);
