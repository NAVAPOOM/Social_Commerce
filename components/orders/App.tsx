'use client';

import type { Selection, SortDescriptor } from '@nextui-org/react';
import type { ColumnsKey, Order } from './data';
import type { Key } from '@react-types/shared';

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  DateRangePicker,
  Button,
  ButtonGroup,
  RadioGroup,
  Radio,
  Chip,
  User,
  Pagination,
  Divider,
  Tooltip,
  useButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Select, 
  SelectItem,
  Tab, Tabs
} from '@nextui-org/react';
import { SearchIcon } from '@nextui-org/shared-icons';
import React, { useMemo, useRef, useCallback, useState } from 'react';
import { Icon } from '@iconify/react';
import { cn } from '@nextui-org/react';

import { CopyText } from './copy-text';
import OrderStats from './OrderStats';

import { useMemoizedCallback } from './use-memoized-callback';
import { columns, INITIAL_VISIBLE_COLUMNS, orders, statusColorMap } from './data';

import {
  today,
  startOfWeek,
  startOfMonth,
  endOfWeek,
  endOfMonth,
  getLocalTimeZone,
  CalendarDate,
} from "@internationalized/date";
import {useLocale, useDateFormatter} from "@react-aria/i18n";

type ColumnType = {
  name: string;
  uid: string;
  sortable?: boolean;
  sortDirection?: 'ascending' | 'descending';
  info?: string;
};

