import classNames from 'classnames';
import './UiButton.scss'
const UiButton = ({children,handleClick,type,mixClass=[]}) => {
   
    return (
        <button onClick={handleClick} type={type || 'button'} className={classNames('mybutton',...mixClass)}>
            {children || 'Отправить'}
        </button>
    )
}

export default UiButton;

