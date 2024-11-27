'use client';

import React from 'react';
import {
  Avatar,
  Button,
  ScrollShadow,
  Spacer,
  Input,
  useDisclosure,
  Dropdown,
  DropdownItem,
  DropdownSection,
  DropdownTrigger,
  DropdownMenu,
  Tooltip,
  User,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Badge,
  Select,
  SelectItem,
  SelectSection,
} from '@nextui-org/react';
import { Icon } from '@iconify/react';
import NotificationsCard from '@/components/notifications/notifications-card';
import { useMediaQuery } from 'usehooks-ts';
import { cn } from '@/utils/cn';
import MagnitaLogo from '@/components/icon/magnita-logo';
import sectionItemsWithTeams from './sidebar-items';
import SidebarDrawer from './sidebar-drawer';
import { usePathname, useRouter } from 'next/navigation';
import { logout } from '@/app/logout/actions';

import Sidebar from './sidebar';

const workspaces = [
  {
    value: '0',
    label: 'Acme Inc.',
    items: [
      { value: '1', label: 'Core workspace' },
      { value: '2', label: 'Design workspace' },
      { value: '3', label: 'Dev. workspace' },
      { value: '4', label: 'Marketing workspace' },
    ],
  },
];

export default function Component({
  children,
  header,
  title = 'Overview',
}: {
  children?: React.ReactNode;
  header?: React.ReactNode;
  title?: string;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const pathname = usePathname();
  const router = useRouter();
  const currentPath = pathname.split('/')?.[1];
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');

  const onToggle = React.useCallback(() => {
    setIsCollapsed((prev) => !prev);
  }, []);

  const handleNavigation = (key: string) => {
    router.push(`/${key}`);
  };

  const content = (
    <div
      className={cn(
        'will-change fixed flex h-full w-72 flex-1 flex-col bg-gradient-to-b from-default-100 via-danger-100 to-secondary-100 p-6',
        { 'w-[83px] items-center px-[6px] py-6': isCollapsed }
      )}
    >
      <div
        className={cn('flex items-center justify-between', {
          'flex-col items-center': isCollapsed,
          'justify-between': !isCollapsed,
        })}
      >
        <div className="flex items-center gap-2 px-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border-foreground">
            <MagnitaLogo className="text-foreground" />
          </div>
          <span
            className={cn('w-full text-small font-bold uppercase opacity-100', {
              'w-0 opacity-0': isCollapsed,
            })}
          >
            MAGNITA
          </span>
        </div>
        {isCollapsed ? (
          <div className="flex flex-col items-center justify-end">
            <Dropdown showArrow placement="bottom-start">
              <DropdownTrigger>
                <Button
                  disableRipple
                  isIconOnly
                  className="-mr-1"
                  radius="full"
                  variant="light"
                >
                  <Avatar
                    className="h-6 w-6 cursor-pointer"
                    name="Navapoom Punsathit"
                    src=""
                  />
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Custom item styles"
                disabledKeys={['profile']}
              >
                <DropdownSection showDivider aria-label="Profile & Actions">
                  <DropdownItem
                    key="profile"
                    isReadOnly
                    className="h-14 gap-2 opacity-100"
                    textValue="Signed in as"
                  >
                    <User
                      avatarProps={{
                        size: 'sm',
                        imgProps: {
                          className: 'transition-none',
                        },
                        src: '',
                      }}
                      classNames={{
                        name: 'text-default-600',
                        description: 'text-default-500',
                      }}
                      description="navapoom.p@kanda.digital"
                      name="Navapoom Punsathit"
                    />
                  </DropdownItem>
                  <DropdownItem key="dashboard">Dashboard</DropdownItem>
                  <DropdownItem key="settings">Settings</DropdownItem>
                  <DropdownItem key="report_problem">
                    Report a problem
                  </DropdownItem>
                </DropdownSection>

                <DropdownSection showDivider aria-label="Preferences">
                  <DropdownItem key="quick_search" shortcut="⌘K">
                    Quick search
                  </DropdownItem>
                  <DropdownItem
                    key="theme"
                    isReadOnly
                    className="cursor-default"
                    endContent={
                      <select
                        className="z-10 w-16 rounded-md border-small border-default-300 bg-transparent py-0.5 text-tiny text-default-500 outline-none group-data-[hover=true]:border-default-500 dark:border-default-200"
                        id="theme"
                        name="theme"
                      >
                        <option>System</option>
                        <option>Dark</option>
                        <option>Light</option>
                      </select>
                    }
                  >
                    Theme
                  </DropdownItem>
                </DropdownSection>

                <DropdownSection aria-label="Help & Feedback">
                  <DropdownItem key="help_and_feedback">
                    Help & Feedback
                  </DropdownItem>
                  <DropdownItem key="logout">Log Out</DropdownItem>
                </DropdownSection>
              </DropdownMenu>
            </Dropdown>

            <Popover offset={12} placement="bottom-start">
              <PopoverTrigger>
                <Button
                  disableRipple
                  isIconOnly
                  className="overflow-visible"
                  radius="full"
                  variant="light"
                >
                  <Badge
                    color="danger"
                    content="5"
                    showOutline={false}
                    size="md"
                  >
                    <Icon
                      className="text-default-500"
                      icon="solar:bell-linear"
                      width={24}
                    />
                  </Badge>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="max-w-[90vw] p-0 sm:max-w-[380px]">
                <NotificationsCard className="w-full shadow-none" />
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <div className="flex items-center justify-end">
            <Dropdown showArrow placement="bottom-start">
              <DropdownTrigger>
                <Button
                  disableRipple
                  isIconOnly
                  className="-mr-1"
                  radius="full"
                  variant="light"
                >
                  <Avatar
                    className="h-6 w-6 cursor-pointer"
                    name="Navapoom Punsathit"
                    src=""
                  />
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Custom item styles"
                disabledKeys={['profile']}
              >
                <DropdownSection showDivider aria-label="Profile & Actions">
                  <DropdownItem
                    key="profile"
                    isReadOnly
                    className="h-14 gap-2 opacity-100"
                    textValue="Signed in as"
                  >
                    <User
                      avatarProps={{
                        size: 'sm',
                        imgProps: {
                          className: 'transition-none',
                        },
                        src: '',
                      }}
                      classNames={{
                        name: 'text-default-600',
                        description: 'text-default-500',
                      }}
                      description="navapoom.p@kanda.digital"
                      name="Navapoom Punsathit"
                    />
                  </DropdownItem>
                  <DropdownItem key="dashboard">Dashboard</DropdownItem>
                  <DropdownItem key="settings">Settings</DropdownItem>
                  <DropdownItem key="report_problem">
                    Report a problem
                  </DropdownItem>
                </DropdownSection>

                <DropdownSection showDivider aria-label="Preferences">
                  <DropdownItem key="quick_search" shortcut="⌘K">
                    Quick search
                  </DropdownItem>
                  <DropdownItem
                    key="theme"
                    isReadOnly
                    className="cursor-default"
                    endContent={
                      <select
                        className="z-10 w-16 rounded-md border-small border-default-300 bg-transparent py-0.5 text-tiny text-default-500 outline-none group-data-[hover=true]:border-default-500 dark:border-default-200"
                        id="theme"
                        name="theme"
                      >
                        <option>System</option>
                        <option>Dark</option>
                        <option>Light</option>
                      </select>
                    }
                  >
                    Theme
                  </DropdownItem>
                </DropdownSection>

                <DropdownSection aria-label="Help & Feedback">
                  <DropdownItem key="help_and_feedback">
                    Help & Feedback
                  </DropdownItem>
                  <DropdownItem key="logout" onPress={() => logout()}>
                    Log Out
                  </DropdownItem>
                </DropdownSection>
              </DropdownMenu>
            </Dropdown>

            <Popover offset={12} placement="bottom-start">
              <PopoverTrigger>
                <Button
                  disableRipple
                  isIconOnly
                  className="overflow-visible"
                  radius="full"
                  variant="light"
                >
                  <Badge
                    color="danger"
                    content="5"
                    showOutline={false}
                    size="md"
                  >
                    <Icon
                      className="text-default-500"
                      icon="solar:bell-linear"
                      width={22}
                    />
                  </Badge>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="max-w-[90vw] p-0 sm:max-w-[380px]">
                <NotificationsCard className="w-full shadow-none" />
              </PopoverContent>
            </Popover>
            <Icon
              className="cursor-pointer dark:text-primary-foreground/60 [&>g]:stroke-[1px]"
              icon="solar:round-double-alt-arrow-left-linear"
              width={24}
              onClick={isMobile ? onOpenChange : onToggle}
            />
          </div>
        )}
      </div>

      <Spacer y={4} />

      {/* Select and Search */}
      <div className="flex flex-col gap-y-2">
        {isCollapsed ? (
          <Popover placement="bottom-start">
            <PopoverTrigger>
              <Button disableRipple isIconOnly radius="full" variant="light">
                <Icon
                  className="text-default-500"
                  icon="solar:users-group-rounded-linear"
                  width={24}
                />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <Select
                disableSelectorIconRotation
                aria-label="Select workspace"
                className="px-1"
                classNames={{
                  trigger:
                    'min-h-14 bg-transparent border-small border-default-200 dark:border-default-100 data-[hover=true]:border-default-500 dark:data-[hover=true]:border-default-200 data-[hover=true]:bg-transparent',
                }}
                defaultSelectedKeys={['1']}
                items={workspaces}
                listboxProps={{
                  bottomContent: (
                    <Button
                      className="bg-default-100 text-center text-foreground"
                      size="sm"
                      onPress={() => console.log('on create workspace')}
                    >
                      New Workspace
                    </Button>
                  ),
                }}
                placeholder="Select workspace"
                renderValue={(items) => {
                  return items.map((item) => (
                    <div
                      key={item.key}
                      className="ml-1 flex flex-col gap-y-0.5"
                    >
                      <span className="text-tiny leading-4">Acme Inc.</span>
                      <span className="text-tiny text-default-400">
                        {item.data?.label}
                      </span>
                    </div>
                  ));
                }}
                selectorIcon={
                  <Icon
                    color="hsl(var(--nextui-default-500))"
                    icon="lucide:chevrons-up-down"
                  />
                }
                startContent={
                  <div className="relative h-10 w-10 flex-none rounded-full border-small border-default-300">
                    <Icon
                      className="ml-2 mt-2 text-default-500"
                      icon="solar:users-group-rounded-linear"
                      width={24}
                    />
                  </div>
                }
              >
                {(section) => (
                  <SelectSection
                    key={section.value}
                    hideSelectedIcon
                    showDivider
                    aria-label={section.label}
                    items={section.items}
                    title={section.label}
                  >
                    {(item) => (
                      <SelectItem
                        key={item.value}
                        aria-label={item.label}
                        textValue={item.label}
                      >
                        <div className="flex flex-row items-center justify-between gap-1">
                          <span>{item.label}</span>
                          <div className="flex h-6 w-6 items-center justify-center rounded-full border-small border-default-300">
                            <Icon
                              className="text-default-500"
                              icon="solar:users-group-rounded-linear"
                              width={16}
                            />
                          </div>
                        </div>
                      </SelectItem>
                    )}
                  </SelectSection>
                )}
              </Select>
            </PopoverContent>
          </Popover>
        ) : (
          <Select
            disableSelectorIconRotation
            aria-label="Select workspace"
            className="px-1"
            classNames={{
              trigger:
                'min-h-14 bg-transparent border-small border-default-200 dark:border-default-100 data-[hover=true]:border-default-500 dark:data-[hover=true]:border-default-200 data-[hover=true]:bg-transparent',
            }}
            defaultSelectedKeys={['1']}
            items={workspaces}
            listboxProps={{
              bottomContent: (
                <Button
                  className="bg-default-100 text-center text-foreground"
                  size="sm"
                  onPress={() => console.log('on create workspace')}
                >
                  New Workspace
                </Button>
              ),
            }}
            placeholder="Select workspace"
            renderValue={(items) => {
              return items.map((item) => (
                <div key={item.key} className="ml-1 flex flex-col gap-y-0.5">
                  <span className="text-tiny leading-4">Acme Inc.</span>
                  <span className="text-tiny text-default-400">
                    {item.data?.label}
                  </span>
                </div>
              ));
            }}
            selectorIcon={
              <Icon
                color="hsl(var(--nextui-default-500))"
                icon="lucide:chevrons-up-down"
              />
            }
            startContent={
              <div className="relative h-10 w-10 flex-none rounded-full border-small border-default-300">
                <Icon
                  className="ml-2 mt-2 text-default-500"
                  icon="solar:users-group-rounded-linear"
                  width={24}
                />
              </div>
            }
          >
            {(section) => (
              <SelectSection
                key={section.value}
                hideSelectedIcon
                showDivider
                aria-label={section.label}
                items={section.items}
                title={section.label}
              >
                {(item) => (
                  <SelectItem
                    key={item.value}
                    aria-label={item.label}
                    textValue={item.label}
                  >
                    <div className="flex flex-row items-center justify-between gap-1">
                      <span>{item.label}</span>
                      <div className="flex h-6 w-6 items-center justify-center rounded-full border-small border-default-300">
                        <Icon
                          className="text-default-500"
                          icon="solar:users-group-rounded-linear"
                          width={16}
                        />
                      </div>
                    </div>
                  </SelectItem>
                )}
              </SelectSection>
            )}
          </Select>
        )}
        {isCollapsed ? (
          <Popover placement="bottom-start">
            <PopoverTrigger>
              <Button disableRipple isIconOnly radius="full" variant="light">
                <Icon
                  className="text-default-500"
                  icon="solar:magnifer-linear"
                  width={18}
                />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <Input
                fullWidth
                aria-label="search"
                classNames={{
                  base: 'px-1',
                  inputWrapper:
                    'bg-default-400/20 data-[hover=true]:bg-default-500/30 group-data-[focus=true]:bg-default-500/20',
                  input:
                    'placeholder:text-default-600 group-data-[has-value=true]:text-foreground',
                }}
                labelPlacement="outside"
                placeholder="Search..."
                startContent={
                  <Icon
                    className="text-default-600 [&>g]:stroke-[2px]"
                    icon="solar:magnifer-linear"
                    width={18}
                  />
                }
              />
            </PopoverContent>
          </Popover>
        ) : (
          <Input
            fullWidth
            aria-label="search"
            classNames={{
              base: 'px-1',
              inputWrapper:
                'bg-default-400/20 data-[hover=true]:bg-default-500/30 group-data-[focus=true]:bg-default-500/20',
              input:
                'placeholder:text-default-600 group-data-[has-value=true]:text-foreground',
            }}
            labelPlacement="outside"
            placeholder="Search..."
            startContent={
              <Icon
                className="text-default-600 [&>g]:stroke-[2px]"
                icon="solar:magnifer-linear"
                width={18}
              />
            }
          />
        )}
      </div>

      <ScrollShadow hideScrollBar className="-mr-6 h-full max-h-full py-6 pr-6">
        <Sidebar
          defaultSelectedKey={currentPath}
          selectedKeys={[currentPath]}
          isCompact={isCollapsed}
          iconClassName="text-default-600 group-data-[selected=true]:text-foreground"
          itemClasses={{
            base: 'data-[selected=true]:bg-default-400/20 data-[hover=true]:bg-default-400/10',
            title:
              'text-default-600 group-data-[selected=true]:text-foreground',
          }}
          items={sectionItemsWithTeams}
          sectionClasses={{
            heading: 'text-default-600 font-medium',
          }}
          variant="flat"
        />
      </ScrollShadow>

      <Spacer y={8} />

      <div
        className={cn('mt-auto flex flex-col', { 'items-center': isCollapsed })}
      >
        <div className="flex items-center gap-3 px-2">
          <Avatar isBordered size="sm" name="Navapoom Punsathit" src="" />
          <div
            className={cn('flex max-w-full flex-col', { hidden: isCollapsed })}
          >
            <p className="text-small text-foreground">Navapoom Punsathit</p>
            <p className="text-tiny text-default-500">
              navapoom.p@kanda.digital
            </p>
          </div>
        </div>

        <Spacer y={8} />

        {isCollapsed && (
          <Button
            isIconOnly
            className="flex h-10 w-10 text-default-600"
            size="sm"
            variant="light"
          >
            <Icon
              className="cursor-pointer dark:text-primary-foreground/60 [&>g]:stroke-[1px]"
              height={24}
              icon="solar:round-double-alt-arrow-right-linear"
              width={24}
              onClick={onToggle}
            />
          </Button>
        )}
        <Tooltip
          content="Help & Information"
          isDisabled={!isCollapsed}
          placement="right"
        >
          <Button
            fullWidth
            className={cn(
              'justify-start truncate text-default-600 data-[hover=true]:text-foreground',
              {
                'justify-center': isCollapsed,
              }
            )}
            isIconOnly={isCollapsed}
            startContent={
              isCollapsed ? null : (
                <Icon
                  className="flex-none text-default-600"
                  icon="solar:shield-warning-linear"
                  width={24}
                />
              )
            }
            variant="light"
            aria-label="Help and Information"
          >
            {isCollapsed ? (
              <Icon
                className="text-default-500"
                icon="solar:shield-warning-linear"
                width={24}
              />
            ) : (
              'Help & Information'
            )}
          </Button>
        </Tooltip>
        <Tooltip content="Log Out" isDisabled={!isCollapsed} placement="right">
          <Button
            className={cn(
              'justify-start text-default-500 data-[hover=true]:text-foreground',
              { 'justify-center': isCollapsed }
            )}
            isIconOnly={isCollapsed}
            startContent={
              isCollapsed ? null : (
                <Icon
                  className="flex-none rotate-180 text-default-500"
                  icon="solar:logout-3-linear"
                  width={24}
                />
              )
            }
            variant="light"
            aria-label="Log Out"
            onPress={() => logout()}
          >
            {isCollapsed ? (
              <Icon
                className="rotate-180 text-default-500"
                icon="solar:logout-3-linear"
                width={24}
              />
            ) : (
              'Log Out'
            )}
          </Button>
        </Tooltip>
      </div>
    </div>
  );

  return (
    <div className="flex w-full" aria-label="Dashboard Layout">
      <SidebarDrawer 
        className={cn("min-w-[288px] rounded-lg", { "min-w-[76px]": isCollapsed })} 
        hideCloseButton={true} 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
      >
        {content}
      </SidebarDrawer>
      <div className="flex w-full flex-col gap-y-4 p-4" aria-label="Main Content Area">
        {children} 
      </div>
    </div>
  );
}