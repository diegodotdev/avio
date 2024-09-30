import { Outlet, Navigate } from "react-router-dom";
import useGetUser from "../hooks/useGetUser";

export default function PostLayout() {
  const { user } = useGetUser();

  if (!user) return <Navigate to="/sign-in" replace={true} />;
  return (
    <>
      <Outlet />
    </>
  );
}
