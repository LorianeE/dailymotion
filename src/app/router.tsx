import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../components/Layout/Layout";
import { SearchPage } from "../pages/SearchPage/SearchPage";
import { VideoPage } from "../pages/VideoPage/VideoPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <SearchPage />,
      },
      {
        path: "videos/:videoId",
        element: <VideoPage />,
      },
    ],
  },
]);
