// components/sidebar/sidebar-items.tsx
import { Chip } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { type SidebarItem, SidebarItemType } from "./sidebar";

/**
 * Please check the https://nextui.org/docs/guide/routing to have a seamless router integration
 */
const sectionItemsWithTeams: SidebarItem[] = [
  {
    key: "home",
    href: `/home`,
    icon: "solar:home-2-linear",
    title: "Home",
  },
  {
    key: "dashboard",
    title: "Dashboard",
    icon: "solar:chart-2-linear",
    type: SidebarItemType.Nest,
    items: [
      {
        key: "overview",
        href: `/dashboard/overview`,
        title: "Overview",
        icon: "solar:presentation-graph-linear",
      },
      {
        key: "sales_report",
        href: `/dashboard/sales_report`,
        title: "Sales Report",
        icon: "solar:pie-chart-2-linear",
      },
      {
        key: "customer_report",
        href: `/dashboard/customer_report`,
        title: "Customer Report",
        icon: "solar:users-group-rounded-linear",
      },
    ],
  },
  {
    key: "orders",
    href: `/orders`,
    icon: "solar:clipboard-list-linear",
    title: "Orders",
    endContent: (
      <Chip
        size="sm"
        variant="shadow"
        color="danger"
      >
        0
      </Chip>
    ),
  },
  {
    key: "chats",
    href: `/chats`,
    icon: "solar:dialog-2-linear",
    title: "Chats",
    endContent: (
      <Chip
        size="sm"
        variant="shadow"
        color="danger"
      >
        0
      </Chip>
    ),
  },
  {
    key: "catalog_product",
    title: "Catalog & Product",
    icon: "solar:box-minimalistic-linear",
    type: SidebarItemType.Nest,
    items: [
      {
        key: "products",
        href: `/catalog_product/products`,
        title: "Products",
        icon: "solar:box-linear",
      },
      {
        key: "product_catalog",
        href: `/catalog_product/product_catalog`,
        title: "Product Catalog",
        icon: "solar:bag-check-linear",
      },
      {
        key: "inventory",
        href: `/catalog_product/inventory`,
        title: "Inventory",
        icon: "prime:warehouse",
      },
      {
        key: "highlight_product",
        href: `/catalog_product/highlight_product`,
        title: "Highlight Product",
        icon: "solar:ticker-star-linear",
      },
    ],
  },
  {
    key: "shipping",
    title: "Shipping",
    icon: "hugeicons:shipping-truck-01",
    type: SidebarItemType.Nest,
    items: [
      {
        key: "shipping_method",
        href: `/shipping/shipping_method`,
        title: "Shipping Method",
        icon: "solar:scooter-linear",
      },
      {
        key: "consignment_report",
        href: `/shipping/consignment_report`,
        title: "Consignment Report",
        icon: "solar:spedometer-middle-linear",
      },
    ],
  },
  {
    key: "shop_setting",
    title: "Shop Setting",
    icon: "solar:shop-linear",
    type: SidebarItemType.Nest,
    items: [
      {
        key: "shop_information",
        href: `/shop_setting/shop_information`,
        title: "Shop Infomation",
        icon: "solar:info-circle-outline",
      },
      {
        key: "branches",
        href: `/shop_setting/branches`,
        title: "Branches",
        icon: "solar:info-square-linear",
      },
      {
        key: "store_members",
        href: `/shop_setting/store_members`,
        title: "Store Members",
        icon: "solar:card-2-linear",
      },
    ],
  },
  {
    key: "marketing",
    title: "Marketing",
    icon: "hugeicons:marketing",
    type: SidebarItemType.Nest,
    items: [
      {
        key: "campaigns",
        href: `/marketing/campaigns`,
        title: "Campaigns",
        icon: "solar:confetti-minimalistic-linear",
      },
      {
        key: "broadcast",
        href: `/marketing/broadcast`,
        title: "Broadcast",
        icon: "solar:microphone-large-linear",
      },
      {
        key: "comment_to_chat",
        href: `/marketing/comment_to_chat`,
        title: "Comment to Chat",
        icon: "solar:multiple-forward-left-linear",
      },
      {
        key: "live_to_chat",
        href: `/marketing/live_to_chat`,
        title: "Live to Chat",
        icon: "solar:play-stream-linear",
      },
      {
        key: "top_selling_products",
        href: `/marketing/top_selling_products`,
        title: "Top Selling Products",
        icon: "solar:medal-ribbons-star-linear",
      },
    ],
  },
  {
    key: "integration",
    href: `/integration`,
    icon: "solar:link-circle-bold",
    title: "Integration",
  },
  {
    key: "settings",
    href: `/settings`,
    icon: "solar:settings-outline",
    title: "Settings",
  },
];

export default sectionItemsWithTeams;