import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { getRecipesByCategory } from "../../lib/data";
import Loading from "../../components/loading";
import MaxWidthWrapper from "../../components/max-width-wrapper";
import { Search } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";

export default function Category() {
  const { id } = useParams();
  if (!id) return null;
  const [search, setSearch] = useState("");
  const { data, isLoading, error } = useQuery({
    queryKey: ["recipes"],
    queryFn: async () => getRecipesByCategory(id),
  });

  if (isLoading) return <Loading />;
  if (error) return <p>Error</p>;

  const filter = data?.filter((e) =>
    e.title.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <MaxWidthWrapper>
        <div className="w-full h-[20vh] flex justify-between items-center">
          <p className="text-3xl font-[600]">Recipes</p>
          <div className="w-[400px] px-4 py-2 rounded-full border flex items-center gap-2">
            <Search size="15px" />
            <input
              type="text"
              className="grow outline-none"
              placeholder="Search"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
          </div>
        </div>
        <div className="w-full grid grid-cols-4 gap-8 place-items-start">
          {filter &&
            filter.map((i, idx) => (
              <Link to={`/recipes/${i.id}`} key={i.id}>
                <motion.div
                  className="w-full flex flex-col gap-2"
                  initial={{ opacity: 0, y: "10%" }}
                  animate={{ opacity: 1, y: "0%" }}
                  transition={{ delay: idx * 0.2 }}
                >
                  <img
                    src={i.image}
                    alt={i.title}
                    className="h-[181px] rounded-lg object-cover"
                  />
                  <p className="font-[600] text-base">{i.title}</p>
                </motion.div>
              </Link>
            ))}
        </div>
      </MaxWidthWrapper>
    </motion.div>
  );
}
