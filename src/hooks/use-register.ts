import { useState } from "react";
import { useRouter } from "next/navigation";
import * as zod from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

export const registerSchema = zod.object({
  username: zod.string().min(1, "Username is required"),
  email: zod.string().email("Email is not valid"),
  password: zod.string().regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    "Min 8 chars, with uppercase, lowercase, number & special character"
  ),
});

export type RegisterFormData = zod.infer<typeof registerSchema>;

export const useRegister = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterFormData>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterFormData) => {
    console.log("Register submitted:", data);
    setIsLoading(true);
    toast.success("Account created successfully! Welcome aboard.");
    setTimeout(() => {
      router.push("/dashboard");
    }, 1500);
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
    isLoading,
  };
};
