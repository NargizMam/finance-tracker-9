import React from 'react';
import Backdrop from '../Backdrop/Backdrop';
import {isClose} from "./ModalSlice";
import {selectModalOpen} from "../../store/TransactionsSlice";
import {useAppDispatch, useAppSelector} from '../../app/hook';

interface Props extends React.PropsWithChildren {
    title: string;
}

const Modal: React.FC<Props> = ({ title, children}) => {
    const dispatch = useAppDispatch();
    const isOpen = useAppSelector(selectModalOpen);
    const displayStyle = {
        display: isOpen ? 'block' : 'none'
    }
    return (
        < >
            <Backdrop show={isOpen} />
            <div
                className="modal show"
                style={displayStyle}
            >
                <div className="modal-dialog" onClick={e => e.stopPropagation()}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5">{title}</h1>
                        </div>
                        <button type="button" className="btn-close position-absolute m-2 top-2 end-0"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                onClick={()=>dispatch(isClose())}
                        />
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Modal;
//
// <Button onClick={handleOpen}>Open modal</Button>
// <Modal
//     open={open}
//     onClose={handleClose}
//     aria-labelledby="modal-modal-title"
//     aria-describedby="modal-modal-description"
// >
//     <Box sx={style}>
//         <Typography id="modal-modal-title" variant="h6" component="h2">
//             Text in a modal
//         </Typography>
//         <Typography id="modal-modal-description" sx={{ mt: 2 }}>
//             Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
//         </Typography>
//     </Box>
// </Modal>