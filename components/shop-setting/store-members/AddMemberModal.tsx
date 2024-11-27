'use client';

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
  Checkbox,
} from '@nextui-org/react';
import { Icon } from '@iconify/react';
import { useDropzone } from 'react-dropzone';
import { rolePermissions } from './data';

interface AddMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const memberRoles = [
  { label: 'Admin', value: 'admin' },
  { label: 'Staff', value: 'staff' },
  { label: 'Customer', value: 'customer' },
];

export default function AddMemberModal({
  isOpen,
  onClose,
}: AddMemberModalProps) {
  const [selectedRole, setSelectedRole] = React.useState<string>('');
  const [avatar, setAvatar] = React.useState<File | null>(null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png'],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      setAvatar(acceptedFiles[0]);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      scrollBehavior="inside"
      size="2xl"
    >
      <ModalContent>
        {(onClose) => (
          <form onSubmit={handleSubmit}>
            <ModalHeader className="flex flex-col gap-1">
              Add New Member
            </ModalHeader>
            <ModalBody>
              <div className="grid gap-4 lg:grid-cols-2">
                <div
                  {...getRootProps()}
                  className={`lg:col-span-2 flex h-[200px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-default-200 bg-default-50 transition-colors ${
                    isDragActive ? 'border-primary bg-primary/10' : ''
                  }`}
                >
                  <input {...getInputProps()} />
                  {avatar ? (
                    <div className="flex flex-col items-center gap-2">
                      <img
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
                          ? 'Drop the avatar here'
                          : 'Click to upload or drag and drop'}
                      </p>
                    </div>
                  )}
                </div>

                <Input
                  isRequired
                  label="First Name"
                  placeholder="Enter first name"
                  variant="bordered"
                />
                <Input
                  isRequired
                  label="Last Name"
                  placeholder="Enter last name"
                  variant="bordered"
                />
                <Input
                  isRequired
                  label="Email"
                  placeholder="Enter email address"
                  type="email"
                  variant="bordered"
                />
                <Input
                  isRequired
                  label="Phone"
                  placeholder="Enter phone number"
                  type="tel"
                  variant="bordered"
                />
                <Select
                  isRequired
                  className="lg:col-span-2"
                  items={memberRoles}
                  label="Role"
                  placeholder="Select member role"
                  selectedKeys={selectedRole ? [selectedRole] : []}
                  variant="bordered"
                  onSelectionChange={(keys) => setSelectedRole(Array.from(keys)[0] as string)}
                >
                  {(role) => (
                    <SelectItem key={role.value} value={role.value}>
                      {role.label}
                    </SelectItem>
                  )}
                </Select>

                {selectedRole && rolePermissions[selectedRole as keyof typeof rolePermissions].length > 0 && (
                  <div className="lg:col-span-2">
                    <p className="mb-2 text-small font-medium">Permissions</p>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {rolePermissions[selectedRole as keyof typeof rolePermissions].map((permission) => (
                        <Checkbox
                          key={permission}
                          defaultSelected
                          size="sm"
                        >
                          {permission.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                        </Checkbox>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button color="primary" type="submit">
                Add Member
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
}