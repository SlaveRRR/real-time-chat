import classNames from 'classnames';
import  './UiCounter.scss';

const UiCounter = ({count,mixClass=[]}) => {


    return (
        <div aria-label="Количество сообщений"  className={classNames("counter-container",...mixClass)}>
            <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                <path
                    d="M80-80v-740q0-24 18-42t42-18h680q24 0 42 18t18 42v520q0 24-18 42t-42 18H240L80-80Zm134-220h606v-520H140v600l74-80Zm-74 0v-520 520Z" />
            </svg>
            <p className="counter"> { count }</p>

        </div>
    )
}

export default UiCounter;
    

    
