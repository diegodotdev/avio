import { Loader } from "lucide-react";
import MaxWidthWrapper from "./max-width-wrapper";

export default function Loading() {
  return (
    <MaxWidthWrapper className="h-[40vh] grid place-items-center">
      <Loader className="animate-spin" size="15px" />
    </MaxWidthWrapper>
  );
}
