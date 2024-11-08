import './App.css';
import Home from "./pages/Home/Home";
import Login from "./pages/Login/index";
import RegisterPage from './pages/RegisterAccount';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Chỉ import một lần
import { publicRoutes } from './routes';
import { CartProvider } from './components/CartContext/CartContext';
import { AuthProvider } from './components/AuthContext/AuthContext';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<RegisterPage />} />
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
