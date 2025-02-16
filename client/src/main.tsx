import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import {
  INDEX_ROUTE,
  FORM_ROUTE,
  LIST_ROUTE,
  ITEM_ROUTE,
} from "./constants/routes";

import { FormPage } from "./pages/FormPage";
import { ItemPage } from "./pages/ItemPage";
import { ListPage } from "./pages/ListPage";
import { NotFoundPage } from "./pages/NotFoundPage";

import { Layout } from "./components/common/Layout";

const navRoutes = [
  {
    path: INDEX_ROUTE,
    element: <Navigate to={LIST_ROUTE} />,
  },
  {
    path: FORM_ROUTE,
    element: <FormPage />,
  },
  {
    path: LIST_ROUTE,
    element: <ListPage />,
  },
  {
    path: ITEM_ROUTE + "/:id",
    element: <ItemPage />,
  },
];

const allRoutes = [
  {
    element: <Layout />,
    children: navRoutes,
    errorElement: <NotFoundPage />,
  },
];

const routes = createBrowserRouter(allRoutes);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={routes} />
  </StrictMode>,
);
