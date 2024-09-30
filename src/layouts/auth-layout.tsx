import { Outlet, Navigate } from "react-router-dom";
import useGetUser from "../hooks/useGetUser";

export default function AuthLayout() {
  const { user } = useGetUser();

  if (user) return <Navigate to="/" replace={true} />;
  return (
    <div className="w-full h-screen flex relative">
      <div className="w-full absolute md:w-1/2 h-full md:relative">
        <img
          src="https://images.unsplash.com/photo-1452251889946-8ff5ea7b27ab?q=80&w=2524&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 right-0 bg-black/70 w-full h-full grid place-items-center">
          <p className="hidden md:inline montserrat text-9xl text-white/10 font-bold">
            Avio
          </p>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
