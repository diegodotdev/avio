import { signInFormSchema } from "../../lib/schemas";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { cn } from "../../lib/utils";
import { Loader2 } from "lucide-react";

export default function SignInPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const signIn = async (body: z.infer<typeof signInFormSchema>) => {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/users/sign-in`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
    const result = await response.json();
    return result;
  };

  const onSubmit = async (values: z.infer<typeof signInFormSchema>) => {
    setLoading(true);
    const data = await signIn(values);

    if (data.access) {
      setLoading(false);
      localStorage.setItem("user", values.username);
      navigate("/");
    } else {
      setLoading(false);
      toast.error("Username or password is incorrect, try again");
    }
  };
  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="w-full relative z-50 md:w-1/2 h-full grid place-items-center"
    >
      <div className="flex flex-col gap-8 justify-center items-center w-4/5 md:w-full bg-white px-2 py-4 rounded-lg">
        <p className="text-4xl font-[600]">Welcome back</p>
        <Controller
          name="username"
          control={form.control}
          render={({ field }) => (
            <input
              type="text"
              placeholder="Username"
              className={cn(
                "w-4/5 md:w-2/5 px-4 py-2 bg-gray-100 rounded-lg outline-none border-2 border-transparent",
                form.formState.errors.username ? "border-red-400" : ""
              )}
              {...field}
            />
          )}
        />
        <Controller
          name="password"
          control={form.control}
          render={({ field }) => (
            <input
              type="password"
              placeholder="Password"
              className={cn(
                "w-4/5 md:w-2/5 px-4 py-2 bg-gray-100 rounded-lg outline-none border-2 border-transparent",
                form.formState.errors.password ? "border-red-400" : ""
              )}
              {...field}
            />
          )}
        />
        <button
          disabled={loading}
          type="submit"
          className="w-4/5 md:w-2/5 bg-black text-white rounded-lg outline-none px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <Loader2 className="animate-spin mx-auto" size={19} />
          ) : (
            "Sign In"
          )}
        </button>
        <Link to="/sign-up">
          <p className="underline underline-offset-2 cursor-pointer">
            Don&apos;t have an account?
          </p>
        </Link>
      </div>
    </form>
  );
}
