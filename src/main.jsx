import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store/store.js";
import { Toaster } from "react-hot-toast";

import Home from "./pages/Home.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
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
);
