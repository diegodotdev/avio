import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/loading";
import { getRecipe } from "../../lib/data";
import { useParams, Link } from "react-router-dom";
import MaxWidthWrapper from "../../components/max-width-wrapper";
import { Dot } from "lucide-react";
import { urlFor } from "../../lib/sanity";

export default function Recipe() {
  const { id } = useParams();
  const { data, error, isLoading } = useQuery({
    queryKey: ["recipe"],
    queryFn: async () => getRecipe(id as string),
  });

  if (isLoading) return <Loading />;
  if (error) return <p>Error</p>;

  return (
    <MaxWidthWrapper className="py-10">
      <div className="w-full md:w-1/2 mx-auto flex flex-col gap-4">
        <p className="text-4xl font-[600]">{data?.title}</p>
        <img
          src={data && urlFor(data?.image).url()}
          alt={data?.title}
          className="w-full rounded-lg object-cover"
        />
        <div className="w-full flex justify-between items-center py-2">
          <Link to={`/cooks/${data?.user?.username}`}>
            <div>
              <p className="font-[600]">{data?.user?.username}</p>
            </div>
          </Link>
          <Link to={`/category/${data?.category}`}>
            <div className="bg-red-400 rounded-lg px-2 py-1">
              <p className="text-white">{data?.category}</p>
            </div>
          </Link>
        </div>
        <p className="text-xl font-[600]">Description</p>
        <p>{data?.description}</p>
        <p className="text-xl font-[600]">Ingredients</p>
        {data?.ingredients?.map((i, idx) => (
          <div key={idx} className="flex items-center">
            <Dot />
            <p>{i}</p>
          </div>
        ))}
        <p className="text-xl font-[600]">Instructions</p>
        {data?.instructions?.map((i, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <p>{idx + 1}.</p>
            <p>{i}</p>
          </div>
        ))}
      </div>
    </MaxWidthWrapper>
  );
}
