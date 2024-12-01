import Home from '../pages/Home/Home';
import Order from '../pages/Order';
import Product from '../pages/Product/ProductDetail';
import RegisterPage from '../pages/RegisterAccount';
import LoginPage from '../pages/Login';
import Admin from '../pages/AdminPage/AdminPage';
import userLayout from '../pages/userLayout/userLayout';
import adminLayout from '../pages/AdminPage/adminLayout';
import Category from '../pages/Category/Category'
import UserProfile from '../pages/UserProfile/UserProfile';

// public Routes

const publicRoutes=[
    {path: '/', component: Home, layout: userLayout},
    {path: '/product', component: Product, layout: userLayout, childPath: ':productId'},
    {path: '/register', component:RegisterPage, layout: userLayout},
    {path: '/login', component:LoginPage, layout: userLayout},
    {path: '/order',component:Order, layout: userLayout},
    {path: '/admin', component: Admin, layout: adminLayout},
    {path: '/phone', component: Category, layout: userLayout, childPath: ':brandName', category: 'Phone'},
    {path: '/ban-phim', component: Category, layout: userLayout, childPath: ':brandName', category: 'Ban Phim'},
    {path: '/laptop', component: Category, layout: userLayout, childPath: ':brandName', category: 'Laptop'},
    {path: '/tivi', component: Category, layout: userLayout, childPath: ':brandName', category: 'TV'},
    {path: '/chuot', component: Category, layout: userLayout, childPath: ':brandName', category: 'Chuot'},
    {path: '/phu-kien', component: Category, layout: userLayout, childPath: ':brandName', category: 'Phu Kien'},
    {path: '/tai-nghe', component: Category, layout: userLayout, childPath: ':brandName', category: 'Tai Nghe'},
    {path: '/profile',component: UserProfile, layout: userLayout},
    // {path: '/checkout', component: Checkout, layout: userLayout},
    // {path: '/check', component: CheckOrder, layout: userLayout},
];

const privateRoutes=[


];

export{
    publicRoutes,privateRoutes
}