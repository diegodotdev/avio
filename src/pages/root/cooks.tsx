import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { getCooks } from "../../lib/data";
import Loading from "../../components/loading";
import MaxWidthWrapper from "../../components/max-width-wrapper";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Cooks() {
  const [search, setSearch] = useState("");
  const { data, isLoading, error } = useQuery({
    queryKey: ["cooks"],
    queryFn: async () => getCooks(),
  });

  if (isLoading) return <Loading />;
  if (error) return <p>Error</p>;
  if (!data) return null;

  const filter =
    data &&
    data?.filter(
      (e) =>
        e.firstName.toLowerCase().includes(search.toLowerCase()) ||
        e.lastName.toLowerCase().includes(search.toLowerCase())
    );
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <MaxWidthWrapper>
        <div className="w-full h-[20vh] flex justify-between items-center">
          <p className="text-3xl font-[600]">Cooks</p>
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
              <Link to={`/cooks/${i.clerkId}`} key={i.id}>
                <motion.div
                  className="w-full flex flex-col gap-2"
                  initial={{ opacity: 0, y: "10%" }}
                  animate={{ opacity: 1, y: "0%" }}
                  transition={{ delay: idx * 0.2 }}
                >
                  <img
                    src={i.avatar}
                    alt={i.firstName}
                    className="h-[181px] rounded-lg object-cover"
                  />
                  <p className="font-[600] text-base">
                    {i.firstName} {i.lastName}
                  </p>
                </motion.div>
              </Link>
            ))}
        </div>
      </MaxWidthWrapper>
    </motion.div>
  );
}
