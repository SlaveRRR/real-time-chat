import { useContext } from 'react';
import ctx from '../../context';



import FormComment from '../FormComment/FormComment';

import './Modal.scss';

const Modal = ({ visible, id, }) => {
    const {showModal} = useContext(ctx)
    if(visible){
        return (

            <div className="modal" onClick={() => showModal(null)}>
                <FormComment  visible={true} mixClass={['form--active']} handleClick={(e) => e.stopPropagation()} parentId ={id}>Ответить на комментарий</FormComment>
            </div>
        )
    }
    
}


export default Modal;
