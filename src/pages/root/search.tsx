import { useSearchParams, Link } from "react-router-dom";
import MaxWidthWrapper from "../../components/max-width-wrapper";
import { useQuery } from "@tanstack/react-query";
import { getSearch } from "../../lib/data";
import Loading from "../../components/loading";
import { motion } from "framer-motion";
import { urlFor } from "../../lib/sanity";

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  if (!query) return <p>Invalid search</p>;

  const { data, isLoading, error } = useQuery({
    queryKey: ["search"],
    queryFn: async () => getSearch(query),
  });

  if (isLoading) return <Loading />;
  if (error) return <p>error</p>;
  return (
    <MaxWidthWrapper className="flex flex-col gap-8">
      <div className="w-full h-[15vh] flex justify-start items-center">
        <p className="text-3xl font-[600]">
          Showing results related to: {query}
        </p>
      </div>
      <p className="text-2xl font-[600]">Recipes: {data?.recipes?.length}</p>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-8 place-items-start">
        {data?.recipes?.length !== 0 ? (
          data?.recipes.map((i, idx) => (
            <Link to={`/recipes/${i.id}`} key={i.id} className="w-full">
              <motion.div
                className="w-full flex flex-col gap-2"
                initial={{ opacity: 0, y: "10%" }}
                animate={{ opacity: 1, y: "0%" }}
                transition={{ delay: idx * 0.2 }}
              >
                <img
                  src={urlFor(i.image).url()}
                  alt={i.title}
                  className="w-full md:h-[181px] rounded-lg object-cover"
                />
                <p className="font-[600] text-base">{i.title}</p>
              </motion.div>
            </Link>
          ))
        ) : (
          <div className="w-full grid place-items-center col-span-5">
            <p>No recipes found</p>
          </div>
        )}
      </div>
      <p className="text-2xl font-[600]">Users: {data?.users?.length}</p>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-8 place-items-start">
        {data?.users?.length !== 0 ? (
          data?.users.map((i, idx) => (
            <Link to={`/cooks/${i.username}`} key={i.id}>
              <motion.div
                className="w-full flex flex-col gap-2"
                initial={{ opacity: 0, y: "10%" }}
                animate={{ opacity: 1, y: "0%" }}
                transition={{ delay: idx * 0.2 }}
              >
                <img
                  src={urlFor(i.avatar).url()}
                  alt={i.firstName}
                  className="w-full md:h-[181px] rounded-lg object-cover"
                />
                <p className="font-[600] text-base">
                  {i.firstName} {i.lastName}
                </p>
              </motion.div>
            </Link>
          ))
        ) : (
          <div className="w-full grid place-items-center col-span-5">
            <p>No users found</p>
          </div>
        )}
      </div>
    </MaxWidthWrapper>
  );
}
