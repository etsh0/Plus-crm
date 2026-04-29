"use client";

import Link from "next/link";
import Image from "next/image";
import bgImg from "@/assets/light-pillar-1776934798991.png";
import { Controller } from "react-hook-form";
import { useRegister } from "@/hooks/use-register";

export default function RegisterForm() {
  const {
    handleSubmit,
    control,
    errors,
    onSubmit,
    showPassword,
    setShowPassword,
    focused,
    setFocused,
  } = useRegister();

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* ── Register Page background image ── */}
      <Image
        src={bgImg}
        alt=""
        fill
        priority
        className="object-cover object-center -z-10"
      />

      {/* ── Subtle dark overlay so the form is readable ── */}
      <div className="absolute inset-0 -z-10 bg-black/40" />

      {/* ── Content pushed below the fixed navbar ── */}
      {/* Navbar is: fixed top-0, mt-10 (~40px), py-3 (~24px), ~36px content ≈ 100px total */}
      <div className="flex justify-center px-4 pt-32 pb-16">
        <div className="w-full max-w-md">
          {/* ── Glass card ── */}
          <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_32px_80px_0_rgba(0,0,0,0.5)] px-8 py-10 sm:px-10">
            {/* Logo / brand */}
            <div className="flex flex-col items-center mb-8">
              <Link
                href="/"
                className="text-2xl font-bold tracking-tight text-white select-none mb-1"
              >
                PLUS CRM
              </Link>
              <p className="text-white/50 text-sm">Create a new account</p>
            </div>

            {/* ── Form ── */}
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
              {/* Username */}
              <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="username"
                    className="text-xs font-medium text-white/50 uppercase tracking-widest"
                  >
                    Username
                  </label>
                  <div
                    className={`flex items-center rounded-xl border transition-all duration-300 ${
                      focused === "username"
                        ? "border-white/40 shadow-[0_0_0_3px_rgba(255,255,255,0.08)] bg-white/10"
                        : "border-white/10 bg-white/5"
                    }`}
                  >
                    <span className="pl-4 text-white/40 shrink-0">
                      <svg
                        width="16"
                        height="16"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.8}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                        />
                      </svg>
                    </span>
                    <input
                      {...field}
                      id="username"
                      type="text"
                      autoComplete="username"
                      placeholder="your_username"
                      onFocus={() => setFocused("username")}
                      onBlur={() => { field.onBlur(); setFocused(null); }}
                      className="w-full bg-transparent px-3 py-3.5 text-sm text-white placeholder-white/25 outline-none"
                    />
                  </div>
                  {errors.username && (
                    <p className="text-xs text-red-400 mt-1">{errors.username.message}</p>
                  )}
                </div>
              )}
              />

              {/* Email */}
              <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="email"
                    className="text-xs font-medium text-white/50 uppercase tracking-widest"
                  >
                    Email
                  </label>
                  <div
                    className={`flex items-center rounded-xl border transition-all duration-300 ${
                      focused === "email"
                        ? "border-white/40 shadow-[0_0_0_3px_rgba(255,255,255,0.08)] bg-white/10"
                        : "border-white/10 bg-white/5"
                    }`}
                  >
                    <span className="pl-4 text-white/40 shrink-0">
                      <svg
                        width="16"
                        height="16"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.8}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                        />
                      </svg>
                    </span>
                    <input
                      {...field}
                      id="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      onFocus={() => setFocused("email")}
                      onBlur={() => { field.onBlur(); setFocused(null); }}
                      className="w-full bg-transparent px-3 py-3.5 text-sm text-white placeholder-white/25 outline-none"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>
                  )}
                </div>
              )}
              />

              {/* Password */}
              <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="text-xs font-medium text-white/50 uppercase tracking-widest"
                    >
                      Password
                    </label>
                  </div>
                  <div
                    className={`flex items-center rounded-xl border transition-all duration-300 ${
                      focused === "password"
                        ? "border-white/40 shadow-[0_0_0_3px_rgba(255,255,255,0.08)] bg-white/10"
                        : "border-white/10 bg-white/5"
                    }`}
                  >
                    <span className="pl-4 text-white/40 shrink-0">
                      <svg
                        width="16"
                        height="16"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.8}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                        />
                      </svg>
                    </span>
                    <input
                      {...field}
                      id="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      placeholder="••••••••"
                      onFocus={() => setFocused("password")}
                      onBlur={() => { field.onBlur(); setFocused(null); }}
                      className="w-full bg-transparent px-3 py-3.5 text-sm text-white placeholder-white/25 outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((p) => !p)}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      className="pr-4 text-white/35 hover:text-white/70 transition-colors duration-200 shrink-0"
                    >
                      {showPassword ? (
                        <svg
                          width="16"
                          height="16"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={1.8}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                          />
                        </svg>
                      ) : (
                        <svg
                          width="16"
                          height="16"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={1.8}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-xs text-red-400 mt-1">{errors.password.message}</p>
                  )}
                </div>
              )}
              />

              {/* Submit */}
              <button
                id="register-submit"
                type="submit"
                className="
                  mt-2 w-full py-3.5 rounded-xl text-sm font-semibold tracking-wide
                  bg-white/10 border border-white/20
                  text-white
                  hover:bg-white/20 hover:border-white/40
                  active:scale-[0.98]
                  shadow-[0_4px_24px_rgba(0,0,0,0.3)]
                  hover:shadow-[0_6px_32px_rgba(0,0,0,0.5)]
                  transition-all duration-300
                "
              >
                Register
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-white/25 text-xs">or</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            {/* Sign up link */}
            <p className="text-center text-sm text-white/40">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-white/80 hover:text-white font-medium underline underline-offset-2 transition-colors duration-200"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
