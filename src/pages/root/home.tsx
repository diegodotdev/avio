import { motion } from "framer-motion";
import MaxWidthWrapper from "../../components/max-width-wrapper";
import SearchForm from "../../components/search-form";

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <MaxWidthWrapper className="h-[90vh]">
        <div className="w-full flex h-full">
          <div className="w-1/2 h-3/4 flex flex-col justify-center items-start gap-4">
            <p className="text-3xl font-[600]">
              Welcome to Avio
              <br /> Your Ultimate Recipe Collection!
            </p>
            <p className="opacity-50">
              Discover many delicious recipes, from quick weeknight dinners to
              show-stopping desserts, all curated and crafted to suit every
              taste and occasion. Whether you&apos;re an experienced chef or
              just starting out in the kitchen, we&apos;ve got the perfect
              recipe to inspire your next meal.
            </p>
          </div>
          <div className="w-1/2 h-3/4 grid place-items-center">
            <SearchForm />
          </div>
        </div>
      </MaxWidthWrapper>
    </motion.div>
  );
}
