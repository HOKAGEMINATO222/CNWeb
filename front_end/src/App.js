import './App.css';
import Home from "./pages/Home/home";
import Login from "./pages/Login/index";
import RegisterPage from './pages/RegisterAccount';
import ProfilePage from "./pages/Profile/ProfilePage";
import CartPage from './pages/Cart/CartPage';

import CheckoutPage from "./pages/Checkout/CheckoutPage";
import ProductDetail from "./pages/Product/ProductDetail";
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Chỉ import một lần
import { publicRoutes } from './routes';
import { CartProvider } from './components/CartContext/CartContext';
import { AuthProvider } from './components/AuthContext/AuthContext';
import Accessory from './pages/Home/Accessory';
import Phone from './pages/Home/Phone';
import Laptop from './pages/Home/Laptop';
import Headphone from './pages/Home/Headphone';
import Cable from './pages/Home/Cable';

function App() {
  const isLoggedIn = localStorage.getItem("role"); 

  return (
    <AuthProvider>
      <CartProvider>

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}>
              <Route path="/" element={<Home isLoggedIn={!!isLoggedIn} />} />
              <Route path="/phone" element={<Phone />} />
              <Route path="/laptop" element={<Laptop />} />
              <Route path="/accessories" elemenent={<Accessory />} />
              <Route path="/headphones" element={<Headphone />} />
              <Route path="/cables" elemenent={<Cable />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            {publicRoutes.map((route, index) => {
              const Page = route.component;
              const Layout = route.layout;
              let category = route.category;

              return (
                <Route key={index} path={route.path} element={
                  <Layout>
                    <Page category={category}></Page>
                  </Layout>
                }>
                  <Route path={route.childPath} element={
                    <Layout>
                      <Page category={category}></Page>
                    </Layout>
                  }> </Route>
                </Route>
              );
            })}
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
