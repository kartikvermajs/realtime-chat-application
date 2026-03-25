import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { authService } from "../../../services/authService";
import { Loader2, Lock, User } from "lucide-react";
import { toast } from "sonner";
import { AxiosError } from "axios";

interface RegisterFormProps {
  onSwitch: () => void;
}

const registerSchema = z
  .object({
    fullName: z.string().trim().min(2, { message: "Full name is too short" }),
    username: z
      .string()
      .regex(/^[a-z0-0_]+$/)
      .min(2, { message: "Username is too short" })
      .max(12, { message: "Username is too long" })
      .transform((val) => val.toLocaleLowerCase()),

    email: z.email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(5, { message: "Password must be at least 6 characters long" }),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password do not match",
    path: ["cofirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

const RegisterForm: React.FC<RegisterFormProps> = ({ onSwitch }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const mutation = useMutation({
    mutationFn: authService.register,
    onSuccess: () => {
      (onSwitch(), toast.success("Account Created! You can now signin!"));
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const msg = error.response?.data?.message || "Registration failed";
      toast.error(msg);
    },
  });

  const onSubmit = (data: RegisterFormData) => mutation.mutate(data);

  return (
    <>
      <h2 className="text-2xl font-bold text-dark mb-2">Create your account</h2>
      <p className="text-gray-500 text-sm sm-8">Join Our Community</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label
            htmlFor="fullName"
            className="block text-gray-700 mb-2 text-sm"
          >
            Full Name
          </label>
          <div className="relative mb-2">
            <User className="absolute inset-y-0 left-3 size-5 text-gray-400 top-1/2 -translate-y-1/2" />
            <input
              {...register("fullName")}
              className="text-sm w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="John Doe"
            />
          </div>
          {errors.fullName && (
            <p className="text-red-500 text-sm">{errors.fullName.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="username"
            className="block text-gray-700 mb-2 text-sm"
          >
            Username
          </label>
          <div className="relative mb-2">
            <User className="absolute inset-y-0 left-3 size-5 text-gray-400 top-1/2 -translate-y-1/2" />
            <input
              {...register("username")}
              className="text-sm w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="johndoe"
            />
          </div>
          {errors.username && (
            <p className="text-red-500 text-sm">{errors.username.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-gray-700 mb-2 text-sm">
            Email
          </label>
          <div className="relative mb-2">
            <User className="absolute inset-y-0 left-3 size-5 text-gray-400 top-1/2 -translate-y-1/2" />
            <input
              {...register("email")}
              className="text-sm w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="johndoe@example.com"
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-gray-700 mb-2 text-sm"
          >
            Password
          </label>
          <div className="relative mb-2">
            <Lock className="absolute inset-y-0 left-3 size-5 text-gray-400 top-1/2 -translate-y-1/2" />
            <input
              {...register("password")}
              className="text-sm w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="**********"
            />
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-gray-700 mb-2 text-sm"
          >
            Confirm Password
          </label>
          <div className="relative mb-2">
            <Lock className="absolute inset-y-0 left-3 size-5 text-gray-400 top-1/2 -translate-y-1/2" />
            <input
              {...register("confirmPassword")}
              className="text-sm w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="**********"
            />
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <button className="w-full bg-sky-500 hover:bg-sky-600 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition duration-300 flex justify-cente items-center">
          {mutation.isPending ? (
            <Loader2 className="animate-spin size-5" />
          ) : (
            "Create Account"
          )}
        </button>
      </form>

      <div className="text-center text-sm mt-4">
        <span className="text-gray-600">Already have an account? </span>
        <span className="text-primary font-medium  cursor-pointer hover:underline">
          Sign In
        </span>
      </div>
    </>
  );
};

export default RegisterForm;
