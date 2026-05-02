import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import * as zod from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, loadAuthData } from "@/redux/slice/auth/authSlice";
import { RootState } from "@/redux/store/store";

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
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.auth.users);

  useEffect(() => {
    dispatch(loadAuthData());
  }, [dispatch]);

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
    setIsLoading(true);

    const existingUser = users.find((u) => u.email === data.email);
    if (existingUser) {
      toast.error("Email is already registered");
      setIsLoading(false);
      return;
    }

    const newUser = {
      id: Date.now().toString(),
      name: data.username,
      email: data.email,
      password: data.password,
    };

    dispatch(registerUser(newUser));
    toast.success("Account created successfully! Please sign in.");
    setTimeout(() => {
      router.push("/login");
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
