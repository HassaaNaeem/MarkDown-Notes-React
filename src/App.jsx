import {
  RouterProvider,
  createBrowserRouter,
  useInRouterContext,
  useRouteError,
} from "react-router-dom";
import AppLayout from "./AppLayout";
import Error from "./ui/Error";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <div>/ Element</div>,
        errorElement: <Error />,
      },
      {
        path: "/me",
        element: <div>Me here</div>,
        errorElement: <Error />,
      },
    ],
  },
]);
// ─── APP ──────────────────────────────────────────────────────────────────
export default function App() {
  return <RouterProvider router={router} />;
}
