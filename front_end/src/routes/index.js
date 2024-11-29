import AdminUser from '../componet/AdminUser/AdminUser';
import Admin from '../pages/AdminPage/AdminPage';
import adminLayout from '../pages/AdminPage/adminLayout';
import ProductDetailPage from '../pages/ProductDetailPage/ProductDetailPage'
import AdminOrder from '../componet/AdminOrder/AdminOrder';
import AdminProduct from '../componet/AdminProduct/AdminProduct';
import UserLayout from '../components/UserLayout/UserLayout';


const publicRoutes = [
    { path: '/admin', component: Admin, layout: adminLayout },
    { path: '/admin/users', component: AdminUser, layout: adminLayout },
    {
        path: '/product-detail',
        component: ProductDetailPage,
        layout: UserLayout,
    },
    { path: '/admin/products', component: AdminProduct, layout: adminLayout },
    { path: '/admin/orders', component: AdminOrder, layout: adminLayout },
    // Thêm các route khác ở đây
];




const privateRoutes = [


];

export {
    publicRoutes, privateRoutes
}