import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import * as zod from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, loadAuthData } from "@/redux/slice/auth/authSlice";
import { RootState } from "@/redux/store/store";

export const loginSchema = zod.object({
  email: zod.string().email("Email is not valid"),
  password: zod.string().min(1, "Password is required"),
});

export type LoginFormData = zod.infer<typeof loginSchema>;

export const useLogin = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.auth.users);

  useEffect(() => {
    dispatch(loadAuthData());
  }, [dispatch]);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginFormData>({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    setIsLoading(true);

    const user = users.find((u) => u.email === data.email);

    if (!user || user.password !== data.password) {
      toast.error("Invalid email or password");
      setIsLoading(false);
      return;
    }

    dispatch(loginUser(user));
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
    isLoading,
  };
};