export default function OrdersApp() {
  const [filterValue, setFilterValue] = useState('');
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [visibleColumns, setVisibleColumns] = useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [page, setPage] = useState(1);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: 'customerName',
    direction: 'ascending',
  });

  const [statusFilter, setStatusFilter] = React.useState('all');
  const [orderDateFilter, setOrderDateFilter] = React.useState('all');

  const headerColumns = useMemo(() => {
    if (visibleColumns === 'all') return columns as ColumnType[];

    return (columns as ColumnType[])
      .map((item) => {
        if (item.uid === sortDescriptor.column) {
          return {
            ...item,
            sortDirection: sortDescriptor.direction,
          };
        }

        return item;
      })
      .filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns, sortDescriptor]);

  const itemFilter = useCallback(
    (order: Order) => {
      let allStatus = statusFilter === 'all';
      let allOrderDate = orderDateFilter === 'all';

      return (
        (allStatus || statusFilter === order.status.toLowerCase()) &&
        (allOrderDate ||
          new Date(
            new Date().getTime() -
              +(orderDateFilter.match(/(\d+)(?=Days)/)?.[0] ?? 0) *
                24 *
                60 *
                60 *
                1000
          ) <= new Date(order.orderDate))
      );
    },
    [orderDateFilter, statusFilter]
  );

  const filteredItems = useMemo(() => {
    let filteredOrders = [...orders];

    if (filterValue) {
      filteredOrders = filteredOrders.filter((order) =>
        order.customerName.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    filteredOrders = filteredOrders.filter(itemFilter);

    return filteredOrders;
  }, [filterValue, itemFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage) || 1;

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = useMemo(() => {
    return [...items].sort((a: Order, b: Order) => {
      const col = sortDescriptor.column as keyof Order;

      let first = a[col];
      let second = b[col];

      if (col === 'orderDate') {
        first = new Date(a[col]);
        second = new Date(b[col]);
      } else if (col === 'totalAmount') {
        first = Number(a[col]);
        second = Number(b[col]);
      }

      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === 'descending' ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const filterSelectedKeys = useMemo(() => {
    if (selectedKeys === 'all') return selectedKeys;
    let resultKeys = new Set<Key>();

    if (filterValue) {
      filteredItems.forEach((item) => {
        const stringId = String(item.id);

        if ((selectedKeys as Set<string>).has(stringId)) {
          resultKeys.add(stringId);
        }
      });
    } else {
      resultKeys = selectedKeys;
    }

    return resultKeys;
  }, [selectedKeys, filteredItems, filterValue]);

  const eyesRef = useRef<HTMLButtonElement | null>(null);
  const editRef = useRef<HTMLButtonElement | null>(null);
  const deleteRef = useRef<HTMLButtonElement | null>(null);
  const { getButtonProps: getEyesProps } = useButton({ ref: eyesRef });
  const { getButtonProps: getEditProps } = useButton({ ref: editRef });
  const { getButtonProps: getDeleteProps } = useButton({ ref: deleteRef });
  const getCustomerNameProps = useMemoizedCallback(() => ({
    onClick: handleCustomerNameClick,
  }));

  const renderCell = useMemoizedCallback(
    (order: Order, columnKey: React.Key) => {
      const orderKey = columnKey as ColumnsKey;

      const cellValue = order[orderKey as keyof Order] as string;

      switch (orderKey) {
        case 'id':
          return <CopyText>{cellValue}</CopyText>;
        case 'customerName':
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">{cellValue}</p>
              <p className="text-bold text-tiny capitalize text-default-400">{order.id}</p>
            </div>
          );
        case 'orderDate':
          return (
            <div className="flex items-center gap-1">
              <Icon
                className="h-[16px] w-[16px] text-default-300"
                icon="solar:calendar-minimalistic-linear"
              />
              <p className="text-nowrap text-small capitalize text-default-foreground">
                {new Intl.DateTimeFormat('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                }).format(new Date(cellValue))}
              </p>
            </div>
          );
        case 'totalAmount':
          return (
            <div className="text-nowrap text-small capitalize text-default-foreground">
              ${cellValue}
            </div>
          );
        case 'status':
          return (
            <Chip
              className="capitalize"
              color={statusColorMap[order.status]}
              size="sm"
              variant="flat"
            >
              {cellValue}
            </Chip>
          );
        case 'items':
          return (
            <div className="float-start flex gap-1">
              {order.items.map((item, index) => {
                if (index < 3) {
                  return (
                    <Chip
                      key={item.id}
                      className="rounded-xl bg-default-100 px-[6px] capitalize text-default-800"
                      size="sm"
                      variant="flat"
                    >
                      {item.name}
                    </Chip>
                  );
                }
                if (index === 3) {
                  return (
                    <Chip
                      key={item.id}
                      className="text-default-500"
                      size="sm"
                      variant="flat"
                    >
                      {`+${order.items.length - 3}`}
                    </Chip>
                  );
                }

                return null;
              })}
            </div>
          );
        case 'actions':
          return (
            <div className="flex items-center justify-end gap-2">
              <Icon
                icon="solar:eye-linear"
                className="cursor-pointer text-default-400"
                height={18}
                width={18}
              />
              <Icon
                icon="solar:pen-2-linear"
                className="cursor-pointer text-default-400"
                height={18}
                width={18}
              />
              <Icon
                icon="solar:trash-bin-minimalistic-linear"
                className="cursor-pointer text-default-400"
                height={18}
                width={18}
              />
            </div>
          );
        default:
          return cellValue;
      }
    }
  );

  const onNextPage = useMemoizedCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  });

  const onPreviousPage = useMemoizedCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  });

  const onSearchChange = useMemoizedCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue('');
    }
  });

  const onRowsPerPageChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value))
    setPage(1)
  }, [])

  const onSelectionChange = useMemoizedCallback((keys: Selection) => {
    if (keys === 'all') {
      if (filterValue) {
        const resultKeys = new Set(
          filteredItems.map((item) => String(item.id))
        );

        setSelectedKeys(resultKeys);
      } else {
        setSelectedKeys(keys);
      }
    } else if (keys.size === 0) {
      setSelectedKeys(new Set());
    } else {
      const resultKeys = new Set<Key>();

      keys.forEach((v) => {
        resultKeys.add(v);
      });
      const selectedValue =
        selectedKeys === 'all'
          ? new Set(filteredItems.map((item) => String(item.id)))
          : selectedKeys;

      selectedValue.forEach((v) => {
        if (items.some((item) => String(item.id) === v)) {
          return;
        }
        resultKeys.add(v);
      });
      setSelectedKeys(new Set(resultKeys));
    }
  });

  const topContent = useMemo(() => {
    return (
      <div className="flex items-center gap-4 overflow-auto px-[6px] py-[4px]">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-4">
            <Input
              className="min-w-[200px]"
              startContent={
                <SearchIcon className="text-default-400" width={16} />
              }
              placeholder="Search by customer name"
              size="sm"
              value={filterValue}
              onValueChange={onSearchChange}
            />
            <div>
              <Popover placement="bottom">
                <PopoverTrigger>
                  <Button
                    className="bg-default-100 text-default-800"
                    size="sm"
                    startContent={
                      <Icon
                        className="text-default-400"
                        icon="solar:tuning-2-linear"
                        width={16}
                      />
                    }
                  >
                    Filter
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="flex w-full flex-col gap-6 px-2 py-4">
                    <RadioGroup
                      label="Status"
                      value={statusFilter}
                      onValueChange={setStatusFilter}
                    >
                      <Radio value="all">All</Radio>
                      <Radio value="pending">Pending</Radio>
                      <Radio value="processing">Processing</Radio>
                      <Radio value="shipped">Shipped</Radio>
                      <Radio value="delivered">Delivered</Radio>
                      <Radio value="cancelled">Cancelled</Radio>
                    </RadioGroup>

                    <RadioGroup
                      label="Order Date"
                      value={orderDateFilter}
                      onValueChange={setOrderDateFilter}
                    >
                      <Radio value="all">All</Radio>
                      <Radio value="last7Days">Last 7 days</Radio>
                      <Radio value="last30Days">Last 30 days</Radio>
                      <Radio value="last60Days">Last 60 days</Radio>
                    </RadioGroup>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <Dropdown>
                <DropdownTrigger>
                  <Button
                    className="bg-default-100 text-default-800"
                    size="sm"
                    startContent={
                      <Icon
                        className="text-default-400"
                        icon="solar:sort-linear"
                        width={16}
                      />
                    }
                  >
                    Sort
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Sort"
                  items={headerColumns.filter(
                    (c) => !['actions', 'items'].includes(c.uid)
                  )}
                >
                  {(item) => (
                    <DropdownItem
                      key={item.uid}
                      onPress={() => {
                        setSortDescriptor({
                          column: item.uid,
                          direction:
                            sortDescriptor.direction === 'ascending'
                              ? 'descending'
                              : 'ascending',
                        });
                      }}
                    >
                      {item.name}
                    </DropdownItem>
                  )}
                </DropdownMenu>
              </Dropdown>
            </div>
            <div>
              <Dropdown closeOnSelect={false}>
                <DropdownTrigger>
                  <Button
                    className="bg-default-100 text-default-800"
                    size="sm"
                    startContent={
                      <Icon
                        className="text-default-400"
                        icon="solar:sort-horizontal-linear"
                        width={16}
                      />
                    }
                  >
                    Columns
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  disallowEmptySelection
                  aria-label="Columns"
                  items={columns.filter((c) => !['actions'].includes(c.uid))}
                  selectedKeys={visibleColumns}
                  selectionMode="multiple"
                  onSelectionChange={setVisibleColumns}
                >
                  {(item) => (
                    <DropdownItem key={item.uid}>{item.name}</DropdownItem>
                  )}
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>

          <Divider className="h-5" orientation="vertical" />

          <div className="whitespace-nowrap text-sm text-default-800">
            {filterSelectedKeys === 'all'
              ? 'All items selected'
              : `${filterSelectedKeys.size} Selected`}
          </div>

          {(filterSelectedKeys === 'all' || filterSelectedKeys.size > 0) && (
            <Dropdown>
              <DropdownTrigger>
                <Button
                  className="bg-default-100 text-default-800"
                  endContent={
                    <Icon
                      className="text-default-400"
                      icon="solar:alt-arrow-down-linear"
                    />
                  }
                  size="sm"
                  variant="flat"
                >
                  Selected Actions
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Selected Actions">
                <DropdownItem key="print-invoice">Print invoice</DropdownItem>
                <DropdownItem key="update-status">Update status</DropdownItem>
                <DropdownItem key="bulk-edit">Bulk edit</DropdownItem>
                <DropdownItem key="cancel-orders">Cancel orders</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          )}
        </div>
        <div className="flex items-center gap-2 ml-auto">
          <label className="text-small text-default-400 whitespace-nowrap">
            Rows per page:
          </label>
          <Select 
            aria-label="Rows per page"
            className="w-[70px] min-w-max"
            size="sm"
            defaultSelectedKeys={["10"]}
            onChange={onRowsPerPageChange}
          >
            <SelectItem key="5" value="5">
              5
            </SelectItem>
            <SelectItem key="10" value="10">
              10
            </SelectItem>
            <SelectItem key="15" value="15">
              15
            </SelectItem>
          </Select>
        </div>
      </div>
    );
  }, [
    filterValue,
    visibleColumns,
    filterSelectedKeys,
    headerColumns,
    sortDescriptor,
    statusFilter,
    orderDateFilter,
    setStatusFilter,
    setOrderDateFilter,
    onSearchChange,
    setVisibleColumns,
  ]);

  let defaultDate = {
    start: today(getLocalTimeZone()),
    end: today(getLocalTimeZone()).add({days: 7}),
  };
  let [value, setValue] = React.useState(defaultDate);

  let {locale} = useLocale();
  let formatter = useDateFormatter({dateStyle: "full"});
  let now = today(getLocalTimeZone());
  let nextWeek = {
    start: startOfWeek(now.add({weeks: 1}), locale),
    end: endOfWeek(now.add({weeks: 1}), locale),
  };
  let nextMonth = {
    start: startOfMonth(now.add({months: 1})),
    end: endOfMonth(now.add({months: 1})),
  };

  const CustomRadio = (props: any) => {
    const {children, ...otherProps} = props;

    return (
      <Radio
        {...otherProps}
        classNames={{
          base: cn(
            "flex-none m-0 h-8 bg-content1 hover:bg-content2 items-center justify-between",
            "cursor-pointer rounded-full border-2 border-default-200/60",
            "data-[selected=true]:border-primary",
          ),
          label: "text-tiny text-default-500",
          labelWrapper: "px-1 m-0",
          wrapper: "hidden",
        }}
      >
        {children}
      </Radio>
    );
  };

  const topBar = useMemo(() => {
    return (
      <div className="mb-[18px] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-[700] leading-[32px]">Orders</h1>
          <Chip
            className="hidden items-center sm:flex"
            size="sm"
            variant="shadow"
            color="danger"
          >
            {orders.length}
          </Chip>
        </div>
        <div className="flex items-center gap-4">
          <DateRangePicker
            CalendarBottomContent={
              <RadioGroup
                aria-label="Date precision"
                classNames={{
                  base: "w-full pb-2",
                  wrapper:
                    "-my-2.5 py-2.5 px-3 gap-1 flex-nowrap max-w-[w-[calc(var(--visible-months)_*_var(--calendar-width))]] overflow-scroll",
                }}
                defaultValue="exact_dates"
                orientation="horizontal"
              >
                <CustomRadio value="exact_dates">Exact dates</CustomRadio>
                <CustomRadio value="1_day">1 day</CustomRadio>
                <CustomRadio value="2_days">2 days</CustomRadio>
                <CustomRadio value="3_days">3 days</CustomRadio>
                <CustomRadio value="7_days">7 days</CustomRadio>
                <CustomRadio value="14_days">14 days</CustomRadio>
              </RadioGroup>
            }
            CalendarTopContent={
              <ButtonGroup
                fullWidth
                className="px-3 pb-2 pt-3 bg-content1 [&>button]:text-default-500 [&>button]:border-default-200/60"
                radius="full"
                size="sm"
                variant="bordered"
              >
                <Button
                  onPress={() =>
                    setValue({
                      start: now,
                      end: now.add({days: 7}),
                    })
                  }
                >
                  This week
                </Button>
                <Button onPress={() => setValue(nextWeek)}>Next week</Button>
                <Button onPress={() => setValue(nextMonth)}>Next month</Button>
              </ButtonGroup>
            }
            calendarProps={{
              focusedValue: value.start,
              onFocusChange: (val) => setValue({...value, start: val}),
              nextButtonProps: {
                variant: "bordered",
              },
              prevButtonProps: {
                variant: "bordered",
              },
            }}
            value={value}
            onChange={(newValue) => {
              if (newValue) {
                setValue(newValue);
              }
            }}
            color="danger"
            size="sm"
            hideTimeZone
            visibleMonths={3}
            labelPlacement="outside-left"
          />
          <Button
            color="danger"
            size='sm'
            variant='flat'
            className="w-full"
            startContent={<Icon icon="hugeicons:package-add" width={20} />}
          >
            Add new order
          </Button>
        </div>
      </div>
    );
  }, []);

  const bottomContent = useMemo(() => {
    const start = (page - 1) * rowsPerPage + 1;
    const end = Math.min(start + rowsPerPage - 1, filteredItems.length);

    return (
      <div className="flex flex-col items-center justify-between gap-2 px-2 py-2 sm:flex-row">
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="flex items-center justify-end gap-6">
          <span className="text-small text-default-400">
            {`${start}-${end} of ${filteredItems.length}`}
          </span>
          <div className="flex items-center gap-3">
            <Button
              isDisabled={page === 1}
              size="sm"
              variant="flat"
              onPress={onPreviousPage}
            >
              Previous
            </Button>
            <Button
              isDisabled={page === pages}
              size="sm"
              variant="flat"
              onPress={onNextPage}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    );
  }, [
    filterSelectedKeys,
    page,
    pages,
    filteredItems.length,
    onPreviousPage,
    onNextPage,
  ]);

  const handleCustomerNameClick = useMemoizedCallback(() => {
    setSortDescriptor({
      column: 'customerName',
      direction:
        sortDescriptor.direction === 'ascending' ? 'descending' : 'ascending',
    });
  });

  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex flex-col gap-4 p-6 overflow-auto">
        {topBar}
        <OrderStats />
        <div className="relative">
          <Table
            isHeaderSticky
            color='danger'
            aria-label="Example table with custom cells, pagination and sorting"
            bottomContent={bottomContent}
            bottomContentPlacement="outside"
            classNames={{
              //wrapper: 'max-h-[calc(100vh-250px)]',
              //td: 'before:bg-transparent',
            }}
            selectedKeys={filterSelectedKeys}
            selectionMode="multiple"
            sortDescriptor={sortDescriptor}
            topContent={topContent}
            topContentPlacement="outside"
            onSelectionChange={onSelectionChange}
            onSortChange={setSortDescriptor}
          >
            <TableHeader columns={headerColumns}>
              {(column) => (
                <TableColumn
                  key={column.uid}
                  align={column.uid === 'actions' ? 'end' : 'start'}
                  className={cn([
                    column.uid === 'actions'
                      ? 'flex items-center justify-end px-[20px]'
                      : '',
                  ])}
                >
                  {column.uid === 'customerName' ? (
                    <div
                      {...getCustomerNameProps()}
                      className="flex w-full cursor-pointer items-center justify-between"
                    >
                      {column.name}
                      {column.sortDirection === 'ascending' ? (
                        <Icon
                          icon="solar:alt-arrow-up-linear"
                          className="text-default-400"
                          height={16}
                          width={16}
                        />
                      ) : (
                        <Icon
                          icon="solar:alt-arrow-down-linear"
                          className="text-default-400"
                          height={16}
                          width={16}
                        />
                      )}
                    </div>
                  ) : column.info ? (
                    <div className="flex min-w-[108px] items-center justify-between">
                      {column.name}
                      <Tooltip content={column.info}>
                        <Icon
                          className="text-default-300"
                          height={16}
                          icon="solar:info-circle-linear"
                          width={16}
                        />
                      </Tooltip>
                    </div>
                  ) : (
                    column.name
                  )}
                </TableColumn>
              )}
            </TableHeader>
            <TableBody emptyContent={'No orders found'} items={sortedItems}>
              {(item) => (
                <TableRow key={item.id}>
                  {(columnKey) => (
                    <TableCell>{renderCell(item, columnKey)}</TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

