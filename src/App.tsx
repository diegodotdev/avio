import {
  Home,
  Recipes,
  Recipe,
  Cooks,
  Cook,
  Category,
  Search,
} from "./pages/root";
import { SignInPage, SignUpPage } from "./pages/auth";
import { AuthLayout } from "./layouts";
import { Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Nav from "./components/nav";
import PostLayout from "./layouts/post-layout";
import Post from "./pages/root/post";
import { Toaster } from "sonner";

export default function App() {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/sign-in" && location.pathname !== "/sign-up" && (
        <Nav />
      )}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/recipes/:id" element={<Recipe />} />
          <Route path="/cooks" element={<Cooks />} />
          <Route path="/cooks/:id" element={<Cook />} />
          <Route path="/category/:id" element={<Category />} />
          <Route path="/search" element={<Search />} />
          <Route element={<PostLayout />}>
            <Route path="/post" element={<Post />} />
          </Route>
          <Route element={<AuthLayout />}>
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
          </Route>
        </Routes>
      </AnimatePresence>
      <Toaster />
    </>
  );
}
