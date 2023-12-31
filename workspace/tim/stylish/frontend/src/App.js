import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import Cookies from "js-cookie";
import HomePageLayout from "./pages/homePage";
import ProductDetailPageLayout from "./pages/productDetailPage";
import CheckoutPage from "./pages/checkoutPage";
import ThankyouPage from "./pages/ThankyouPage";
import LoginPage from "./pages/LoginPage";
import Backstage from "./pages/Backstage/Backstage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import AdminPage from "./pages/AdminPage";
import FlashPage from "./pages/FlashPage";
// import MonitorPage from "./pages/monitorPage";

import { CartCountProvider } from "./contexts/CartCountManager";
//
// const queryClient = new QueryClient();
const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 1000 * 60 * 5 } },
});

const LoginRoute = () => {
  const isLoggedIn = Cookies.get("token");
  return isLoggedIn ? <Navigate to="/" /> : <Outlet />;
};

const PrivateRoute = () => {
  const isLoggedIn = Cookies.get("token");
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

const AdminRoute = () => {
  const isLoggedIn = Cookies.get("token");
  const isAdmin = Cookies.get("isAdmin");
  return isLoggedIn && isAdmin ? <Outlet /> : <Navigate to="/login" />;
}

const ResetPasswordRoute = () => {
  const isLoggedIn = Cookies.get("token");
  return isLoggedIn ? <Navigate to="/" /> : <Outlet />;
}

function App() {
  return (
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <div>
        <CartCountProvider>
          <BrowserRouter>
            <Routes>
              {/* <Route path="/admin/dashboard.html" element={<MonitorPage />} /> */}
              <Route path="/" element={<HomePageLayout endpoint="all" />} />

              <Route
                path="/women"
                element={<HomePageLayout endpoint="women" />}
              />
              <Route path="/men" element={<HomePageLayout endpoint="men" />} />

              <Route
                path="/accessories"
                element={<HomePageLayout endpoint="accessories" />}
              />
              <Route path="/flash" element={<FlashPage endpoint="flash" />} />

              <Route
                path="/search"
                element={<HomePageLayout endpoint="search" />}
              />

              <Route
                path="/products/:id"
                element={<ProductDetailPageLayout endpoint="search" />}
              />

              <Route path="/checkout" element={<CheckoutPage />} />

              <Route element={<LoginRoute />}>
                <Route path="/login" element={<LoginPage />} />
              </Route>
              <Route path="/reset-password" element={<ResetPasswordPage />} />
              <Route element={<PrivateRoute />}>
                <Route path="/thankyou" element={<ThankyouPage />} />
              </Route>
              <Route path="/backstage" element={<Backstage />} />
              <Route element={<PrivateRoute />}>
                <Route path="/admin-order" element={<AdminPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </CartCountProvider>
      </div>
    </QueryClientProvider>
  );
}

export default App;
