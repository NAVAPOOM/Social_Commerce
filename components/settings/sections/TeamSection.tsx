'use client';

import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Input,
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  User,
  Chip,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Select,
  SelectItem,
} from '@nextui-org/react';
import { Icon } from '@iconify/react';

interface TeamSectionProps {
  onFormChange: () => void;
}

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'owner' | 'admin' | 'member';
  status: 'active' | 'pending' | 'inactive';
  avatar?: string;
  lastActive?: string;
}

const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'owner',
    status: 'active',
    avatar: 'https://i.pravatar.cc/150?u=1',
    lastActive: '2024-03-15T10:00:00',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'admin',
    status: 'active',
    avatar: 'https://i.pravatar.cc/150?u=2',
    lastActive: '2024-03-15T09:30:00',
  },
  {
    id: '3',
    name: 'Bob Wilson',
    email: 'bob@example.com',
    role: 'member',
    status: 'pending',
    avatar: 'https://i.pravatar.cc/150?u=3',
  },
];

const roleColorMap = {
  owner: 'secondary',
  admin: 'primary',
  member: 'default',
} as const;

const statusColorMap = {
  active: 'success',
  pending: 'warning',
  inactive: 'danger',
} as const;

export default function TeamSection({ onFormChange }: TeamSectionProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    onFormChange();
    onClose();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex justify-between">
          <div>
            <h3 className="text-xl font-semibold">Team Members</h3>
            <p className="text-small text-default-500">
              Manage your team members and their roles
            </p>
          </div>
          <Button
            color="primary"
            endContent={<Icon icon="solar:user-plus-linear" width={20} />}
            onPress={onOpen}
          >
            Invite Member
          </Button>
        </CardHeader>
        <CardBody>
          <Table aria-label="Team members table">
            <TableHeader>
              <TableColumn>MEMBER</TableColumn>
              <TableColumn>ROLE</TableColumn>
              <TableColumn>STATUS</TableColumn>
              <TableColumn>LAST ACTIVE</TableColumn>
              <TableColumn>ACTIONS</TableColumn>
            </TableHeader>
            <TableBody>
              {teamMembers.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>
                    <User
                      avatarProps={{
                        radius: "lg",
                        src: member.avatar,
                      }}
                      description={member.email}
                      name={member.name}
                    >
                      {member.email}
                    </User>
                  </TableCell>
                  <TableCell>
                    <Chip
                      className="capitalize"
                      color={roleColorMap[member.role]}
                      size="sm"
                      variant="flat"
                    >
                      {member.role}
                    </Chip>
                  </TableCell>
                  <TableCell>
                    <Chip
                      className="capitalize"
                      color={statusColorMap[member.status]}
                      size="sm"
                      variant="flat"
                    >
                      {member.status}
                    </Chip>
                  </TableCell>
                  <TableCell>
                    {member.lastActive
                      ? new Date(member.lastActive).toLocaleString()
                      : 'Never'}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Dropdown>
                        <DropdownTrigger>
                          <Button
                            isIconOnly
                            className="text-default-400"
                            size="sm"
                            variant="light"
                          >
                            <Icon icon="solar:menu-dots-bold" width={16} />
                          </Button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Member actions">
                          <DropdownItem
                            startContent={
                              <Icon icon="solar:pen-2-linear" width={16} />
                            }
                          >
                            Edit Role
                          </DropdownItem>
                          <DropdownItem
                            startContent={
                              <Icon
                                icon="solar:letter-linear"
                                width={16}
                              />
                            }
                          >
                            Resend Invite
                          </DropdownItem>
                          <DropdownItem
                            className="text-danger"
                            color="danger"
                            startContent={
                              <Icon
                                icon="solar:trash-bin-trash-linear"
                                width={16}
                              />
                            }
                          >
                            Remove
                          </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <form onSubmit={handleInvite}>
              <ModalHeader>Invite Team Member</ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  label="Email Address"
                  placeholder="Enter email address"
                  type="email"
                  variant="bordered"
                />
                <Select
                  label="Role"
                  placeholder="Select role"
                  variant="bordered"
                >
                  <SelectItem key="admin">Admin</SelectItem>
                  <SelectItem key="member">Member</SelectItem>
                </Select>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" type="submit">
                  Send Invite
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}