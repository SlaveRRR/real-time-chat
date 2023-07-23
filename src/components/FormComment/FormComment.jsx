import { useContext, useEffect, useRef,useState } from 'react';
import ctx from '../../context';

import classNames from 'classnames';

import { UiButton } from "../UI/index";

import './FormComment.scss';


const FormComment = ({ visible, handleClick, mixClass=[] }) => {

    const usernameRef = useRef();

    const [disable, setDisable] = useState(false)

    const [comment, setComment] = useState('')

    const [reaction, setReaction] = useState(0)

    const [username, setUsername] = useState('')

    const {showSnackBar,parentId,showModal} = useContext(ctx)
    

    useEffect(() =>{
        usernameRef.current?.focus()
    },[visible])
    
    
    const createComment = async (e) => {
        if (!username || !comment) {
            return showSnackBar("Заполните форму!", true);
        }
        setDisable(true)
        const data = {
            author: username,
            text: comment,
            reaction: Number(reaction),
        };
        if (parentId) {
            data["parentId"] = parentId;
        }
        try {
            const resp = await fetch("http://slavaver.space/comments", {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                    Username: "Slava-beginner",
                }
            });
            if (resp.status === 500) {
                throw new Error("Ошибка сервера!");
            }
            console.log(await resp.json());
        }
        catch (error) {
            return showSnackBar(error.message, true);
        }
        finally {
            setDisable(false);
            setComment('')
            setUsername('')
            showModal(null)
        }
    }
    if(visible){
        return (
            <form onClick={handleClick} className={classNames('form',...mixClass)} onSubmit={(e) => {
                e.preventDefault()
                createComment()
            }} action="" >
                <fieldset className="form__data">
                    <legend className="form__legend">Создать новый комментарий</legend>
                    <label className="form__name" htmlFor="nameAuthor">Имя</label>
                    <input ref={usernameRef} value={username} onChange={e => setUsername(e.target.value)} className="form__name-input" placeholder="Slaver" type="text" id="nameAuthor"/>
                    <label className="form__comment" htmlFor="comment">Комментарий</label>
                    <textarea placeholder="Some text ..." value={comment} onChange={e => setComment(e.target.value)} className="form__textarea" id="comment" cols="30"
                        rows="3"></textarea>
                </fieldset>
                {
                    Boolean(parentId) &&  <fieldset v-if="parentId" className="form__reaction-container">
                    <legend className="visuallyhidden">Реакция</legend>
                    <label className="form__radio-btn-label" htmlFor="dislike">
                        <svg className="form__reaction" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960"
                            width="48">
                            <path
                                d="M242-840h444v512L408-40l-39-31q-6-5-9-14t-3-22v-10l45-211H103q-24 0-42-18t-18-42v-81.839Q43-477 41.5-484.5T43-499l126-290q8.878-21.25 29.595-36.125Q219.311-840 242-840Zm384 60H229L103-481v93h373l-53 249 203-214v-427Zm0 427v-427 427Zm60 25v-60h133v-392H686v-60h193v512H686Z" />
                        </svg>
                        <input type="radio" onChange={e => setReaction(e.target.value)} className="hiddenBtn" name="reaction" value="-1" id="dislike"/>
                    </label>
                    <label className="form__radio-btn-label" htmlFor="neutral">
                        <svg className="form__reaction" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960"
                            width="48">
                            <path
                                d="M626-533q22.5 0 38.25-15.75T680-587q0-22.5-15.75-38.25T626-641q-22.5 0-38.25 15.75T572-587q0 22.5 15.75 38.25T626-533Zm-292 0q22.5 0 38.25-15.75T388-587q0-22.5-15.75-38.25T334-641q-22.5 0-38.25 15.75T280-587q0 22.5 15.75 38.25T334-533Zm20 194h253v-49H354v49ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 340q142.375 0 241.188-98.812Q820-337.625 820-480t-98.812-241.188Q622.375-820 480-820t-241.188 98.812Q140-622.375 140-480t98.812 241.188Q337.625-140 480-140Z" />
                        </svg>
                        <input checked type="radio" onChange={e => setReaction(e.target.value)} className="hiddenBtn" name="reaction" value="0" id="neutral"/>
                    </label>
                    <label className="form__radio-btn-label" htmlFor="like">
                        <svg className="form__reaction" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960"
                            width="48">
                            <path
                                d="M716-120H272v-512l278-288 39 31q6 5 9 14t3 22v10l-45 211h299q24 0 42 18t18 42v81.839q0 7.161 1.5 14.661T915-461L789-171q-8.878 21.25-29.595 36.125Q738.689-120 716-120Zm-384-60h397l126-299v-93H482l53-249-203 214v427Zm0-427v427-427Zm-60-25v60H139v392h133v60H79v-512h193Z" />
                        </svg>
                        <input type="radio" className="hiddenBtn" name="reaction" value="1" onChange={e => setReaction(e.target.value)} id="like"/>
                    </label>
                </fieldset>
                }
                <UiButton type="submit" disabled={disable} />
    
    
            </form>
        )
    }
    
}


export default FormComment;

