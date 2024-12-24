import React from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { useDropzone } from "react-dropzone";
import { StoreCardProps } from "./store-card";

interface CreateStoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateStore?: (store: StoreCardProps) => void;
}

const businessTypes = [
    { label: "Beauty & Cosmetic", value: "Beauty & Cosmetic" },
    { label: "Clothes & Fashion goods", value: "Clothes & Fashion goods" },
    { label: "Education", value: "Education" },
    { label: "Food, Drink & Bakery", value: "Food, Drink & Bakery" },
    { label: "Furniture & Decoration", value: "Furniture & Decoration" },
    { label: "General goods", value: "General goods" },
    { label: "Gold & Jewels", value: "Gold & Jewels" },
    { label: "Media & Entertainment", value: "Media & Entertainment" },
    { label: "Merchandise", value: "Merchandise" },
    { label: "Health Care Pharmaceutical & Biotech", value: "Health Care Pharmaceutical & Biotech" },
    { label: "Stationery & Sport", value: "Stationery & Sport" },
    { label: "Others", value: "Others" },
  ];    

export default function CreateStoreModal({ isOpen, onClose, onCreateStore }: CreateStoreModalProps) {
  const [storeLogo, setStoreLogo] = React.useState<File | null>(null);
  const [formData, setFormData] = React.useState({
    name: "",
    type: "",
    address: "",
    social: {
      line: "",
      facebook: "",
      instagram: "",
      website: "",
    },
  });

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png'],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      setStoreLogo(acceptedFiles[0]);
    },
  });

  const handleInputChange = (field: string, value: string) => {
    if (field.startsWith("social.")) {
      const socialField = field.split(".")[1];
      setFormData({
        ...formData,
        social: {
          ...formData.social,
          [socialField]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [field]: value,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newStore: StoreCardProps = {
      name: formData.name,
      type: formData.type,
      address: formData.address,
      imageSrc: storeLogo ? URL.createObjectURL(storeLogo) : "https://i.pravatar.cc/150",
      social: formData.social,
    };

    onCreateStore?.(newStore);
    onClose();
    
    // Reset form
    setFormData({
      name: "",
      type: "",
      address: "",
      social: {
        line: "",
        facebook: "",
        instagram: "",
        website: "",
      },
    });
    setStoreLogo(null);
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      size="3xl"
      scrollBehavior="inside"
    >
      <ModalContent>
        {(onClose) => (
          <form onSubmit={handleSubmit}>
            <ModalHeader className="flex flex-col gap-1">
              Create New Store
            </ModalHeader>
            <ModalBody>
              <div className="grid gap-6">
                {/* Store Logo Upload */}
                <div>
                  <p className="text-small font-medium mb-2">Store Logo</p>
                  <div
                    {...getRootProps()}
                    className={`flex h-[200px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-default-200 bg-default-50 transition-colors ${
                      isDragActive ? "border-primary bg-primary/10" : ""
                    }`}
                  >
                    <input {...getInputProps()} />
                    {storeLogo ? (
                      <div className="flex flex-col items-center gap-2">
                        <img
                          src={URL.createObjectURL(storeLogo)}
                          alt="Store logo preview"
                          className="h-24 w-24 rounded-lg object-cover"
                        />
                        <p className="text-small text-default-500">
                          Click or drag to replace
                        </p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-2">
                        <Icon
                          className="text-default-400"
                          icon="solar:gallery-add-linear"
                          width={24}
                        />
                        <p className="text-center text-small text-default-500">
                          {isDragActive
                            ? "Drop the logo here"
                            : "Click to upload or drag and drop"}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Store Details */}
                <div className="grid gap-4 md:grid-cols-2">
                  <Input
                    isRequired
                    label="Store Name"
                    placeholder="Enter store name"
                    labelPlacement="outside"
                    variant="flat"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                  />
                  
                  <Select
                    isRequired
                    label="Business Type"
                    placeholder="Select business type"
                    labelPlacement="outside"
                    selectedKeys={formData.type ? [formData.type] : []}
                    onChange={(e) => handleInputChange("type", e.target.value)}
                  >
                    {businessTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </Select>
                </div>

                <Textarea
                  isRequired
                  label="Address"
                  placeholder="Enter store address"
                  labelPlacement="outside"
                  variant="flat"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                />

                {/* Social Media Links */}
                <div className="grid gap-4 md:grid-cols-2">
                  <Input
                    label="Line ID"
                    placeholder="Enter Line ID"
                    labelPlacement="outside"
                    variant="flat"
                    startContent={<Icon icon="bi:line" />}
                    value={formData.social.line}
                    onChange={(e) => handleInputChange("social.line", e.target.value)}
                  />
                  <Input
                    label="Facebook"
                    placeholder="Enter Facebook page URL"
                    labelPlacement="outside"
                    variant="flat"
                    startContent={<Icon icon="bi:facebook" />}
                    value={formData.social.facebook}
                    onChange={(e) => handleInputChange("social.facebook", e.target.value)}
                  />
                  <Input
                    label="Instagram"
                    placeholder="Enter Instagram profile"
                    labelPlacement="outside"
                    variant="flat"
                    startContent={<Icon icon="bi:instagram" />}
                    value={formData.social.instagram}
                    onChange={(e) => handleInputChange("social.instagram", e.target.value)}
                  />
                  <Input
                    label="Website"
                    placeholder="Enter website URL"
                    labelPlacement="outside"
                    variant="flat"
                    startContent={<Icon icon="bi:globe" />}
                    value={formData.social.website}
                    onChange={(e) => handleInputChange("social.website", e.target.value)}
                  />
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button color="success" variant="flat" type="submit">
                Create Store
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
}