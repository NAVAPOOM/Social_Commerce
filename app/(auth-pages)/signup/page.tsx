"use client";

import React, { useState } from "react";
import { Button, Input, Link, Divider, Checkbox } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import MagnitaLogo from "@/components/icon/magnita-logo";
import { signUp } from "@/app/actions";
import { useRouter } from "next/navigation";
import { ThemeSwitch } from "@/components/theme-switch";
import { LanguageSwitch } from "@/components/lang-switch";
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from "usehooks-ts";
import { AnimatePresence, domAnimation, LazyMotion, m } from 'framer-motion';

export default function Signup() {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const router = useRouter();
  const isCompact = useMediaQuery("(max-width: 1024px)");
  const isMobile = useMediaQuery("(max-width: 768px)");

  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleConfirmVisibility = () => setIsConfirmVisible(!isConfirmVisible);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    const formData = new FormData(e.currentTarget);
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const result = await signUp(formData);

      if (result?.error) {
        setError(result.error);
      } else if (result?.success) {
        setSuccess(result.success);
      } else {
        setError("An unexpected error occurred.");
      }
    } catch (err) {
      setError("An error occurred during sign-up. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LazyMotion features={domAnimation}>
      <div className="relative flex flex-col lg:flex-row h-screen w-screen">
        {/* Brand Logo */}
        <m.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute left-4 top-5 lg:left-5 flex items-center gap-2 px-2 z-10"
        >
          <MagnitaLogo />
          <p className="font-medium">MAGNITA</p>
        </m.div>

        {/* Theme and Language Switch */}
        <m.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="fixed top-5 right-5 z-50 flex items-center gap-4 lg:top-5 lg:right-[53%] lg:transform lg:translate-x-1/2"
        >
          <ThemeSwitch />
          <LanguageSwitch />
        </m.div>

        {/* Sign Up Form */}
        <m.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex w-full lg:w-1/2 items-center justify-center bg-background p-4 lg:p-8"
        >
          <div className="flex w-full max-w-sm flex-col items-center gap-2 mt-16">
            <div className="w-full text-left">
              <p className="pb-2 text-xl font-medium">
                {t('Create Account')}
                <span aria-label="emoji" className="ml-2" role="img">
                  👋
                </span>
              </p>
              <p className="text-small text-default-500">
                {t('Sign up for a new account to get started')}
              </p>
            </div>

            <div className="flex w-full flex-col gap-2">
              <Button
                startContent={<Icon icon="flat-color-icons:google" width={24} />}
                variant="flat"
                disabled={isLoading}
                fullWidth
              >
                {t('Sign Up with Google')}
              </Button>
              <Button
                startContent={<Icon icon="logos:facebook" width={24} />}
                variant="flat"
                disabled={isLoading}
                fullWidth
              >
                {t('Sign Up with Facebook')}
              </Button>
            </div>

            <div className="flex w-full items-center gap-4 py-2">
              <Divider className="flex-1" />
              <p className="shrink-0 text-tiny text-default-500">OR</p>
              <Divider className="flex-1" />
            </div>

            <form className="flex w-full flex-col gap-2" onSubmit={handleSubmit}>
              <Input
                isRequired
                label={t('Username')}
                name="username"
                placeholder={t('Enter your name')}
                labelPlacement="outside"
                type="text"
                variant="flat"
                endContent={
                  <Icon
                    className="pointer-events-none text-2xl text-default-400"
                    icon="solar:user-bold"
                  />
                }
                disabled={isLoading}
              />
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
                  <button type="button" onClick={toggleVisibility} disabled={isLoading}>
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
                placeholder={t('Create a password')}
                labelPlacement="outside"
                type={isVisible ? "text" : "password"}
                variant="flat"
                disabled={isLoading}
              />
              <Input
                isRequired
                endContent={
                  <button type="button" onClick={toggleConfirmVisibility} disabled={isLoading}>
                    {isConfirmVisible ? (
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
                label={t('Confirm Password')}
                name="confirmPassword"
                placeholder={t('Confirm your Password')}
                labelPlacement="outside"
                type={isConfirmVisible ? "text" : "password"}
                variant="flat"
                disabled={isLoading}
              />
              <Input
                isRequired
                label={t('Phone Number')}
                name="phone"
                placeholder={t('Enter a 10-digit phone number')}
                maxLength={10}
                labelPlacement="outside"
                type="tel"
                variant="flat"
                endContent={
                  <Icon
                    className="pointer-events-none text-2xl text-default-400"
                    icon="solar:phone-bold"
                  />
                }
                disabled={isLoading}
              />
              <p className="shrink-0 text-tiny text-default-500 text-left">
                {t('Your phone number will only be used for better support experience. It will not be shared with third parties.')}
              </p>
              <Input
                label={t('Reference code')}
                name="code"
                placeholder={t('Enter reference code')}
                labelPlacement="outside"
                type="text"
                variant="flat"
                disabled={isLoading}
              />
              <Checkbox className="py-4" size="sm" isDisabled={isLoading}>
                {t('I agree with the')}&nbsp;
                <Link href="#" size="sm">
                  {t('Terms')}
                </Link>
                &nbsp; {t('and')}&nbsp;
                <Link href="#" size="sm">
                  {t('Privacy Policy')}
                </Link>
              </Checkbox>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              {success && <p className="text-green-500 text-sm">{success}</p>}
              <Button isLoading={isLoading} color="primary" type="submit" fullWidth>
                {isLoading ? t('Signing up...') : t('Sign Up')}
              </Button>
            </form>

            <p className="text-center text-small">
              {t('Already have an account?')}&nbsp;
              <Link href="/login" size="sm">
                {t('Log In')}
              </Link>
            </p>
          </div>
        </m.div>

        {/* Right side */}
        <AnimatePresence>
          {!isCompact && (
            <m.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.5 }}
              className="relative hidden lg:flex w-1/2 flex-col-reverse rounded-medium p-10 shadow-small bg-cover bg-center"
              style={{
                backgroundImage:
                  "url(https://ampolfood.com/assets/images/businessUnit/1707713320_e1676c07264da5029d4c.png)",
              }}
            >
              <div className="flex flex-col items-end gap-4">
                <span className="font-normal italic text-white shadow-lg">
                  {t('Advanced AI Chatbot and Store Management')}
                </span>
                <p className="w-full text-right text-2xl text-white shadow-lg">
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