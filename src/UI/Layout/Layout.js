import React from 'react';
import './Layout.css';
import Navbar from "../../components/Navbar/Navbar";

const Layout = (props) => {
  return (
    <>
        <div className='Navbar'>
            <Navbar/>
        </div>
      <main className="Content-Layout">{props.children}</main>
    </>
  );
};

export default Layout;