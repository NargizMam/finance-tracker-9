import React from 'react';
import './Layout.css';
import Navbar from "../../components/Navbar/Navbar";
import TransactionsModal from "../../containers/Transactions/TransactionsModal";
import CategoriesModal from "../../containers/Categories/CategoriesModal";

const Layout: React.FC<React.PropsWithChildren>= ({children}) => {
  return (
    <>
        <Navbar/>
        <main className="Content-Layout" style={{marginTop: 50 }}>{children}</main>
        <TransactionsModal/>
        <CategoriesModal/>
    </>
  );
};

export default Layout;