import React from 'react';
import Header from "../../components/Header/Header";
import TotalBalance from "../../components/TotalBalance/TotalBalance";
import TransactionList from "../../components/TransactionList/TransactionList";
import {useAppSelector} from "../../app/hooks";
import {selectTotalBalance} from "../../components/TotalBalance/TotalBalance/TotalBalanceSlice";

const Home = () => {
    const totalBalance = useAppSelector(selectTotalBalance);
    return (
        <div className='container'>
            <Header/>
            <TotalBalance total={totalBalance}/>
            <TransactionList/>
        </div>
    );
};

export default Home;