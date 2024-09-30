import { Link, useLocation } from "react-router-dom";
import MaxWidthWrapper from "./max-width-wrapper";
import { NAV_LINKS } from "../constants";
import { cn } from "../lib/utils";
import { Pen, Menu, X } from "lucide-react";
import SideMenu from "./side-menu";
import { useState } from "react";
import useGetUser from "../hooks/useGetUser";

export default function Nav() {
  const [isActive, setIsActive] = useState(false);
  const location = useLocation();
  const { user } = useGetUser();

  const signOut = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };
  return (
    <div className="w-full h-[10vh]">
      <MaxWidthWrapper className="h-full flex justify-between items-center">
        <Link to="/">
          <span className="montserrat font-[600] text-4xl">Avio</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((i) => (
            <Link to={i.href} key={i.id}>
              <div className="flex items-center gap-1">
                <i.icon
                  size="15px"
                  className={cn(
                    location.pathname === i.href ? "text-red-400" : ""
                  )}
                />
                <span>{i.label}</span>
              </div>
            </Link>
          ))}
          {user ? (
            <>
              <Link to="/post">
                <div className="flex items-center gap-1">
                  <Pen
                    size="15px"
                    className={cn(
                      location.pathname === "/post" ? "text-red-400" : ""
                    )}
                  />
                  <span>Post</span>
                </div>
              </Link>
              <button
                className="px-4 py-2 bg-red-400 rounded-lg text-white"
                onClick={signOut}
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link to="/sign-in">
              <button className="px-4 py-2 bg-black text-white rounded-lg">
                Sign In
              </button>
            </Link>
          )}
        </nav>
        <button
          className="bg-neutral-950 text-white p-2 rounded-lg md:hidden relative z-50"
          onClick={() => setIsActive(!isActive)}
        >
          {isActive ? <X size={15} /> : <Menu size={15} />}
        </button>
        <SideMenu isActive={isActive} setIsActive={setIsActive} />
      </MaxWidthWrapper>
    </div>
  );
}
