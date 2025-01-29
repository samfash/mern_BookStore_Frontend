import React, {lazy, Suspense} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

// components
import PrivateRoute from './components/PrivateRoute';
import Header from './components/Header.tsx';
import Footer from './components/Footer.tsx';

// pages
const Home = lazy(() => import("./pages/Home.tsx"));
const Books = lazy(() => import("./pages/Books.tsx"));
const BookDetails = lazy(() => import("./pages/BookDetails.tsx"));
// const Cart = lazy(() => import("../pages/Cart"));
const Orders = lazy(() => import("./pages/orders"));
const Login = lazy(() => import("./pages/Login.tsx"));
const Register = lazy(() => import("./pages/Register.tsx"));
const OrderMake = lazy(() => import("./pages/createOrder.tsx"));

const Payment = lazy(() => import("./pages/payment"));
const SuccessPage = lazy(()=> import("./pages/success.tsx"))


const App: React.FC = () => {
  return (
    <Router>
      <Header/>
      <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        
        <Route path='/books' element={
          <PrivateRoute>
          <Books/>
          </PrivateRoute>}/>
        <Route path="/books/:id" element={<BookDetails />} />
        <Route path="/orders/create" element={<OrderMake />} />

        <Route path='/orders' element={
          <PrivateRoute>
            <Orders/>
          </PrivateRoute>}/>
        <Route path="/payment" element={<Payment />} />
        <Route path="/success" element={<SuccessPage/>}/>
        <Route path="*" element={<Home />} />
      </Routes>
      </Suspense>
      <Footer/>
    </Router>
  );
};

export default App;
