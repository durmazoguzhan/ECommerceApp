import { BrowserRouter, Routes, Route } from "react-router-dom";
import loadable from "./components/Common/loadable";
import pMinDelay from "p-min-delay";
import Loader from "./components/Common/Loader";
import "./assets/css/style.css";
import { IKContext } from "imagekitio-react";
import { AuthProvider } from "oidc-react";
import oidcConfig from "./app/oidcConfig";
import { useDispatch } from "react-redux";

const Fashion = loadable(() => pMinDelay(import("./page/"), 250), { fallback: <Loader /> });
const Register = loadable(() => pMinDelay(import("./page/register"), 250), { fallback: <Loader /> });
const ProductDetailsTwos = loadable(() => pMinDelay(import("./page/Product/product-details-two"), 250), {
  fallback: <Loader />,
});
const About = loadable(() => pMinDelay(import("./page/about"), 250), { fallback: <Loader /> });
const ContactTwo = loadable(() => pMinDelay(import("./page/Contact/contact-two"), 250), {
  fallback: <Loader />,
});
const Cart = loadable(() => pMinDelay(import("./page/cart/index"), 250), { fallback: <Loader /> });
const Favorites = loadable(() => pMinDelay(import("./page/Wishlist/index"), 250), { fallback: <Loader /> });

const ShopLeftSideBar = loadable(() => pMinDelay(import("./page/shop/shop-left-sidebar"), 250), {
  fallback: <Loader />,
});
const OrderComplete = loadable(() => pMinDelay(import("./page/order/order-complete"), 250), {
  fallback: <Loader />,
});
const CheckoutTwos = loadable(() => pMinDelay(import("./page/checkout/checkout-two"), 250), {
  fallback: <Loader />,
});
const CustomerOrder = loadable(() => pMinDelay(import("./page/my-account/customer-order"), 250), {
  fallback: <Loader />,
});
const CustomerAddress = loadable(() => pMinDelay(import("./page/my-account/customer-address"), 250), {
  fallback: <Loader />,
});
const CustomerAccountDetails = loadable(
  () => pMinDelay(import("./page/my-account/customer-account-details"), 250),
  {
    fallback: <Loader />,
  }
);

function App() {
  const dispatch = useDispatch();

  return (
    <IKContext urlEndpoint="https://ik.imagekit.io/inveshop/">
      <AuthProvider
        {...oidcConfig}
        onSignIn={(user) => {
          dispatch({ type: "user/login", payload: user });
        }}
        onSignOut={() => {
          dispatch({ type: "user/logout" });
        }}
      >
        <div>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Fashion />} />
              <Route path="/register" element={<Register />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/wishlist" element={<Favorites />} />
              <Route path="/product-details-two/:id" element={<ProductDetailsTwos />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<ContactTwo />} />
              <Route path="/order-complete" element={<OrderComplete />} />
              <Route path="/checkout-two" element={<CheckoutTwos />} />
              <Route path="/my-account/customer-order" element={<CustomerOrder />} />
              <Route path="/my-account/customer-address" element={<CustomerAddress />} />
              <Route path="/my-account/customer-account-details" element={<CustomerAccountDetails />} />
              <Route path="/shop/shop-left-sidebar" element={<ShopLeftSideBar />} />
              <Route path="/shop" element={<ShopLeftSideBar />} />
              <Route path="/signin-oidc" element={<Fashion />} />
            </Routes>
          </BrowserRouter>
        </div>
      </AuthProvider>
    </IKContext>
  );
}

export default App;
