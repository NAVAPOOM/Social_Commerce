"use client";

import React from "react";
import {Button, Image, Link} from "@nextui-org/react";
import {Icon} from "@iconify/react";

import { cn } from '@nextui-org/react';

export type Store = {
  name: string;
  imageSrc: string;
  type: string;
  address?: string;
  social: {
    line: string;
    facebook: string;
    instagram: string;
    website: string;
  };
};

export type StoreCardProps = React.HTMLAttributes<HTMLDivElement> & Store;

const StoreCard = React.forwardRef<HTMLDivElement, StoreCardProps>(
  ({children, imageSrc, name, type, address, social, className, ...props}, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex flex-col items-center rounded-large bg-content2 px-4 py-6 text-center shadow-small",
        className,
      )}
      {...props}
    >
      <Image
        alt={name}
        className={cn(
          "h-auto max-h-[160px] w-auto object-contain transition-transform duration-300 ease-in-out hover:scale-105"
        )}
        src={imageSrc}
      />
      <h3 className="mt-2 font-medium">{name || children}</h3>
      <span className="text-small text-default-500">{type}</span>
      <p className="mb-4 mt-2 text-default-600">{address}</p>
      <div className="flex gap-4">
        {social?.line && (
          <Link isExternal href="#">
            <Icon className="text-default-400" icon="bi:line" width={20} />
          </Link>
        )}
        {social?.facebook && (
          <Link isExternal href="#">
            <Icon className="text-default-400" icon="bi:facebook" width={20} />
          </Link>
        )}
        {social?.instagram && (
          <Link isExternal href="#">
            <Icon className="text-default-400" icon="bi:instagram" width={20} />
          </Link>
        )}
        {social?.website && (
          <Link isExternal href="#">
            <Icon className="text-default-400" icon="bi:globe" width={20} />
          </Link>
        )}
      </div>
      <Button
        fullWidth
        className="w-full mt-4"
        color="danger"
        radius="lg"
        variant="flat"
      >
        Visit Store
      </Button>
    </div>
  ),
);

StoreCard.displayName = "StoreCard";

export default StoreCard;