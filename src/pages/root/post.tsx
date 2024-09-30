import { useForm, Controller, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import MaxWidthWrapper from "../../components/max-width-wrapper";
import { Dot, Image, Loader2, Plus, X } from "lucide-react";
import { sanity, urlFor } from "../../lib/sanity";
import { useState } from "react";
import { CATEGORIES } from "../../constants";
import { recipeFormSchema } from "../../lib/schemas";
import { toast } from "sonner";
import { createRecipe } from "../../lib/utils";
import useGetUser from "../../hooks/useGetUser";

export default function Post() {
  const { user } = useGetUser();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const form = useForm<z.infer<typeof recipeFormSchema>>({
    resolver: zodResolver(recipeFormSchema),
    defaultValues: {
      title: "",
      description: "",
      image: "",
      category: "",
      ingredients: [],
      instructions: [],
      username: "",
    },
  });

  const uploadImage = (e: any) => {
    const selectedFile = e.target.files[0];
    // uploading asset to sanity
    if (
      selectedFile.type === "image/png" ||
      selectedFile.type === "image/svg" ||
      selectedFile.type === "image/jpeg" ||
      selectedFile.type === "image/gif" ||
      selectedFile.type === "image/tiff"
    ) {
      setLoading(true);
      sanity.assets
        .upload("image", selectedFile, {
          contentType: selectedFile.type,
          filename: selectedFile.name,
        })
        .then((document: any) => {
          setImage(document?._id);
          form.setValue("image", document?._id);
          setLoading(false);
        })
        .catch((error) => {
          console.log("Upload failed:", error.message);
        });
    } else {
      setLoading(false);
    }
  };

  const onSubmit = async (values: z.infer<typeof recipeFormSchema>) => {
    setUploading(true);
    const ingredients = values.ingredients.map((i) => i.value);
    const instructions = values.instructions.map((i) => i.value);
    const payload = {
      ...values,
      ingredients,
      instructions,
      username: user as string,
    };

    const data = await createRecipe(payload);

    if (data.message === "Recipe has been created!") {
      setUploading(false);
      toast.success(data.message);
      form.reset();
      setImage(null);
    } else {
      setUploading(false);
      toast.error("Something went wrong, try again");
    }
  };

  const {
    fields: ing,
    append: addIng,
    remove: remIng,
  } = useFieldArray({
    control: form.control,
    name: "ingredients",
  });

  const {
    fields: ins,
    append: addIns,
    remove: remIns,
  } = useFieldArray({
    control: form.control,
    name: "instructions",
  });

  return (
    <MaxWidthWrapper className="grid place-items-center">
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full lg:w-1/2 flex flex-col gap-8 py-20"
      >
        <Controller
          name="title"
          control={form.control}
          render={({ field }) => (
            <input
              {...field}
              placeholder="Title"
              className="w-full py-2 text-xl font-[600] outline-none"
            />
          )}
        />
        <Controller
          name="description"
          control={form.control}
          render={({ field }) => (
            <textarea
              {...field}
              placeholder="Description"
              className="w-full py-2 text-lg outline-none resize-none h-[150px]"
            />
          )}
        />
        <div className="w-full h-[400px] rounded-lg border border-gray-200 p-4 grid place-items-center">
          {!image && !loading ? (
            <label className="w-full h-full grid place-items-center">
              <input
                type="file"
                onChange={uploadImage}
                className="absolute w-0 h-0 opacity-0"
              />
              <Image size={15} className="text-gray-400" />
            </label>
          ) : loading ? (
            <Loader2 className="animate-spin" size={15} />
          ) : (
            image && (
              <div className="relative w-full h-full grid place-items-center">
                <button
                  onClick={() => setImage(null)}
                  className="absolute top-2 right-2 bg-red-400 rounded-lg p-2 text-white"
                >
                  <X size={15} />
                </button>
                <img
                  src={urlFor(image).url()}
                  alt="uploaded image"
                  className="h-[370px] rounded-lg"
                />
              </div>
            )
          )}
        </div>
        <Controller
          name="category"
          control={form.control}
          render={({ field }) => (
            <select {...field} className="outline-none text-lg">
              <option value="">Select category</option>
              {CATEGORIES.map((i) => (
                <option key={i.id} value={i.value}>
                  {i.value}
                </option>
              ))}
            </select>
          )}
        />
        <div className="w-full flex justify-between items-center">
          <p className="font-[600] text-lg">Ingredients</p>
          <button
            onClick={() => addIng({ value: "" })}
            type="button"
            className="p-2 bg-black rounded-lg text-white"
          >
            <Plus size={15} />
          </button>
        </div>
        {ing.map((field, index) => (
          <div className="flex items-center gap-1 w-full" key={index}>
            <Dot />
            <Controller
              name={`ingredients.${index}.value`}
              key={field.id}
              control={form.control}
              render={({ field }) => (
                <input
                  placeholder="Ingredient"
                  className="py-2 rounded-lg outline-none grow"
                  {...field}
                />
              )}
            />
            <button
              type="button"
              onClick={() => remIng(index)}
              className="mt-2 p-2 bg-red-400 rounded-lg text-white"
            >
              <X size={15} />
            </button>
          </div>
        ))}
        <div className="w-full flex justify-between items-center">
          <p className="font-[600] text-lg">Instructions</p>
          <button
            onClick={() => addIns({ value: "" })}
            type="button"
            className="mt-2 p-2 bg-black rounded-lg text-white"
          >
            <Plus size={15} />
          </button>
        </div>
        {ins.map((field, index) => (
          <div
            className="flex items-start justify-start gap-4 w-full"
            key={index}
          >
            <p className="pt-2">{index + 1}.</p>
            <Controller
              name={`instructions.${index}.value`}
              key={field.id}
              control={form.control}
              render={({ field }) => (
                <textarea
                  placeholder="Instruction"
                  className="py-2 rounded-lg outline-none grow resize-none min-h-[150px]"
                  {...field}
                />
              )}
            />
            <button
              type="button"
              onClick={() => remIns(index)}
              className="mt-2 p-2 bg-red-400 rounded-lg text-white"
            >
              <X size={15} />
            </button>
          </div>
        ))}
        <button
          disabled={uploading}
          className="w-full px-4 py-2 bg-black text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          type="submit"
        >
          {uploading ? <Loader2 size={19} className="animate-spin" /> : "Post"}
        </button>
      </form>
    </MaxWidthWrapper>
  );
}
