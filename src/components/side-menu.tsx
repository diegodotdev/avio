import { Dispatch, SetStateAction } from "react";
import { motion } from "framer-motion";
import { NAV_LINKS } from "../constants";
import { Link, useLocation } from "react-router-dom";
import { SignedIn, SignedOut, SignOutButton } from "@clerk/clerk-react";
import { Pen } from "lucide-react";

export default function SideMenu({
  isActive,
  setIsActive,
}: {
  isActive: boolean;
  setIsActive: Dispatch<SetStateAction<boolean>>;
}) {
  const location = useLocation();

  return (
    <motion.div
      className="w-full h-screen fixed top-0 right-0 bg-neutral-950 text-white z-40 pt-[10vh] flex flex-col justify-center items-center gap-10 translate-x-[100%] md:hidden"
      animate={{ x: isActive ? "0%" : "100%", opacity: isActive ? 1 : 0 }}
      transition={{ ease: "linear" }}
    >
      {NAV_LINKS.map((i) => (
        <Link to={i.href} key={i.id} className="w-2/5">
          <div
            className="flex items-center gap-2 w-full"
            onClick={() => setIsActive(false)}
          >
            <i.icon
              size={40}
              className={location.pathname === i.href ? "text-red-400" : ""}
            />
            <p className="text-3xl">{i.label}</p>
          </div>
        </Link>
      ))}
      <SignedIn>
        <Link to="/post" className="w-2/5">
          <div
            className="flex items-center gap-2 w-full"
            onClick={() => setIsActive(false)}
          >
            <Pen
              size={40}
              className={location.pathname === "/post" ? "text-red-400" : ""}
            />
            <p className="text-3xl">Post</p>
          </div>
        </Link>
        <SignOutButton>
          <button>Sign Out</button>
        </SignOutButton>
      </SignedIn>
      <SignedOut>
        <Link to="/sign-in" className="w-2/5">
          <button
            className="w-full bg-white rounded-lg text-neutral-950 py-2 text-3xl"
            onClick={() => setIsActive(false)}
          >
            Sign In
          </button>
        </Link>
      </SignedOut>
    </motion.div>
  );
}
