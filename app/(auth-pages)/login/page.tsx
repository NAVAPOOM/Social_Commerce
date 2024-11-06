// app/(auth-pages)/login/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { Button, Input, Link, Divider, Checkbox } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { logIn } from "@/app/actions";
import { useRouter, useSearchParams } from "next/navigation";
import { ThemeSwitch } from "@/components/theme-switch";
import { LanguageSwitch } from "@/components/lang-switch";
import MagnitaLogo from "@/components/icon/magnita-logo";
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from "usehooks-ts";
import { AnimatePresence, domAnimation, LazyMotion, m } from 'framer-motion';

export default function Login() {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();

  const isCompact = useMediaQuery("(max-width: 1024px)");
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    const messageParam = searchParams.get("message");
    if (messageParam) {
      setMessage(messageParam);
    }
  }, [searchParams]);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      setError("Please provide both email and password.");
      setIsLoading(false);
      return;
    }

    const result = await logIn(formData);

    if (result?.error) {
      setError(result.error);
    } else {
      router.push("/project"); 
    }

    setIsLoading(false);
  };

  return (
    <LazyMotion features={domAnimation}>
      <div className="relative flex h-screen w-screen">
        {/* Brand Logo */}
        <m.div 
          className="absolute left-2 top-5 lg:left-5"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-2 px-2">
            <MagnitaLogo />
            <p className="font-medium">MAGNITA</p>
          </div>
        </m.div>

        {/* Theme Switch and Language Switch*/}
        <m.div 
          className="fixed top-5 right-5 z-50 flex items-center gap-4 lg:top-5 lg:right-[53%] lg:transform lg:translate-x-1/2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <ThemeSwitch />
          <LanguageSwitch/>
        </m.div>
        
        {/* Login Form */}
        <m.div 
          className="flex w-full items-center justify-center bg-background lg:w-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex w-full max-w-sm flex-col items-center gap-4 p-4">
            <div className="w-full text-left">
              <p className="pb-2 text-xl font-medium">
                {t('Welcome Back')}
                <span aria-label="emoji" className="ml-2" role="img">
                  👋
                </span>
              </p>
              <p className="text-small text-default-500">
                {t('Log in to your account to continue')}
              </p>
            </div>

            {message && <p className="text-green-500 text-sm">{message}</p>}

            <div className="flex w-full flex-col gap-2">
              <Button
                startContent={<Icon icon="logos:google-icon" width={24} />}
                variant="bordered"
                disabled={isLoading}  
              >
                {t('Continue with Google')}
              </Button>
              <Button
                startContent={<Icon className="text-default-500" icon="logos:facebook" width={24} />}
                variant="bordered"
                disabled={isLoading}  
              >
                {t('Continue with Facebook')}
              </Button>
            </div>

            <div className="flex w-full items-center gap-4 py-2">
              <Divider className="flex-1" />
              <p className="shrink-0 text-tiny text-default-500">{t('OR')}</p>
              <Divider className="flex-1" />
            </div>

            <form className="flex w-full flex-col gap-3" onSubmit={handleSubmit}>
              <Input
                isRequired
                label={t('Email Address')}
                name="email"
                placeholder={t('Enter your email')}
                labelPlacement="outside"
                type="email"
                variant="flat"
                endContent={
                  <Icon
                    className="pointer-events-none text-2xl text-default-400"
                    icon="solar:letter-bold"
                  />
                }
                disabled={isLoading}  
              />
              <Input
                isRequired
                endContent={
                  <button type="button" onClick={toggleVisibility}>
                    {isVisible ? (
                      <Icon
                        className="pointer-events-none text-2xl text-default-400"
                        icon="solar:eye-closed-linear"
                      />
                    ) : (
                      <Icon
                        className="pointer-events-none text-2xl text-default-400"
                        icon="solar:eye-bold"
                      />
                    )}
                  </button>
                }
                label={t('Password')}
                name="password"
                placeholder={t('Enter your password')}
                labelPlacement="outside"
                type={isVisible ? "text" : "password"}
                variant="flat"
                disabled={isLoading} 
              /> 
              <div className="flex items-center justify-between px-1 py-2">
                <Checkbox name="remember" size="sm">
                  {t('Remember me')}
                </Checkbox>
                <Link className="text-default-500" href="#" size="sm">
                  {t('Forgot password?')}
                </Link>
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <Button isLoading={isLoading} color="primary" type="submit">
                {isLoading ? t('Logging in...') : t('Log In')}
              </Button>
            </form>

            <p className="text-center text-small">
              {t('Need to create an account?')}&nbsp;
              <Link href="/signup" size="sm">
                {t('Sign Up')}
              </Link>
            </p>
          </div>
        </m.div>

        {/* Right side */}
        <AnimatePresence>
          {!isCompact && (
            <m.div
              className="relative hidden w-1/2 flex-col-reverse rounded-medium p-10 shadow-small lg:flex"
              style={{
                backgroundImage:
                  "url(https://ampolfood.com/assets/images/businessUnit/1707713320_e1676c07264da5029d4c.png)",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-col items-end gap-4">
                <span className="font-normal italic">
                  {t('Advanced AI Chatbot and Store Management')}
                </span>
                <p className="w-full text-right text-2xl text-black/60">
                  <span className="font-medium">"</span>
                  <span className="font-normal italic">
                    {t('Our service provides AI Chatbot for online retailers to recommend products, close sales, and support store management as a salesperson.')}
                  </span>
                  <span className="font-medium">"</span>
                </p>
              </div>
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </LazyMotion>
  );
}