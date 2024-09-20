import { Outlet, useNavigate } from "react-router-dom";
import { useClerk } from "@clerk/clerk-react";

export default function PostLayout() {
  const { user } = useClerk();
  const navigate = useNavigate();

  if (!user) navigate("/sign-in");
  return (
    <>
      <Outlet />
    </>
  );
}
