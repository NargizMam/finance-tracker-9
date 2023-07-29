import React from 'react';
import {CloseButton, Modal} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import ButtonSpinner from "../Spinner/ButtonSpinner/ButtonSpinner";

interface Props extends React.PropsWithChildren {
    show: boolean;
    title: string;
    onClose: React.MouseEventHandler;
    loading: boolean;
    onSubmit: React.MouseEventHandler;
}

const ModalWindow: React.FC<Props> = ({
                                          show, title,
                                          onClose,
                                          loading,
                                          children,
                                          onSubmit
}) => {
    const displayStyle = {
        display: show ? 'block' : 'none'
    };
    return (
        <>
            <div
                className="modal show"
                style={displayStyle}
            >
                <Modal.Dialog>
                    <CloseButton onClick={onClose}/>
                    <Modal.Header>
                        <Modal.Title>Add transactions</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {children}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary"
                                onClick={onClose}>Close</Button>
                        <Button type="submit"
                                variant="primary"
                                onClick={onSubmit}
                        >
                            {loading && <ButtonSpinner/>}
                            Save</Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </div>
        </>
    );
};

export default ModalWindow;