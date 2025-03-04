import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './core/layout/auth/auth-layout/auth-layout.component';
import { authGuard } from './core/guards/auth/auth.guard';
import { loggedUserGuard } from './core/guards/auth/logged-user.guard';

export const routes: Routes = [
    {path:"auth",component:AuthLayoutComponent ,children :[
        {path:"register",canActivate:[loggedUserGuard],loadComponent:()=> import('./core/layout/auth/register/register.component').then(c =>c.RegisterComponent)} ,
        {path:"",canActivate:[loggedUserGuard],loadComponent:()=> import('./core/layout/auth/login/login.component').then(c =>c.LoginComponent)} ,
        {path:"forget-password",canActivate:[loggedUserGuard],loadComponent:()=> import('./core/layout/auth/forget-password/forget-password.component').then(c =>c.ForgetPasswordComponent)} ,
    ] },


    {path:"",loadComponent:()=> import('./core/layout/auth/login/login.component').then(c =>c.LoginComponent)} ,
    {path:"home",canActivate:[authGuard], loadComponent:()=> import('./features/pages/home/home.component').then(c =>c.HomeComponent)} ,
    {path:"brands",canActivate:[authGuard],loadComponent:()=> import('./features/pages/brands/brands.component').then(c =>c.BrandsComponent)} ,
    {path:"products",canActivate:[authGuard],loadComponent:()=> import('./features/pages/products/products.component').then(c =>c.ProductsComponent)} ,
    {path:"categories",canActivate:[authGuard],loadComponent:()=> import('./features/pages/categories/categories.component').then(c =>c.CategoriesComponent)} ,
    {path:"cart",canActivate:[authGuard],loadComponent:()=> import('./features/pages/cart/cart.component').then(c =>c.CartComponent)} ,
    {path:"wishlist",canActivate:[authGuard],loadComponent:()=> import('./features/pages/wishlist/wishlist.component').then(c =>c.WishlistComponent)} ,
    {path:"checkout/:cartId",canActivate:[authGuard],loadComponent:()=> import('./features/pages/checkout/checkout.component').then(c =>c.CheckoutComponent)} ,
    {path:"online-checkout/:cartId",canActivate:[authGuard],loadComponent:()=> import('./features/pages/checkout/online-checkout/online-checkout.component').then(c =>c.OnlineCheckoutComponent)} ,
    {path:"product-details/:id",canActivate:[authGuard],loadComponent:()=> import('./features/pages/product-details/product-details.component').then(c =>c.ProductDetailsComponent)} ,
    {path:"allorders",canActivate:[authGuard],loadComponent:()=> import('./features/pages/orders/orders.component').then(c =>c.OrdersComponent)} ,





    {path:"**",loadComponent:()=> import('./core/pages/not-found/not-found.component').then(c =>c.NotFoundComponent)} ,

   
];
