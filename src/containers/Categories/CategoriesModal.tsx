import React, {useState} from 'react';
import {Form} from "react-bootstrap";
import ModalWindow from "../../UI/Modal/Modal";
import {useAppDispatch, useAppSelector} from "../../app/hook";
import {
    closeCategoriesModal,
    selectCategoriesModal,
    selectCategoriesUpdateLoading,
    selectCreateCategoriesLoading,
    selectFetchOneCategory
} from "../../store/CategoriesSlice";
import {createCategory, fetchCategories} from "../../store/CategoriesThunk";
import {useParams} from "react-router-dom";

const CategoriesModal = () => {
    const dispatch = useAppDispatch();
    const {id} = useParams();
    const updating = useAppSelector(selectCategoriesUpdateLoading);
    const categoryInfo = useAppSelector(selectFetchOneCategory);
    const isOpen = useAppSelector(selectCategoriesModal);
    const creating = useAppSelector(selectCreateCategoriesLoading);
    const [formState, setFormState] = useState({
        type: 'expense',
        name: ''
    });
    const resetForm = () => {
        setFormState({
            type: 'expense',
            name: ''
        });
    };
    const close = () => {
        dispatch(closeCategoriesModal())
    };
    const onFormFieldChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {

        setFormState(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));

    };
    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await dispatch(createCategory({
            type: formState.type as 'expense' | 'income',
            name: formState.name
        }));
        await dispatch(fetchCategories());
        close();
        await resetForm();
    };
    return (
        <>
            <ModalWindow show={isOpen} title='Categories'
                         onClose={close} loading={creating}
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
                        <input type="text"
                               placeholder="Enter category"
                               name="name"
                               onChange={onFormFieldChange}
                               value={formState.name}
                        />
                    </Form.Group>
                </Form>
            </ModalWindow>

        </>
    );
};

export default CategoriesModal;
