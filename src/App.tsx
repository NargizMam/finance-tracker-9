import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Layout from './UI/Layout/Layout';
import {Home} from "@mui/icons-material";


function App() {

  return (
      <Layout>
        <Routes>
          <Route path='/'  element={<Home/>}/>
          {/*<Route path='new-transactions' element={<TransactionsForm/>}/>*/}
          {/*<Route path='/edit/:id' element={<TransactionsForm/>}/>*/}
          {/*<Route path='/categories' element={<Categories/>}/>*/}
        </Routes>
      </Layout>
  );
}

export default App;
