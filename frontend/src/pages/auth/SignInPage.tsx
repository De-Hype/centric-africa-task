import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { loginSchema } from "../../lib/validations/authValidations";
import { LoginAccountAPI } from "../../lib/services/userService";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import storeAccessToken from "../../lib/cookies/storeAccessToken";

type LoginFormInputs = z.infer<typeof loginSchema>;

const SignInPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });
  const navigate = useNavigate();
  const onSubmit = async (data: LoginFormInputs) => {
    console.log("Form Data:", data);
    try {
      const response = await LoginAccountAPI(data);
      storeAccessToken(response.data.refreshToken);
      navigate("/");
      toast.success("Account created successfully!");
    } catch (error) {
      console.log("Error occured:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-md"
      >
        <h2 className="text-2xl font-semibold text-center">Sign In</h2>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register("email")}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            {...register("password")}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {isSubmitting ? "Signing in..." : "Sign In"}
        </button>

        <div className="text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/sign-up" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignInPage;
