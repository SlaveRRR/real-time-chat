import { useCallback, useState } from 'react'
import ctx from './context';

import { UiButton,UiSnackBar } from './components/UI';


import FormComment from './components/FormComment/FormComment';
import CommentsList from './components/CommentsList/CommentsList';
import Modal from './components/Modal/Modal';

import './App.scss';
import { Transition } from 'react-transition-group';


const App = () =>{
  
  const [isOpenedForm,setOpenedForm] = useState(false)

  const [isOpenedModal,setOpenedModal] = useState(false)

  const [isOpenedSnackBar,setOpenedSnackBar] = useState(false)

  const [isErrSnackBar,setErrSnackBar] = useState(false)

  const [messageSnackBar,setMessageSnackBar] = useState('')

  const [parentId,setParentId] = useState(null)

  const texts = ['Скрыть форму', 'Создать новый комментарий']

  
  
  const showForm = () => {
    setOpenedForm(!isOpenedForm)
  } 
  console.log(isOpenedForm)
  const closeSnackBar = () => {
    setOpenedSnackBar(false)
  }

  const showSnackBar = (message, err) => {

    setMessageSnackBar(message)
    setOpenedSnackBar(true)
    setErrSnackBar(err)
    setTimeout(() =>{
      closeSnackBar()
    },2000)

  }
  
  const  showModal = id => {
    setParentId(id)
    setOpenedModal(!isOpenedModal)
  }
 
  return (
   <ctx.Provider value={{showSnackBar,parentId,showModal}}>
      <header className="header">
    <p>
      Чат на React
    </p>
  </header>
  <main className="main" id="main">
    <h1 className="visuallyhidden">Онлайн чат на React</h1>

    <section className="form-section">
      <div  className="container">
        <UiButton handleClick={showForm}>{ isOpenedForm ? texts[0] : texts[1] }</UiButton>
        <FormComment  visible={isOpenedForm}>Создать новый комментарий</FormComment>
      </div>
    </section>

    <section className="comments-section">
      <div className="container">
        <CommentsList/>
      </div>
    </section>

    <section className="interactive-section">
      <div className="container">
        <Modal  id={parentId} showModal={showModal} visible={isOpenedModal} />

        <Transition
        in={isOpenedSnackBar}
        timeout={500}
       
        >
            {state => <UiSnackBar mixClass={[state]}  err={isErrSnackBar} message={messageSnackBar} />}
        </Transition>
       
      </div>
    </section>
  </main>
  </ctx.Provider>
  )
  
}

export default App