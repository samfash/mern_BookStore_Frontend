import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Online Bookshop - Home</title>
        <meta name="description" content="Discover and purchase amazing books online." />
      </Helmet>
      <div>
      <h1>Welcome to the Online Bookshop</h1>
        <div className="cta-buttons">
            <Link to="/login" >Login</Link>
            <hr/>
            <Link to="/register" >Register</Link>
        </div>
      </div>
    </>
  );
};

export default Home;
