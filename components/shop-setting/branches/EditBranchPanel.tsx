'use client';

import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  Input,
  Select,
  SelectItem,
  Button,
  Tabs,
  Tab,
} from '@nextui-org/react';
import { Icon } from '@iconify/react';
import { useDropzone } from 'react-dropzone';
import { branchData } from './data';
import BusinessHoursEditor from './BusinessHoursEditor';

interface EditBranchPanelProps {
  branchId: string | null;
  onClose: () => void;
}

const branchTypes = [
  { label: 'Main Branch', value: 'main' },
  { label: 'Sub Branch', value: 'sub' },
  { label: 'Warehouse', value: 'warehouse' },
];

export default function EditBranchPanel({
  branchId,
  onClose,
}: EditBranchPanelProps) {
  const branch = React.useMemo(
    () => branchData.find((b) => b.id === branchId),
    [branchId]
  );

  const [image, setImage] = React.useState<File | null>(null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png'],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      setImage(acceptedFiles[0]);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    onClose();
  };

  if (!branch) return null;

  return (
    <Sheet isOpen={!!branchId} onOpenChange={onClose}>
      <SheetContent size="full">
        <form className="flex h-full flex-col gap-4" onSubmit={handleSubmit}>
          <SheetHeader>
            <SheetTitle>Edit Branch</SheetTitle>
          </SheetHeader>

          <Tabs aria-label="Branch settings">
            <Tab
              key="general"
              title={
                <div className="flex items-center gap-2">
                  <Icon icon="solar:settings-linear" width={20} />
                  General
                </div>
              }
            >
              <div className="mt-4 grid gap-4 lg:grid-cols-2">
                <Input
                  isRequired
                  label="Branch Name"
                  placeholder="Enter branch name"
                  value={branch.name}
                  variant="bordered"
                />
                <Input
                  isRequired
                  label="Branch Code"
                  placeholder="Enter branch code"
                  value={branch.code}
                  variant="bordered"
                />
                <Select
                  isRequired
                  items={branchTypes}
                  label="Branch Type"
                  placeholder="Select branch type"
                  selectedKeys={[branch.type]}
                  variant="bordered"
                >
                  {(type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  )}
                </Select>
                <Input
                  isRequired
                  label="Manager Name"
                  placeholder="Enter manager name"
                  value={branch.contact.manager}
                  variant="bordered"
                />
                <Input
                  isRequired
                  label="Contact Email"
                  placeholder="Enter contact email"
                  type="email"
                  value={branch.contact.email}
                  variant="bordered"
                />
                <Input
                  isRequired
                  label="Contact Phone"
                  placeholder="Enter contact phone"
                  type="tel"
                  value={branch.contact.phone}
                  variant="bordered"
                />
              </div>
            </Tab>
            <Tab
              key="address"
              title={
                <div className="flex items-center gap-2">
                  <Icon icon="solar:map-point-linear" width={20} />
                  Address
                </div>
              }
            >
              <div className="mt-4 grid gap-4">
                <Input
                  isRequired
                  label="Street Address"
                  placeholder="Enter street address"
                  value={branch.address.street}
                  variant="bordered"
                />
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input
                    isRequired
                    label="District"
                    placeholder="Enter district"
                    value={branch.address.district}
                    variant="bordered"
                  />
                  <Input
                    isRequired
                    label="City"
                    placeholder="Enter city"
                    value={branch.address.city}
                    variant="bordered"
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input
                    isRequired
                    label="State/Province"
                    placeholder="Enter state/province"
                    value={branch.address.state}
                    variant="bordered"
                  />
                  <Input
                    isRequired
                    label="Postal Code"
                    placeholder="Enter postal code"
                    value={branch.address.postalCode}
                    variant="bordered"
                  />
                </div>
                <Input
                  isRequired
                  label="Country"
                  placeholder="Enter country"
                  value={branch.address.country}
                  variant="bordered"
                />
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input
                    label="Latitude"
                    placeholder="Enter latitude"
                    type="number"
                    value={branch.address.coordinates.lat.toString()}
                    variant="bordered"
                  />
                  <Input
                    label="Longitude"
                    placeholder="Enter longitude"
                    type="number"
                    value={branch.address.coordinates.lng.toString()}
                    variant="bordered"
                  />
                </div>
              </div>
            </Tab>
            <Tab
              key="hours"
              title={
                <div className="flex items-center gap-2">
                  <Icon icon="solar:clock-circle-linear" width={20} />
                  Business Hours
                </div>
              }
            >
              <div className="mt-4">
                <BusinessHoursEditor initialHours={branch.businessHours} />
              </div>
            </Tab>
            <Tab
              key="image"
              title={
                <div className="flex items-center gap-2">
                  <Icon icon="solar:gallery-linear" width={20} />
                  Image
                </div>
              }
            >
              <div className="mt-4">
                <div
                  {...getRootProps()}
                  className={`flex h-[200px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-default-200 bg-default-50 transition-colors ${
                    isDragActive ? 'border-primary bg-primary/10' : ''
                  }`}
                >
                  <input {...getInputProps()} />
                  {image ? (
                    <div className="flex flex-col items-center gap-2">
                      <img
                        alt="Branch preview"
                        className="h-24 w-24 rounded-lg object-cover"
                        src={URL.createObjectURL(image)}
                      />
                      <p className="text-small text-default-500">
                        Click or drag to replace
                      </p>
                    </div>
                  ) : branch.image ? (
                    <div className="flex flex-col items-center gap-2">
                      <img
                        alt={`${branch.name} preview`}
                        className="h-24 w-24 rounded-lg object-cover"
                        src={branch.image}
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
                        {isDragActive
                          ? 'Drop the image here'
                          : 'Click to upload or drag and drop'}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </Tab>
          </Tabs>

          <div className="mt-auto flex justify-end gap-3">
            <Button color="danger" variant="light" onPress={onClose}>
              Cancel
            </Button>
            <Button color="primary" type="submit">
              Save Changes
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}