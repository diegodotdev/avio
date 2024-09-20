import { Link, useParams } from "react-router-dom";
import { getCook } from "../../lib/data";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/loading";
import MaxWidthWrapper from "../../components/max-width-wrapper";
import { motion } from "framer-motion";

export default function Cook() {
  const { id } = useParams();
  if (!id) return null;

  const { data, isLoading, error } = useQuery({
    queryKey: ["cook"],
    queryFn: () => getCook(id),
  });

  if (isLoading) return <Loading />;
  if (error) return <p>Error</p>;
  if (!data) return null;

  return (
    <MaxWidthWrapper className="flex flex-col gap-4">
      <div className="w-full h-[20vh] flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img
            src={data?.avatar}
            alt={`${data?.firstName} ${data?.lastName}`}
            className="h-32 object-cover rounded-lg"
          />
          <p className="text-xl font-[600]">
            {data?.firstName} {data?.lastName}
          </p>
        </div>
        <p>
          {data?.recipes?.length}{" "}
          {data?.recipes?.length > 1 ? "Recipes" : "Recipe"}
        </p>
      </div>
      <p className="text-2xl font-[600]">Recipes</p>
      <div className="w-full grid grid-cols-4 gap-8 place-items-start">
        {data?.recipes?.map((i, idx) => (
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
  );
}
