'use client';

import React from 'react';
import { Card, CardBody, Input } from '@nextui-org/react';
import { Icon } from '@iconify/react';

interface SocialMediaFormProps {
  onFormChange: () => void;
}

export default function SocialMediaForm({ onFormChange }: SocialMediaFormProps) {
  return (
    <Card>
      <CardBody className="gap-4">
        <div className="grid gap-4 md:grid-cols-2">
          <Input
            label="Facebook"
            labelPlacement="outside"
            placeholder="Enter Facebook page URL"
            startContent={
              <Icon
                className="text-facebook"
                icon="logos:facebook"
                width={16}
              />
            }
            variant="bordered"
            onChange={onFormChange}
          />
          <Input
            label="Instagram"
            labelPlacement="outside"
            placeholder="Enter Instagram profile URL"
            startContent={
              <Icon
                className="text-instagram"
                icon="logos:instagram-icon"
                width={16}
              />
            }
            variant="bordered"
            onChange={onFormChange}
          />
          <Input
            label="Line Official Account"
            labelPlacement="outside"
            placeholder="Enter Line Official Account ID"
            startContent={
              <Icon className="text-line" icon="simple-icons:line" width={16} />
            }
            variant="bordered"
            onChange={onFormChange}
          />
          <Input
            label="Twitter/X"
            labelPlacement="outside"
            placeholder="Enter Twitter/X profile URL"
            startContent={
              <Icon
                className="text-twitter"
                icon="logos:twitter"
                width={16}
              />
            }
            variant="bordered"
            onChange={onFormChange}
          />
          <Input
            label="TikTok"
            labelPlacement="outside"
            placeholder="Enter TikTok profile URL"
            startContent={
              <Icon
                className="text-tiktok"
                icon="logos:tiktok-icon"
                width={16}
              />
            }
            variant="bordered"
            onChange={onFormChange}
          />
          <Input
            label="YouTube"
            labelPlacement="outside"
            placeholder="Enter YouTube channel URL"
            startContent={
              <Icon
                className="text-youtube"
                icon="logos:youtube-icon"
                width={16}
              />
            }
            variant="bordered"
            onChange={onFormChange}
          />
        </div>
      </CardBody>
    </Card>
  );
}