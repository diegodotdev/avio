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
        <div className="w-full flex flex-col md:flex-row h-full gap-8 md:gap-0 py-8 md:py-0">
          <div className="w-full md:w-1/2 h-auto md:h-3/4 flex flex-col justify-center items-start gap-4">
            <p className="text-3xl font-[600] text-center md:text-left">
              Welcome to Avio
              <br className="hidden md:inline" /> Your Ultimate Recipe
              Collection!
            </p>
            <p className="opacity-50 text-center md:text-left">
              Discover many delicious recipes, from quick weeknight dinners to
              show-stopping desserts, all curated and crafted to suit every
              taste and occasion. Whether you&apos;re an experienced chef or
              just starting out in the kitchen, we&apos;ve got the perfect
              recipe to inspire your next meal.
            </p>
          </div>
          <div className="w-full md:w-1/2 h-auto md:h-3/4 grid place-items-center">
            <SearchForm />
          </div>
        </div>
      </MaxWidthWrapper>
    </motion.div>
  );
}
