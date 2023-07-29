import React from 'react';
import './Layout.css';
import Navbar from "../../components/Navbar/Navbar";
import TransactionsModal from "../../containers/Transactions/TransactionsModal";

const Layout = (props) => {
  return (
    <>
        <Navbar/>
        <main className="Content-Layout">{props.children}</main>
        <TransactionsModal/>
    </>
  );
};

export default Layout;