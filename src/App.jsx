import {
  RouterProvider,
  createBrowserRouter,
  useInRouterContext,
  useRouteError,
} from "react-router-dom";
import AppLayout from "./AppLayout";
import Error from "./ui/Error";
import Modal from "./components/Modal";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <Error />,
  },
]);
// ─── APP ──────────────────────────────────────────────────────────────────
export default function App() {
  return <RouterProvider router={router} />;
}
