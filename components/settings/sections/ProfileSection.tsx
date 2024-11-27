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

interface ProfileSectionProps {
  onFormChange: () => void;
}

export default function ProfileSection({ onFormChange }: ProfileSectionProps) {
  const [avatar, setAvatar] = React.useState<File | null>(null);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
  } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png'],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      setAvatar(acceptedFiles[0]);
      onFormChange();
    },
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardBody className="gap-4">
          <div className="space-y-2">
            <h3 className="text-medium font-semibold">Profile Picture</h3>
            <p className="text-small text-default-500">
              Upload your profile picture. Recommended size: 200x200px
            </p>
          </div>
          <div
            {...getRootProps()}
            className={`flex h-[200px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-default-200 bg-default-50 transition-colors ${
              isDragActive ? 'border-primary bg-primary/10' : ''
            }`}
          >
            <input {...getInputProps()} />
            {avatar ? (
              <div className="flex flex-col items-center gap-2">
                <Image
                  alt="Avatar preview"
                  className="h-24 w-24 rounded-full object-cover"
                  src={URL.createObjectURL(avatar)}
                />
                <p className="text-small text-default-500">
                  Click or drag to replace
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <Icon
                  className="text-default-400"
                  icon="solar:user-circle-linear"
                  width={48}
                />
                <p className="text-center text-small text-default-500">
                  {isDragActive
                    ? 'Drop the image here'
                    : 'Click to upload or drag and drop'}
                </p>
              </div>
            )}
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardBody className="gap-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Input
              isRequired
              label="First Name"
              labelPlacement="outside"
              placeholder="Enter your first name"
              startContent={
                <Icon
                  className="text-default-400"
                  icon="solar:user-linear"
                  width={16}
                />
              }
              variant="bordered"
              onChange={onFormChange}
            />
            <Input
              isRequired
              label="Last Name"
              labelPlacement="outside"
              placeholder="Enter your last name"
              startContent={
                <Icon
                  className="text-default-400"
                  icon="solar:user-linear"
                  width={16}
                />
              }
              variant="bordered"
              onChange={onFormChange}
            />
            <Input
              isRequired
              label="Email"
              labelPlacement="outside"
              placeholder="Enter your email"
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
              label="Phone"
              labelPlacement="outside"
              placeholder="Enter your phone number"
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
          </div>
          <Textarea
            label="Bio"
            labelPlacement="outside"
            placeholder="Tell us about yourself"
            variant="bordered"
            onChange={onFormChange}
          />
        </CardBody>
      </Card>
    </div>
  );
}