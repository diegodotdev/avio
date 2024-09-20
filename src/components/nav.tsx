import { Link, useLocation } from "react-router-dom";
import MaxWidthWrapper from "./max-width-wrapper";
import { NAV_LINKS } from "../constants";
import { cn } from "../lib/utils";
import { SignedIn, SignedOut, SignOutButton } from "@clerk/clerk-react";
import { Pen } from "lucide-react";

export default function Nav() {
  const location = useLocation();

  return (
    <div className="w-full h-[10vh]">
      <MaxWidthWrapper className="h-full flex justify-between items-center">
        <Link to="/">
          <span className="montserrat font-[600] text-4xl">Avio</span>
        </Link>
        <nav className="flex items-center gap-8">
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
          <SignedIn>
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
            <SignOutButton>
              <button className="px-4 py-2 rounded-lg bg-red-400 text-white">
                Sign Out
              </button>
            </SignOutButton>
          </SignedIn>
          <SignedOut>
            <Link to="/sign-in">
              <button className="px-4 py-2 rounded-lg bg-neutral-950 text-white">
                Sign In
              </button>
            </Link>
          </SignedOut>
        </nav>
      </MaxWidthWrapper>
    </div>
  );
}
