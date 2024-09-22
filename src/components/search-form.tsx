import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

const formSchema = z.object({
  search: z.string().min(1),
});

export default function SearchForm() {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    navigate(`/search?query=${values.search}`);
  };
  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      {...form}
      className="w-full md:w-3/4 rounded-xl border-[5px] border-black p-8 flex justify-center items-center gap-8 flex-col"
    >
      <p className="text-2xl font-[600]">Get Started</p>
      <Controller
        name="search"
        control={form.control}
        render={({ field }) => (
          <div className="w-full flex items-center gap-2 bg-gray-200 px-4 py-2 rounded-full">
            <Search size={15} />
            <input
              type="text"
              placeholder="Search"
              {...field}
              className="bg-transparent grow outline-none"
            />
          </div>
        )}
      />
    </form>
  );
}
