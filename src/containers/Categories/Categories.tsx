import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hook';
import {openCategoriesModal, selectCategories} from "../../store/CategoriesSlice";
import {fetchCategories} from "../../store/CategoriesThunk";
import {Button, Grid} from '@mui/material';
import OneCategory from "./OneCategory";

const Categories = () => {
    const dispatch = useAppDispatch();
    const allCategories = useAppSelector(selectCategories);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const open = () => {
        dispatch(openCategoriesModal());
    };
    const categoryInfo = allCategories.map(category => (
        <OneCategory category={category}
                     key={category.id}
        />
        ));

    return (
        <>
            <Grid sx={{display: 'flex', justifyContent: 'space-between'}}>
                <p>Categories</p>
                <Button variant="contained"
                        onClick={open}
                >Add </Button>
            </Grid>
            {categoryInfo}
        </>
    );
};

export default Categories;