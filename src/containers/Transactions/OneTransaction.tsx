import React from 'react';
import {Card} from "react-bootstrap";
import dayjs from "dayjs";
import {Button, CardActions} from "@mui/material";
import {Delete, Edit} from "@mui/icons-material";
import {NavLink} from "react-router-dom";
import {Transaction} from "../../type";

interface Props {
    transaction: Transaction
}
const OneTransaction: React.FC<Props> = ({transaction}) => {

    return (
        <>
            <Card style={{ width: '18rem' }}>
                <Card.Body >
                    <span>{dayjs(transaction.createdAt).format('DD.MM.YYYY HH: mm:ss')}</span>
                    <span>{transaction.category.name}</span>
                    <span>
                            {transaction.category.type === 'expense' ? '-' : '+'}
                        {transaction.amount} KGS
                        </span>
                </Card.Body>
                <CardActions>
                    <Button color="info" variant="outlined" component={NavLink}
                            to={'/edit-transactions/' + transaction.id}
                    >
                        <Edit/>
                        Edit</Button>
                    <Button color="warning" variant="outlined"
                            // disabled={deleteLoading ? deleteLoading === transaction.id : false}
                    >
                        <Delete/>
                        Delete</Button>
                </CardActions>
            </Card>
        </>
    );
};

export default OneTransaction;