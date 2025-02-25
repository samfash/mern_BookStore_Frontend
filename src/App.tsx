import React, {lazy, Suspense} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

// components
import PrivateRoute from './components/PrivateRoute.tsx';
import Header from './components/Header.tsx';
import Footer from './components/Footer.tsx';


// pages
const Home = lazy(() => import("./pages/Home.tsx"));
const Books = lazy(() => import("./pages/Books.tsx"));
const BookDetails = lazy(() => import("./pages/BookDetails.tsx"));
const About = lazy(() => import("./pages/aboutPage.tsx"));

const Login = lazy(() => import("./pages/Login.tsx"));
const Register = lazy(() => import("./pages/Register.tsx"));
const ForgotPassword = lazy(() => import("./pages/forgotPassword.tsx"));
const ResetPassword = lazy(() => import("./pages/resetPassword.tsx"));

const Cart = lazy(() => import("./pages/Cart.tsx"));
const Orders = lazy(() => import("./pages/orders.tsx"));
const OrderMake = lazy(() => import("./pages/createOrder.tsx"));

const Payment = lazy(() => import("./pages/payment.tsx"));
const SuccessPage = lazy(()=> import("./pages/success.tsx"))
const AdminPage = lazy(()=> import("./pages/admin.tsx"))
const AdminRoute = lazy(()=> import("./components/adminRoute.tsx"))
const NotFound = lazy(()=> import("./pages/notFound.tsx"))



const App: React.FC = () => {
  return (
    <Router>
      <Header/>
      <Suspense fallback={<div>Loading...</div>}>
      <main className="pt-16">
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        <Route element={<AdminRoute/>}>
          <Route path='/admin' element={<AdminPage/>}/>
        </Route>

        <Route element={<PrivateRoute/>}>
          <Route path='/books' element={<Books/>}/>
          <Route path="/books/:id" element={<BookDetails />} />
          <Route path="/orders/create" element={<OrderMake />} />
          <Route path='/carts' element={<Cart/>}/>
          <Route path='/orders' element={<Orders/>}/>
          <Route path="/payment" element={<Payment />} />
          <Route path="/success" element={<SuccessPage/>}/>
        </Route>
        <Route path="*" element={<NotFound />} />
        <Route path="/notfound" element={<NotFound />} />
      </Routes>
      </main>
      </Suspense>
      <Footer/>
    </Router>
  );
};

export default App;
