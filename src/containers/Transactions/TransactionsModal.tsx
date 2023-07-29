import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hook";
import {closeModal, selectCreateLoading, selectModalOpen} from "../../store/TransactionsSlice";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {CloseButton, Form} from "react-bootstrap";
import {fetchCategories} from "../../store/CategoriesThunk";
import {selectCategories} from "../../store/CategoriesSlice";
import {createTransactions, fetchTransactions} from "../../store/TransactionsThunks";
import dayjs from "dayjs";
import ButtonSpinner from "../../UI/Spinner/ButtonSpinner/ButtonSpinner";

const TransactionsModal = () => {
    const dispatch = useAppDispatch();
    const isOpen = useAppSelector(selectModalOpen);
    const categories = useAppSelector(selectCategories);
    const creating = useAppSelector(selectCreateLoading);

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
    },[formState.type])
    const close = () => {
        dispatch(closeModal())
    };
    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await dispatch(createTransactions({
            categoryId: formState.categoryId,
            amount: parseInt(formState.amount),
            createdAt: dayjs(new Date()).toISOString(),
        }));
        await dispatch(fetchTransactions());
        close();
    };
    const onFormFieldChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {

        setFormState(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));

    };
    const displayStyle = {
        display: isOpen ? 'block' : 'none'
    };
    const categoriesByType = categories.filter(e => e.type === formState.type);
    return (
            <div
                className="modal show"
                style={displayStyle}
            >
                <Modal.Dialog>
                    <CloseButton onClick={close}/>
                    <Modal.Header>
                        <Modal.Title>Add transactions</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
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
                                    name="category"
                                    onChange={onFormFieldChange}
                                    value={formState.type}
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
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary"
                                onClick={close}>Close</Button>
                        <Button type="submit"
                                variant="primary">
                            {creating && <ButtonSpinner/>}
                            Save</Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </div>
        );

};

export default TransactionsModal;