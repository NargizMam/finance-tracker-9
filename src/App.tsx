import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Layout from './UI/Layout/Layout';
import Transactions from "./containers/Transactions/Transactions";
import Categories from "./containers/Categories/Categories";
import CategoriesModal from "./containers/Categories/CategoriesModal";


function App() {

  return (
      <Layout>
        <Routes>
          <Route path='/'  element={<Transactions/>}/>
            <Route path='/transactions' element={(<Transactions/>)}/>
          <Route path='/categories' element={<Categories/>}/>
        </Routes>
      </Layout>
  );
}

export default App;
