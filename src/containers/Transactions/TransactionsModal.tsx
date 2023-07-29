import React, {useCallback, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hook";
import {
    closeModal,
    openModal,
    selectCreateLoading,
    selectFetchOneTransaction,
    selectModalOpen,
    selectTransactionUpdateLoading
} from "../../store/TransactionsSlice";
import {Form} from "react-bootstrap";
import {fetchCategories} from "../../store/CategoriesThunk";
import {selectCategories} from "../../store/CategoriesSlice";
import {
    createTransactions,
    fetchOneTransaction,
    fetchTransactions,
    updateTransaction
} from "../../store/TransactionsThunks";
import dayjs from "dayjs";
import ModalWindow from "../../UI/Modal/Modal";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {ApiTransaction} from "../../type";

const TransactionsModal = () => {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const {id} = useParams();
    const navigate = useNavigate();
    const isOpen = useAppSelector(selectModalOpen);
    const categories = useAppSelector(selectCategories);
    const creating = useAppSelector(selectCreateLoading);
    const updating = useAppSelector(selectTransactionUpdateLoading);
    const transactionInfo = useAppSelector(selectFetchOneTransaction);

    const [formState, setFormState] = useState({
        type: 'expense',
        categoryId: '',
        amount: ''
    });
    useEffect(() => {
        if(isOpen){
            dispatch(fetchCategories());
        }
    }, [dispatch, isOpen]);

    useEffect(() => {
        setFormState(prev => ({
            ...prev,
            categoryId: ''
        }));
    },[formState.type]);

    const getTransactionsInfo = useCallback(async ()=> {
        if(id) {
            await dispatch(fetchOneTransaction(id));
            await dispatch(openModal());

        }
        },[dispatch, id]);

    useEffect(() => {
       void getTransactionsInfo();
       if(transactionInfo){
           setFormState({
               type: transactionInfo.type,
               categoryId: transactionInfo.categoryId,
               amount: (transactionInfo.amount).toString()
           })
       }

    }, [getTransactionsInfo,transactionInfo, location.pathname]);

    const close = () => {
        dispatch(closeModal())
    };

    const onFormFieldChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        await setFormState(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };
    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newTransaction: ApiTransaction = {
            categoryId: formState.categoryId,
            amount: parseInt(formState.amount),
            type: formState.type,
            createdAt: dayjs(new Date()).toISOString(),
        }
        await dispatch(createTransactions(newTransaction));
        if(id && transactionInfo){
            await dispatch(updateTransaction({id, newTransaction}));
        }
        await dispatch(fetchTransactions());
        await close();
        await navigate('/');
    };

    const categoriesByType = categories.filter(e => e.type === formState.type);
    return (
        <ModalWindow show={isOpen} title='Add new transaction'
                     onClose={close} loading={creating || updating }
                     onSubmit={onSubmit}
        >
            <Form onSubmit={onSubmit}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Type</Form.Label>
                    <Form.Select
                        onChange={onFormFieldChange}
                        value={formState.type}
                        name="type"
                        required
                    >
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Category</Form.Label>
                    <Form.Select
                        name="categoryId"
                        onChange={onFormFieldChange}
                        required
                    >
                        <option value='' disabled >Select category</option>
                        {categoriesByType.map(category => (
                            <option key={category.id}
                                value={category.id}>{category.name}</option>
                        ))}
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Amount</Form.Label><br/>
                    <input type="number"
                           placeholder="KGS"
                          name="amount"
                          onChange={onFormFieldChange}
                          value={formState.amount}
                           required
                           min="0.01"
                           step=".01"
                    />
                </Form.Group>
            </Form>
        </ModalWindow>
        );

};

export default TransactionsModal;