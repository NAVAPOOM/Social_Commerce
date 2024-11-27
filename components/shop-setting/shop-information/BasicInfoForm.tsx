'use client';

import React from 'react';
import {
  Card,
  CardBody,
  Input,
  Textarea,
  Button,
  Image,
} from '@nextui-org/react';
import { Icon } from '@iconify/react';
import { useDropzone } from 'react-dropzone';

interface BasicInfoFormProps {
  onFormChange: () => void;
}

export default function BasicInfoForm({ onFormChange }: BasicInfoFormProps) {
  const [logo, setLogo] = React.useState<File | null>(null);
  const [banner, setBanner] = React.useState<File | null>(null);

  const {
    getRootProps: getLogoRootProps,
    getInputProps: getLogoInputProps,
    isDragActive: isLogoDragActive,
  } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png'],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      setLogo(acceptedFiles[0]);
      onFormChange();
    },
  });

  const {
    getRootProps: getBannerRootProps,
    getInputProps: getBannerInputProps,
    isDragActive: isBannerDragActive,
  } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png'],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      setBanner(acceptedFiles[0]);
      onFormChange();
    },
  });

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardBody className="gap-4">
          <div className="space-y-2">
            <h3 className="text-medium font-semibold">Shop Logo</h3>
            <p className="text-small text-default-500">
              Upload your shop logo. Recommended size: 200x200px
            </p>
          </div>
          <div
            {...getLogoRootProps()}
            className={`flex h-[200px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-default-200 bg-default-50 transition-colors ${
              isLogoDragActive ? 'border-primary bg-primary/10' : ''
            }`}
          >
            <input {...getLogoInputProps()} />
            {logo ? (
              <div className="flex flex-col items-center gap-2">
                <Image
                  alt="Logo preview"
                  className="h-24 w-24 rounded-lg object-cover"
                  src={URL.createObjectURL(logo)}
                />
                <p className="text-small text-default-500">
                  Click or drag to replace
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <Icon
                  className="text-default-400"
                  icon="solar:gallery-add-bold"
                  width={24}
                />
                <p className="text-center text-small text-default-500">
                  {isLogoDragActive
                    ? 'Drop the logo here'
                    : 'Click to upload or drag and drop'}
                </p>
              </div>
            )}
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardBody className="gap-4">
          <div className="space-y-2">
            <h3 className="text-medium font-semibold">Shop Banner</h3>
            <p className="text-small text-default-500">
              Upload your shop banner. Recommended size: 1200x300px
            </p>
          </div>
          <div
            {...getBannerRootProps()}
            className={`flex h-[200px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-default-200 bg-default-50 transition-colors ${
              isBannerDragActive ? 'border-primary bg-primary/10' : ''
            }`}
          >
            <input {...getBannerInputProps()} />
            {banner ? (
              <div className="flex flex-col items-center gap-2">
                <Image
                  alt="Banner preview"
                  className="h-24 w-48 rounded-lg object-cover"
                  src={URL.createObjectURL(banner)}
                />
                <p className="text-small text-default-500">
                  Click or drag to replace
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <Icon
                  className="text-default-400"
                  icon="solar:gallery-add-bold"
                  width={24}
                />
                <p className="text-center text-small text-default-500">
                  {isBannerDragActive
                    ? 'Drop the banner here'
                    : 'Click to upload or drag and drop'}
                </p>
              </div>
            )}
          </div>
        </CardBody>
      </Card>

      <Card className="lg:col-span-2">
        <CardBody className="gap-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Input
              isRequired
              label="Shop Name"
              labelPlacement="outside"
              placeholder="Enter your shop name"
              startContent={
                <Icon
                  className="text-default-400"
                  icon="solar:shop-2-linear"
                  width={16}
                />
              }
              variant="bordered"
              onChange={onFormChange}
            />
            <Input
              label="Shop Email"
              labelPlacement="outside"
              placeholder="Enter shop email"
              startContent={
                <Icon
                  className="text-default-400"
                  icon="solar:letter-linear"
                  width={16}
                />
              }
              type="email"
              variant="bordered"
              onChange={onFormChange}
            />
            <Input
              label="Phone Number"
              labelPlacement="outside"
              placeholder="Enter phone number"
              startContent={
                <Icon
                  className="text-default-400"
                  icon="solar:phone-linear"
                  width={16}
                />
              }
              type="tel"
              variant="bordered"
              onChange={onFormChange}
            />
            <Input
              label="Website"
              labelPlacement="outside"
              placeholder="Enter website URL"
              startContent={
                <Icon
                  className="text-default-400"
                  icon="solar:link-linear"
                  width={16}
                />
              }
              type="url"
              variant="bordered"
              onChange={onFormChange}
            />
          </div>
          <Textarea
            label="Shop Description"
            labelPlacement="outside"
            placeholder="Enter a description of your shop"
            variant="bordered"
            onChange={onFormChange}
          />
        </CardBody>
      </Card>
    </div>
  );
}