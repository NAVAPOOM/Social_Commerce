import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { FC } from "react";
import { VisuallyHidden } from "@react-aria/visually-hidden";
import { SwitchProps, useSwitch } from "@nextui-org/switch";
import { useIsSSR } from "@react-aria/ssr";
import clsx from "clsx";
import { Icon } from "@iconify/react";

export interface LanguageSwitchProps {
  className?: string;
  classNames?: SwitchProps["classNames"];
}

export const LanguageSwitch: FC<LanguageSwitchProps> = ({
  className,
  classNames,
}) => {
  const { i18n } = useTranslation(); // ใช้ i18n จาก react-i18next
  const [language, setLanguage] = useState(i18n.language); // ใช้ภาษาปัจจุบันจาก i18n
  const isSSR = useIsSSR();

  const onChange = () => {
    const newLanguage = language === 'en' ? 'th' : 'en';
    setLanguage(newLanguage);
    i18n.changeLanguage(newLanguage); // เปลี่ยนภาษาผ่าน i18n
  };

  const {
    Component,
    slots,
    isSelected,
    getBaseProps,
    getInputProps,
    getWrapperProps,
  } = useSwitch({
    isSelected: language === "en",
    "aria-label": `Switch to ${language === "en" ? "Thai" : "English"} language`,
    onChange,
  });

  return (
    <Component
      {...getBaseProps({
        className: clsx(
          "px-px transition-opacity hover:opacity-80 cursor-pointer",
          className,
          classNames?.base,
        ),
      })}
    >
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <div
        {...getWrapperProps()}
        className={slots.wrapper({
          class: clsx(
            [
              "w-auto h-auto",
              "bg-transparent",
              "rounded-lg",
              "flex items-center justify-center",
              "group-data-[selected=true]:bg-transparent",
              "!text-default-500",
              "pt-px",
              "px-0",
              "mx-0",
            ],
            classNames?.wrapper,
          ),
        })}
      >
        {!isSelected || isSSR ? (
          <Icon icon="circle-flags:uk" width={24} style={{ pointerEvents: 'none' }}/>
        ) : (
          <Icon icon="circle-flags:th" width={24} style={{ pointerEvents: 'none' }}/>
        )}
      </div>
    </Component>
  );
};
