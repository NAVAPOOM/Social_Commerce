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
  Checkbox,
} from '@nextui-org/react';
import { Icon } from '@iconify/react';
import { useDropzone } from 'react-dropzone';
import { memberData, rolePermissions } from './data';

interface EditMemberPanelProps {
  memberId: string | null;
  onClose: () => void;
}

const memberRoles = [
  { label: 'Admin', value: 'admin' },
  { label: 'Staff', value: 'staff' },
  { label: 'Customer', value: 'customer' },
];

const memberStatuses = [
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'inactive' },
  { label: 'Suspended', value: 'suspended' },
];

export default function EditMemberPanel({
  memberId,
  onClose,
}: EditMemberPanelProps) {
  const member = React.useMemo(
    () => memberData.find((m) => m.id === memberId),
    [memberId]
  );

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

  if (!member) return null;

  return (
    <Sheet isOpen={!!memberId} onOpenChange={onClose}>
      <SheetContent size="xl">
        <form className="flex h-full flex-col gap-4" onSubmit={handleSubmit}>
          <SheetHeader>
            <SheetTitle>Edit Member</SheetTitle>
          </SheetHeader>

          <Tabs aria-label="Member settings">
            <Tab
              key="profile"
              title={
                <div className="flex items-center gap-2">
                  <Icon icon="solar:user-circle-linear" width={20} />
                  Profile
                </div>
              }
            >
              <div className="mt-4 grid gap-4">
                <div
                  {...getRootProps()}
                  className={`flex h-[200px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-default-200 bg-default-50 transition-colors ${
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
                  ) : member.avatar ? (
                    <div className="flex flex-col items-center gap-2">
                      <img
                        alt={`${member.firstName} ${member.lastName}`}
                        className="h-24 w-24 rounded-full object-cover"
                        src={member.avatar}
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

                <div className="grid gap-4 sm:grid-cols-2">
                  <Input
                    isRequired
                    label="First Name"
                    placeholder="Enter first name"
                    value={member.firstName}
                    variant="bordered"
                  />
                  <Input
                    isRequired
                    label="Last Name"
                    placeholder="Enter last name"
                    value={member.lastName}
                    variant="bordered"
                  />
                </div>

                <Input
                  isRequired
                  label="Email"
                  placeholder="Enter email address"
                  type="email"
                  value={member.email}
                  variant="bordered"
                />
                <Input
                  isRequired
                  label="Phone"
                  placeholder="Enter phone number"
                  type="tel"
                  value={member.phone}
                  variant="bordered"
                />
              </div>
            </Tab>
            <Tab
              key="role"
              title={
                <div className="flex items-center gap-2">
                  <Icon icon="solar:shield-user-linear" width={20} />
                  Role & Permissions
                </div>
              }
            >
              <div className="mt-4 space-y-4">
                <Select
                  isRequired
                  items={memberRoles}
                  label="Role"
                  placeholder="Select member role"
                  selectedKeys={[member.role]}
                  variant="bordered"
                >
                  {(role) => (
                    <SelectItem key={role.value} value={role.value}>
                      {role.label}
                    </SelectItem>
                  )}
                </Select>

                <Select
                  isRequired
                  items={memberStatuses}
                  label="Status"
                  placeholder="Select member status"
                  selectedKeys={[member.status]}
                  variant="bordered"
                >
                  {(status) => (
                    <SelectItem key={status.value} value={status.value}>
                      {status.label}
                    </SelectItem>
                  )}
                </Select>

                {rolePermissions[member.role].length > 0 && (
                  <div>
                    <p className="mb-2 text-small font-medium">Permissions</p>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {rolePermissions[member.role].map((permission) => (
                        <Checkbox
                          key={permission}
                          defaultSelected={member.permissions.includes(permission)}
                          size="sm"
                        >
                          {permission.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                        </Checkbox>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Tab>
            <Tab
              key="activity"
              title={
                <div className="flex items-center gap-2">
                  <Icon icon="solar:chart-2-linear" width={20} />
                  Activity
                </div>
              }
            >
              <div className="mt-4 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-lg border border-default-200 p-4">
                    <div className="flex items-center gap-2">
                      <Icon
                        className="text-primary"
                        icon="solar:cart-check-linear"
                        width={20}
                      />
                      <span className="text-small font-medium">Total Orders</span>
                    </div>
                    <p className="mt-2 text-xl font-semibold">
                      {member.stats.totalOrders}
                    </p>
                  </div>
                  <div className="rounded-lg border border-default-200 p-4">
                    <div className="flex items-center gap-2">
                      <Icon
                        className="text-success"
                        icon="solar:dollar-linear"
                        width={20}
                      />
                      <span className="text-small font-medium">Total Spent</span>
                    </div>
                    <p className="mt-2 text-xl font-semibold">
                      ${member.stats.totalSpent.toLocaleString()}
                    </p>
                  </div>
                  <div className="rounded-lg border border-default-200 p-4">
                    <div className="flex items-center gap-2">
                      <Icon
                        className="text-warning"
                        icon="solar:clock-circle-linear"
                        width={20}
                      />
                      <span className="text-small font-medium">Last Active</span>
                    </div>
                    <p className="mt-2 text-medium">
                      {new Date(member.stats.lastActive).toLocaleString()}
                    </p>
                  </div>
                  <div className="rounded-lg border border-default-200 p-4">
                    <div className="flex items-center gap-2">
                      <Icon
                        className="text-secondary"
                        icon="solar:login-2-linear"
                        width={20}
                      />
                      <span className="text-small font-medium">Login Count</span>
                    </div>
                    <p className="mt-2 text-xl font-semibold">
                      {member.stats.loginCount}
                    </p>
                  </div>
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