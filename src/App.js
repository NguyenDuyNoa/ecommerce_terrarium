import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import Category from './pages/Category';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Dashboard from './pages/AdminSite/Dashboard/Dashboard';
import ProductManagement from "./pages/AdminSite/ProductManagement/ProductManagement"
import UserManagement from "./pages/AdminSite/UserManagement/UserManagement"
import Checkout from './pages/Checkout';
import Contact from './pages/Contact';

function App() {
  return (
    < >
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/products/:id' element={<ProductDetail />} />
        <Route path='/open' element={<Category name='hệ mở' type='Hệ mở' />} />
        <Route path='/close' element={<Category name='hệ kín' type='Hệ kín' />} />
        <Route path='/diy' element={<Category name='DIY' type='DIY' />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/cart' element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/user-management" element={<UserManagement />} />
        <Route path="/product-management" element={<ProductManagement />} />
      </Routes>
    </>
  );
}

export default App;
