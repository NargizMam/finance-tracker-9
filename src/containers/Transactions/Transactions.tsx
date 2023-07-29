import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hook";
import {selectTotal, selectTransactions} from "../../store/TransactionsSlice";
import {Card} from "react-bootstrap";
import {fetchTransactions} from "../../store/TransactionsThunks";
import OneTransaction from "./OneTransaction";

const Transactions = () => {
    const dispatch = useAppDispatch();
    const transactions = useAppSelector(selectTransactions);
    const total = useAppSelector(selectTotal);

    useEffect(() => {
        dispatch(fetchTransactions());
    }, [dispatch]);

    const transactionInfo = transactions.map(transaction => (
        <OneTransaction
            key={transaction.id}
            transaction={transaction}/>
    ));
        return (
        <>
            <Card style={{ width: '18rem' , marginBottom: 10}}>
                <Card.Body>
                    <Card.Title>Total: {total} KGS</Card.Title>
                </Card.Body>
            </Card>
            {transactionInfo}

        </>
    );
};

export default Transactions;