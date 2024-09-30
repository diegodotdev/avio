import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { getCooks } from "../../lib/data";
import Loading from "../../components/loading";
import MaxWidthWrapper from "../../components/max-width-wrapper";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { User } from "lucide-react";
import { urlFor } from "../../lib/sanity";

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
        <div className="w-full h-auto md:h-[20vh] flex flex-col md:flex-row justify-start md:justify-between items-start md:items-center gap-4 mb-8">
          <p className="text-3xl font-[600]">Cooks</p>
          <div className="w-full md:w-[400px] px-4 py-2 rounded-full border flex items-center gap-2">
            <Search size={15} />
            <input
              type="text"
              className="grow outline-none"
              placeholder="Search"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
          </div>
        </div>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-8 place-items-start">
          {filter &&
            filter.map((i, idx) => (
              <Link to={`/cooks/${i.username}`} key={i.id} className="w-full">
                <motion.div
                  className="w-full flex flex-col gap-2"
                  initial={{ opacity: 0, y: "10%" }}
                  animate={{ opacity: 1, y: "0%" }}
                  transition={{ delay: idx * 0.2 }}
                >
                  {i.avatar ? (
                    <img
                      src={urlFor(i.avatar).url()}
                      alt={i.firstName}
                      className="w-full md:h-[181px] rounded-lg object-cover"
                    />
                  ) : (
                    <div className="w-full md:h-[181px] grid place-items-center bg-gray-100 rounded-lg">
                      <User className="opacity-50" />
                    </div>
                  )}
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
