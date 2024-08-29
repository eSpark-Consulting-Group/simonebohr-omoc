import { accountRoutes } from './account.route';
import { addressRoutes } from './address.route';
import { advertisementRoutes } from './advertisement.route';
import { assetsRoutes } from './assets.route';
import { authRoute } from './auth.route';
import { bannerRoutes } from './banner.route';
import { businessRoute } from './business.route';
import { cartRoutes } from './cart.route';
import { categoriesRoutes } from './categories.route';
import { chatRoutes } from './chat.route';
import { dashboardRoutes } from './dashboard.route';
import { faqRoute } from './faq.route';
import { inventoryRoutes } from './inventory.route';
import { messageRoutes } from './message.route';
import { orderRoutes } from './orders.route';
import { paymentRoutes } from './payment.route';
import { postsRoute } from './posts.route';
import { productsRoute } from './product.route';
import { certificateRoutes } from './productCertificates.route';
import { ratingRoute } from './rating.route';
import { settingsRoutes } from './setting.route';
import { shippingRoutes } from './shipping.route';
import { storiesRoutes } from './stories.route';
import { testimonialRoutes } from './testimonials.route';
import { userRoutes } from './user.route';
import { videoRoute } from './video.route';
import { voucherRoutes } from './voucher.route';
import { wishListRoutes } from './wishList.route';

export const appRoutes = [
  authRoute,
  productsRoute,
  dashboardRoutes,
  cartRoutes,
  addressRoutes,
  orderRoutes,
  businessRoute,
  assetsRoutes,
  userRoutes,
  ratingRoute,
  categoriesRoutes,
  voucherRoutes,
  settingsRoutes,
  wishListRoutes,
  storiesRoutes,
  bannerRoutes,
  testimonialRoutes,
  inventoryRoutes,
  chatRoutes,
  messageRoutes,
  shippingRoutes,
  postsRoute,
  faqRoute,
  advertisementRoutes,
  certificateRoutes,
  accountRoutes,
  videoRoute,
  paymentRoutes,
];
