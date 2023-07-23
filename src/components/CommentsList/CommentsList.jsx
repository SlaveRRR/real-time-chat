import { useContext, useEffect, useMemo, useState } from "react";

import ctx from "../../context";

import { UiSwitch, UiCounter } from "../UI/index"


import CommentItem from "../CommentItem/CommentItem";

import './CommentsList.scss'


const CommentsList = ({ setOpenedSnackBar, setMessageSnackBar }) => {

    const [comments, setComments] = useState([]);

    const [online, setOnline] = useState(true);

    const { showSnackBar } = useContext(ctx)


    let response = null;



    const unsubscribe = () => {
        response = null
        // return this.$emit('showSnackBar', `Онлайн режим отключен!`, false)
    }

    const subscribe = () => {
        response = new EventSource("http://slavaver.space/comments/stream")

        response.onmessage = ({ data }) => {
            const comment = JSON.parse(data)
            console.log('new Comment')
            setComments(prev => [...prev, comment])

            return showSnackBar(`Новое сообщение от пользователя ${comment?.author}`, false)
        }

    }

    const onlineMessage = () => {
        setOnline(!online)
        if (online) {
            showSnackBar('Онлайн режим отключен!', false)
        }
        online ? subscribe() : unsubscribe()
    }


    const makeTree = (arr) => {
        console.log('work')
        const obj = {};
        let comms = arr.map(el => {
            el.createdAt = new Date(el.createdAt)
            return el
        }).sort((a, b) => a.createdAt - b.createdAt)


        for (let i of comms) {
            if (i.parentId) {
                obj[i.parentId] = obj[i.parentId] || [];
                obj[i.parentId].push(i)
            }
        }
        comms = comms.map(el => {
            if (el.id in obj) {
                el['children'] = obj[el.id]

            }
            return el
        })

        comms = comms.filter(v => v.parentId === null || !v.parentId)
        return comms

    }



    const getComments = async () => {
        try {
            const resp = await fetch("http://slavaver.space/comments");
            if (resp.status === 500) {
                throw new Error('Ошибка сервера!')
            }
            const values = await resp.json()

            setComments(prev => [...prev, ...values])
            // console.log(this.comments.length,'общее кол-во сообщений')

        } catch ({ message }) {
            return 'error'
            // return this.$emit('showSnackBar', `${message}`, false)

        }

    }
    console.log('render')
    const reply = (id) => {
        this.$emit('showModal', id)
    }

    const randomId = () => {
        let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (let i = 0; i < 4; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }








    const getTree = useMemo(() => {
        return makeTree(comments)
    }, [comments]);


    useEffect(() => {
        getComments().then(() => {
            subscribe()
        })

    }, [])
    return (
        <>
            <div className="realMessage">
                <p className="realMessage__text">Онлайн режим</p>
                <UiSwitch switchValue={onlineMessage} id={randomId()} check={online} />
            </div>
            <UiCounter count={comments.length} />
            <ul className="comments">
                {
                    ...getTree.map(item => <CommentItem id={item.id} key={randomId()} comment={item} />)
                }
            </ul>
        </>

    )
}


export default CommentsList;