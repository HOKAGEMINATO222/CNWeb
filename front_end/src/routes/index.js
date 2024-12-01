import AdminUser from '../componet/AdminUser/AdminUser';
import Admin from '../pages/AdminPage/AdminPage';
import adminLayout from '../pages/AdminPage/adminLayout';
// import Category from '../pages/Category/Category';
//import userLayout from '../pages/userLayout/userLayout';
import AdminOrder from '../componet/AdminOrder/AdminOrder';
import AdminProduct from '../componet/AdminProduct/AdminProduct';


const publicRoutes = [
    { path: '/admin', component: Admin, layout: adminLayout },
    { path: '/admin/users', component: AdminUser, layout: adminLayout },
    // {
    //     path: '/product-detail',
    //     component: ProductDetailPage,
    //     layout: UserLayout,
    // },
    { path: '/admin/products', component: AdminProduct, layout: adminLayout },
    { path: '/admin/orders', component: AdminOrder, layout: adminLayout },
    // Thêm các route khác ở đây
    //     { path: '/phone', component: Category, childPath: ':brandName', category: 'Phone' },
    //     { path: '/may giat', component: Category, childPath: ':brandName', category: 'May giat' },
    //     { path: '/laptop', component: Category, childPath: ':brandName', category: 'Laptop' },
    //     { path: '/TV', component: Category, childPath: ':brandName', category: 'TV' },
    //     { path: '/smarthome', component: Category, childPath: ':brandName', category: 'Smart home' },

];




const privateRoutes = [


];

export {
    publicRoutes, privateRoutes
}