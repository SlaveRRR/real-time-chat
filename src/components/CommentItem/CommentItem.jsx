import React,{ useContext, useMemo } from "react";

import ctx from "../../context";

import classNames from "classnames";
import { UiButton, UiCounter } from "../UI/index";

import './CommentItem.scss';



const getDate = (date) => {
    return new Intl.DateTimeFormat('ru', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    }).format(new Date(date))
}
// подсчет вложеннных детей
const countChildren = (tree, count) =>{
    let c = count;
    tree.children.forEach(element => {
        if (!element.children) {
            return
        }
        c += countChildren(element, c)

    });
    return c
}

const sumReaction = elem => {
    const sum = elem.children.map(e => e.reaction).reduce((prev, curr) => prev + curr)
    return sum
}

const CommentItem = ({ comment }) => {

    const {showModal} = useContext(ctx)
   
    const sum = useMemo(() =>{
        if(comment.children){
            return sumReaction(comment)
        }
    },[comment])

    
    

    return (
        <li className="comments__item item">
            <div className={classNames('item__container', {
                'item__container--negative': comment.children && sum < 0,
                'item__container--positive': comment.children && sum > 0,
            })}>
                <p className="item__author">{comment.author}</p>
                <p className="item__text">{comment.text}</p>
                <UiButton handleClick={() => showModal(comment.id)} mixClass={['item__reply-btn']} aria-label="Ответить пользователю">
                    Ответить
                </UiButton>
                {
                    comment?.children?.length > 0 && (
                        <UiCounter mixClass={["item__replies-count"]} count={comment?.children?.length} />
                    )

                }

                <time className="item__date" dateTime={comment.createdAt}>{getDate(comment.createdAt)}</time>
            </div >
            {
                comment?.children?.length > 0 && (
                    <ul className={`comments ${countChildren(comment,1) >= 5 ? 'comments--flat' : 'comments--children'}`}>
               {...comment.children.map(elem => <CommentItem id={elem.id} key={elem.id} comment={elem}  /> )} 
        </ul>
    )
}
    </li >
    )
}


export default React.memo(CommentItem);

    
