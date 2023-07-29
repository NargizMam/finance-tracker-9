import React from 'react';
import {Button} from "@mui/material";
import {NavLink} from "react-router-dom";
import {Delete, Edit} from "@mui/icons-material";
import {Category} from "../../type";
interface Props {
    category: Category
}
const OneCategory: React.FC<Props> = ({category}) => {
    return (
        <>
            <div
                key={Math.random()}
                style={{width: 1000}}
            >
                <span> {category.name} </span>
                <p className={category.type === 'income' ? 'plus' : 'minus'}>{category.type}</p>
                <Button color="info" variant="outlined" component={NavLink} to='/'
                >
                    <Edit/>
                    Edit</Button>
                <Button color="warning" variant="outlined"
                >
                    <Delete/>
                    Delete</Button>
            </div>
        </>
    );
};

export default OneCategory;