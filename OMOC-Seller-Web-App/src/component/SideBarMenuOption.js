import { Icon } from "@iconify/react";
import inventroy from "../assets/icon/productInactiveOption/box.svg";
import category from "../assets/icon/productInactiveOption/category.svg";
import voucher from "../assets/icon/productInactiveOption/ticket-discount.svg";
import likeShape from "../assets/icon/productInactiveOption/like-shapes.svg";
import wallet from "../assets/icon/productInactiveOption/wallet-check.svg";
import barcode from "../assets/icon/productInactiveOption/barcode.svg";
import refresh from "../assets/icon/productInactiveOption/refresh-left-square.svg";
import boldInventroy from "../assets/icon/productActiveOption/box.svg";
import boldCategory from "../assets/icon/productActiveOption/category.svg";
import boldVoucher from "../assets/icon/productActiveOption/ticket-discount.svg";
import boldLikeShape from "../assets/icon/productActiveOption/like-shapes.svg";
import boldWallet from "../assets/icon/productActiveOption/wallet-check.svg";
import boldRefresh from "../assets/icon/productActiveOption/refresh-left-square.svg";
import boldBarcode from "../assets/icon/productActiveOption/barcode.svg";
import boldposticon from "../assets/icon/profileActiveOption/post_icon.svg";
import boldemptywallet from "../assets/icon/profileActiveOption/empty-wallet.svg";
import boldvideo from "../assets/icon/profileActiveOption/video.svg";
import posticon from "../assets/icon/profileInactiveOption/gallery-export.svg";
import emptywallet from "../assets/icon/profileInactiveOption/empty-wallet.svg";
import video from "../assets/icon/profileInactiveOption/video.svg";
import medal from "../assets/icon/productInactiveOption/Medal.svg";
import boldMedal from "../assets/icon/productActiveOption/boldMedal.svg";
import chartSquare from "../assets/icon//otherSettingsInactive/chart-square-inactive.svg"
import galleryExport from "../assets/icon//otherSettingsInactive/gallery-export-inactive.svg"
import clipboard from "../assets/icon//otherSettingsInactive/clipboard-text-inactive.svg"
import marketing from "../assets/icon//otherSettingsInactive/marketing-inactive.svg"
import shop from "../assets/icon//otherSettingsInactive/shop-inactive.svg"
import videoSetting from "../assets/icon//otherSettingsInactive/video-inactive.svg"
import boldvideoSetting from "../assets/icon//otherSettingsActive/video-active.svg"
import boldchartSquare from "../assets/icon//otherSettingsActive/chart-square-active.svg";
import boldgalleryExport from "../assets/icon//otherSettingsActive/gallery-export-active.svg";
import boldclipboard from "../assets/icon//otherSettingsActive/clipboard-text-active.svg";
import boldmarketing from "../assets/icon//otherSettingsActive/marketing-active.svg";
import boldshop from "../assets/icon//otherSettingsActive/shop-active.svg";

export const sideBar = [
  {
    text: "Dashboard",
    image: (
      <Icon icon="solar:home-2-linear" color="#9e9e9e" width="24" height="24" />
    ),
    activeImage: (
      <Icon icon="solar:home-2-linear" color="white" width="24" height="24" />
    ),
    link: "/Home",
    dropdown: false,
  },
  {
    text: "Orders",
    image: (
      <Icon
        icon="solar:cart-large-minimalistic-outline"
        color="#9e9e9e"
        width="24"
        height="24"
      />
    ),
    activeImage: (
      <Icon
        icon="solar:cart-large-minimalistic-outline"
        color="white"
        width="24"
        height="24"
      />
    ),
    link: "/Order/New-order",
    dropdown: false,
  },
  {
    text: "Product",
    image: (
      <Icon icon="solar:shop-outline" color="#9e9e9e" width="24" height="24" />
    ),
    activeImage: (
      <Icon icon="solar:shop-outline" color="white" width="24" height="24" />
    ),
    link: "/Product/Inventory",
    dropdown: true,
  },
  {
    text: "Profile shop",
    image: (
      <Icon
        icon="iconamoon:profile-light"
        color="#9e9e9e"
        width="24"
        height="24"
      />
    ),
    activeImage: (
      <Icon
        icon="iconamoon:profile-light"
        color="white"
        width="24"
        height="24"
      />
    ),
    link: "/Profile/Post-story/Post",
    dropdown: true,
  },
  {
    text: "Other Settings",
    image: (
      <Icon
        icon="icon-park-outline:setting-two"
        color="#9e9e9e"
        width="24"
        height="24"
      />
    ),
    activeImage: (
      <Icon
        icon="icon-park-outline:setting-two"
        color="white"
        width="24"
        height="24"
      />
    ),
    link: "/Other-settings/Customer",
    dropdown: true,
  },
  {
    text: "Shop Decoration",
    image: <Icon icon="fa:magic" color="#9e9e9e" width="24" height="24" />,
    activeImage: <Icon icon="fa:magic" color="white" width="24" height="24" />,
    link: "/Shop-decoration",
  },
];

export const productSubOptions = [
  {
    name: "Inventory",
    activeImage: boldInventroy,
    image: inventroy,
    link: "/Product/Inventory",
  },
  {
    name: "Categories",
    activeImage: boldCategory,
    image: category,
    link: "/Product/Categories",
  },
  {
    name: "Vouchers",
    activeImage: boldVoucher,
    image: voucher,
    link: "/Product/Vouchers/AllVouchers",
  },
  {
    name: "Testimonial",
    activeImage: boldLikeShape,
    image: likeShape,
    link: "/Product/Testimonial/All-testimonial",
  },
  {
    name: "Certification",
    activeImage: boldMedal,
    image: medal,
    link: "/Product/Certification",
  },
  {
    name: "Checkout",
    activeImage: boldWallet,
    image: wallet,
    link: "/Product/Checkout",
  },
  {
    name: "Barcode",
    activeImage: boldBarcode,
    image: barcode,
    link: "/Product/Barcode",
  },
  {
    name: "Return",
    activeImage: boldRefresh,
    image: refresh,
    link: "/Product/Return",
  },
];

export const profileSubOptions = [
  {
    name: "Post-Story",
    activeImage: boldposticon,
    image: posticon,
    link: "/Profile/Post-story/Post",
  },
  {
    name: "Live Stream",
    activeImage: boldvideo,
    image: video,
    link: "/Profile/LiveStream",
  },
  {
    name: "Balance",
    activeImage: boldemptywallet,
    image: emptywallet,
    link: "/Profile/Balance",
  },
];
export const otherSettingsOption = [
  {
    name: "Customer",
    activeImage: boldgalleryExport,
    image: galleryExport,
    link: "/Other-settings/Customer",
  },
  {
    name: "Analytics",
    activeImage: boldchartSquare,
    image: chartSquare,
    link: "/Other-settings/Analytics",
  },
  {
    name: "Marketing",
    activeImage: boldmarketing,
    image: marketing,
    link: "/Other-settings/Marketing",
  },
  {
    name: "Newsletter",
    activeImage: boldclipboard,
    image: clipboard,
    link: "/Other-settings/Newsletter",
  },
  {
    name: "Video Help",
    activeImage: boldvideoSetting,
    image: videoSetting,
    link: "/Other-settings/Video-help",
  },
  {
    name: "Shop Settings",
    activeImage: boldshop,
    image: shop,
    link: "/Other-settings/Shop-settings",
  },
];

