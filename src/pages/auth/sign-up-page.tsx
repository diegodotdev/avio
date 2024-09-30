import { signUpFormSchema } from "../../lib/schemas";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { cn } from "../../lib/utils";
import { Loader2 } from "lucide-react";

export default function SignUpPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      password: "",
    },
  });

  const signUp = async (body: z.infer<typeof signUpFormSchema>) => {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/users/sign-up`,
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

  const onSubmit = async (values: z.infer<typeof signUpFormSchema>) => {
    setLoading(true);
    const data = await signUp(values);

    if (data.message === "Username is already in use, try again") {
      toast.error(data.message);
    }

    if (data.message === "User created") {
      setLoading(false);
      localStorage.setItem("user", values.username);
      navigate("/");
    } else {
      setLoading(false);
      toast.error(data.message);
    }
  };
  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="w-full md:w-1/2 h-full grid place-items-center relative z-50"
    >
      <div className="w-4/5 flex flex-col gap-8 justify-center items-center bg-white rounded-lg px-2 py-4 md:w-full">
        <p className="text-4xl font-[600]">Welcome</p>
        <Controller
          name="firstName"
          control={form.control}
          render={({ field }) => (
            <input
              type="text"
              placeholder="First name"
              className={cn(
                "w-4/5 md:w-2/5 px-4 py-2 bg-gray-100 rounded-lg outline-none border-2 border-transparent",
                form.formState.errors.firstName ? "border-red-400" : ""
              )}
              {...field}
            />
          )}
        />
        <Controller
          name="lastName"
          control={form.control}
          render={({ field }) => (
            <input
              type="text"
              placeholder="Last name"
              className={cn(
                "w-4/5 md:w-2/5 px-4 py-2 bg-gray-100 rounded-lg outline-none border-2 border-transparent",
                form.formState.errors.lastName ? "border-red-400" : ""
              )}
              {...field}
            />
          )}
        />
        <Controller
          name="username"
          control={form.control}
          render={({ field }) => (
            <input
              type="text"
              placeholder="Create Username"
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
              placeholder="Create Password"
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
            "Sign Up"
          )}
        </button>
        <Link to="/sign-in">
          <p className="underline underline-offset-2 cursor-pointer">
            Already have an account?
          </p>
        </Link>
      </div>
    </form>
  );
}
