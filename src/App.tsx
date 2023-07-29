import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Layout from './UI/Layout/Layout';
import Transactions from "./containers/Transactions/Transactions";


function App() {

  return (
      <Layout>
        <Routes>
          <Route path='/'  element={<Transactions/>}/>
            <Route path='/transactions' element={(<Transactions/>)}/>

          {/*<Route path='new-transactions' element={<TransactionsForm/>}/>*/}
          {/*<Route path='/edit/:id' element={<TransactionsForm/>}/>*/}
          {/*<Route path='/categories' element={<Categories/>}/>*/}
        </Routes>
      </Layout>
  );
}

export default App;
