import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Layout from './UI/Layout/Layout';
import Transactions from "./containers/Transactions/Transactions";
import Categories from "./containers/Categories/Categories";
import TransactionsModal from "./containers/Transactions/TransactionsModal";


function App() {

  return (
      <Layout>
        <Routes>
          <Route path='/'  element={<Transactions/>}/>
            <Route path='/transactions' element={(<Transactions/>)}/>
            <Route path='/edit-transactions/:id' element={(<TransactionsModal/>)}/>
          <Route path='/categories' element={<Categories/>}/>
        </Routes>
      </Layout>
  );
}

export default App;
