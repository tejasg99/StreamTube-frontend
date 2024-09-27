/* eslint-disable react-refresh/only-export-components */
import { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthLayout from "./components/AuthLayout.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
if (import.meta.env.MODE === "development") disableReactDevTools();

const App = lazy(() => import("./App.jsx"));
const Home = lazy(() => import("./pages/Home.jsx"));
const Signup = lazy(() => import("./pages/Signup.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const VideoDetail = lazy(() => import("./pages/VideoDetail.jsx"));
const LikedVideos = lazy(() => import("./pages/LikedVideos.jsx"));
const MyChannel = lazy(() => import("./pages/MyChannel.jsx"));
const MyDashboard = lazy(() => import("./pages/MyDashboard.jsx"));
const Subscriptions = lazy(() => import("./pages/Subscriptions.jsx"));
const History = lazy(() => import("./pages/History.jsx"));
const ChannelPlaylist = lazy(() =>
  import("./pages/Channel/ChannelPlaylist.jsx")
);
const ChannelSubscribers = lazy(() =>
  import("./pages/Channel/ChannelSubscribers.jsx")
);
const ChannelVideos = lazy(() => import("./pages/Channel/ChannelVideos.jsx"));
const ChannelTweets = lazy(() => import("./pages/Channel/ChannelTweets.jsx"));
const ChannelAbout = lazy(() => import("./pages/Channel/ChannelAbout.jsx"));
const EditChangePassword = lazy(() =>
  import("./pages/EditProfile/EditChangePassword.jsx")
);
const EditAccountDetails = lazy(() =>
  import("./pages/EditProfile/EditAccountDetails.jsx")
);
const EditProfile = lazy(() => import("./pages/EditProfile.jsx"));
const Support = lazy(() => import("./pages/Support.jsx"));
const Playlist = lazy(() => import("./pages/Playlist.jsx"));
const SearchVideos = lazy(() => import("./pages/SearchVideos.jsx"));
const TweetPage = lazy(() => import("./pages/TweetPage.jsx"));

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<p className="text-slate-100 text-3xl text-center w-full h-screen bg-slate-900">Loading...</p>}>
        <App />
      </Suspense>
    ),
    children: [
      {
        path: "/",
        element: (
          <AuthLayout auth={false}>
            <Suspense fallback={<p className="text-slate-100 text-3xl text-center w-full h-screen bg-slate-900">Loading...</p>}>
              <Home />
            </Suspense>
          </AuthLayout>
        ),
      },
      {
        path: "/videos/:videoId",
        element: (
          <AuthLayout auth={false}>
            <Suspense fallback={<p className="text-slate-100 text-3xl text-center w-full h-screen bg-slate-900">Loading...</p>}>
              <VideoDetail />
            </Suspense>
          </AuthLayout>
        ),
      },
      {
        path: "/liked-videos",
        element: (
          <AuthLayout auth={true} pageName={"LikedVideos"}>
            <Suspense fallback={<p className="text-slate-100 text-3xl text-center w-full h-screen bg-slate-900">Loading...</p>}>
              <LikedVideos />
            </Suspense>
          </AuthLayout>
        ),
      },
      {
        path: "/watch-history",
        element: (
          <AuthLayout auth={true} pageName={"History"}>
            <Suspense fallback={<p className="text-slate-100 text-3xl text-center w-full h-screen bg-slate-900">Loading...</p>}>
              <History />
            </Suspense>
          </AuthLayout>
        ),
      },
      {
        path: "/channel/:username",
        element: (
          <AuthLayout auth pageName={"MyChannel"}>
            <Suspense fallback={<p className="text-slate-100 text-3xl text-center w-full h-screen bg-slate-900">Loading...</p>}>
              <MyChannel />
            </Suspense>
          </AuthLayout>
        ),
        children: [
          {
            path: "videos",
            element: (
              <AuthLayout auth>
                <Suspense fallback={<p className="text-slate-100 text-3xl text-center w-full h-screen bg-slate-900">Loading...</p>}>
                  <ChannelVideos />
                </Suspense>
              </AuthLayout>
            ),
          },
          {
            path: "tweets",
            element: (
              <AuthLayout auth>
                <Suspense fallback={<p className="text-slate-100 text-3xl text-center w-full h-screen bg-slate-900">Loading...</p>}>
                  <ChannelTweets />
                </Suspense>
              </AuthLayout>
            ),
          },
          {
            path: "playlist",
            element: (
              <AuthLayout auth>
                <Suspense fallback={<p className="text-slate-100 text-3xl text-center w-full h-screen bg-slate-900">Loading...</p>}>
                  <ChannelPlaylist />
                </Suspense>
              </AuthLayout>
            ),
          },
          {
            path: "subscribers",
            element: (
              <AuthLayout auth>
                <Suspense fallback={<p className="text-slate-100 text-3xl text-center w-full h-screen bg-slate-900">Loading...</p>}>
                  <ChannelSubscribers />
                </Suspense>
              </AuthLayout>
            ),
          },
          {
            path: "about",
            element: (
              <AuthLayout auth>
                <Suspense fallback={<p className="text-slate-100 text-3xl text-center w-full h-screen bg-slate-900">Loading...</p>}>
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
          <AuthLayout auth pageName={"MyStudio"}>
            <Suspense fallback={<p className="text-slate-100 text-3xl text-center w-full h-screen bg-slate-900">Loading...</p>}>
              <MyDashboard />
            </Suspense>
          </AuthLayout>
        ),
      },
      {
        path: "/subscriptions",
        element: (
          <AuthLayout auth pageName={"Subscriptions"}>
            <Suspense fallback={<p className="text-slate-100 text-3xl text-center w-full h-screen bg-slate-900">Loading...</p>}>
              <Subscriptions />
            </Suspense>
          </AuthLayout>
        ),
      },
      {
        path: "/edit-profile",
        element: (
          <AuthLayout auth pageName={"Settings"}>
            <Suspense fallback={<p className="text-slate-100 text-3xl text-center w-full h-screen bg-slate-900">Loading...</p>}>
              <EditProfile />
            </Suspense>
          </AuthLayout>
        ),
        children: [
          {
            path: "change-password",
            element: (
              <AuthLayout auth>
                <Suspense fallback={<p className="text-slate-100 text-3xl text-center w-full h-screen bg-slate-900">Loading...</p>}>
                  <EditChangePassword />
                </Suspense>
              </AuthLayout>
            ),
          },
          {
            path: "account-details",
            element: (
              <AuthLayout auth>
                <Suspense fallback={<p className="text-slate-100 text-3xl text-center w-full h-screen bg-slate-900">Loading...</p>}>
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
          <AuthLayout auth>
            <Suspense fallback={<p className="text-slate-100 text-3xl text-center w-full h-screen bg-slate-900">Loading...</p>}>
              <Playlist />
            </Suspense>
          </AuthLayout>
        ),
      },
      {
        path: "/support",
        element: (
          <AuthLayout auth={false}>
            <Suspense fallback={<p className="text-slate-100 text-3xl text-center w-full h-screen bg-slate-900">Loading...</p>}>
              <Support />
            </Suspense>
          </AuthLayout>
        ),
      },
      {
        path: "/search/:query",
        element: (
          <AuthLayout auth={false}>
            <Suspense fallback={<p className="text-slate-100 text-3xl text-center w-full h-screen bg-slate-900">Loading...</p>}>
              <SearchVideos />
            </Suspense>
          </AuthLayout>
        ),
      },
      {
        path: "/tweets/",
        element: (
          <AuthLayout auth={false}>
            <Suspense fallback={<p className="text-slate-100 text-3xl text-center w-full h-screen bg-slate-900">Loading...</p>}>
              <TweetPage />
            </Suspense>
          </AuthLayout>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: (
      <AuthLayout auth={false}>
        <Suspense fallback={<p className="text-slate-100 text-3xl text-center w-full h-screen bg-slate-900">Loading...</p>}>
          <Login />
        </Suspense>
      </AuthLayout>
    ),
  },
  {
    path: "/signup",
    element: (
      <AuthLayout auth={false}>
        <Suspense fallback={<p className="text-slate-100 text-3xl text-center w-full h-screen bg-slate-900">Loading...</p>}>
          <Signup />
        </Suspense>
      </AuthLayout>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
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
          style: { borderRadius: "0", color: "red" },
        },
        success: {
          style: { borderRadius: "0", color: "green" },
        },
        duration: 2000,
      }}
    />
  </QueryClientProvider>
);
