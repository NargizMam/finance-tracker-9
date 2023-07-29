import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hook";
import {selectTotal, selectTransactions} from "../../store/TransactionsSlice";
import {Card} from "react-bootstrap";
import dayjs from "dayjs";
import {fetchTransactions} from "../../store/TransactionsThunks";
import {Button, CardActions} from "@mui/material";
import {Delete, Edit} from "@mui/icons-material";
import OneTransaction from "./OneTransaction";

const Transactions = () => {
    const dispatch = useAppDispatch();
    const transactions = useAppSelector(selectTransactions);
    const total = useAppSelector(selectTotal);

    useEffect(() => {
        dispatch(fetchTransactions());
    }, [dispatch])
    const transactionInfo = transactions.map(transaction => (
        <OneTransaction transaction={transaction}/>
    ));
        return (
        <>
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>Total: {total} KGS</Card.Title>
                </Card.Body>
                {transactionInfo}
            </Card>

        </>
    );
};

export default Transactions;