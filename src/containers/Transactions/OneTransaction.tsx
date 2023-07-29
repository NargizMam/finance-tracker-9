import React from 'react';
import {Card} from "react-bootstrap";
import dayjs from "dayjs";
import {Button, CardActions} from "@mui/material";
import {Delete, Edit} from "@mui/icons-material";
import {NavLink} from "react-router-dom";
import {Transaction} from "../../type";
import {useAppDispatch, useAppSelector} from "../../app/hook";
import {selectTransactionDeleteLoading} from "../../store/TransactionsSlice";
import {deleteTransaction} from "../../store/TransactionsThunks";

interface Props {
    transaction: Transaction
}
const OneTransaction: React.FC<Props> = ({transaction}) => {
    const dispatch = useAppDispatch();
    const deleteLoading = useAppSelector(selectTransactionDeleteLoading);

    const onDelete = async () => {
       await dispatch(deleteTransaction(transaction.id));
    }

    return (
        <>
            <Card style={{ width: '40rem' }}>
                <Card.Body style={{marginRight: '20px'}}>
                    <span>{dayjs(transaction.createdAt).format('DD.MM.YYYY HH: mm:ss')}</span>
                </Card.Body>
                <Card.Title style={{textAlign: 'right'}}><span>{transaction.category.name}</span></Card.Title>
                <Card.Header>
                    <span>
                        {transaction.category.type === 'expense' ? '-' : '+'}
                        {transaction.amount} KGS
                        </span>
                </Card.Header>
                <CardActions>
                    <Button color="info" variant="outlined" component={NavLink}
                            to={'/edit-transactions/' + transaction.id}
                    >
                        <Edit/>
                        Edit</Button>
                    <Button color="warning" variant="outlined"
                            disabled={deleteLoading ? deleteLoading === transaction.id : false}
                            onClick={onDelete}
                    >
                        <Delete/>
                        Delete</Button>
                </CardActions>
            </Card>
        </>
    );
};

export default OneTransaction;