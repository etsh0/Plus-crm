import { useState } from "react";
import { useRouter } from "next/navigation";
import * as zod from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

export const loginSchema = zod.object({
  email: zod.string().email("Email is not valid"),
  password: zod.string().min(1, "Password is required"),
});

export type LoginFormData = zod.infer<typeof loginSchema>;

export const useLogin = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginFormData>({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    console.log("Login submitted:", data);
    // Simulation of API call
    toast.success("Welcome back! Signing you in...");
    setTimeout(() => {
      router.push("/dashboard");
    }, 1000);
  };

  return {
    handleSubmit,
    control,
    errors,
    onSubmit,
    showPassword,
    setShowPassword,
    focused,
    setFocused,
  };
};
