import './App.css';
import Home from "./pages/Home/home";
import Login from "./pages/Login/index";
import RegisterPage from './pages/RegisterAccount';
import ProfilePage from "./pages/Profile/ProfilePage";
import CartPage from './pages/Cart/CartPage';
import Header from "./components/Header";
import CheckoutPage from "./pages/Checkout/CheckoutPage";
import ProductDetail from "./pages/Product/ProductDetail";
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Chỉ import một lần
import { publicRoutes } from './routes';
import { CartProvider } from './components/CartContext/CartContext';
import { AuthProvider } from './components/AuthContext/AuthContext';
import ProductDetailPage from './pages/ProductDetailPage/ProductDetailPage';


function App() {
  const isLoggedIn = localStorage.getItem("role"); 

  return (
    <AuthProvider>
      <CartProvider>
        <Header />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home isLoggedIn={!isLoggedIn} />} />
            <Route path="/product/:productId" element={<ProductDetail />} />
            <Route path="/product-detail/:productId" element={<ProductDetailPage />} />
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
