import React from 'react';
import './UiSwitch.scss';

const UiSwitch = ({ check, id, switchValue }) => {

    return (
        <label htmlFor={id} onChange={() => switchValue()} className="switch" >
            <input id={id} defaultChecked={check} aria-label="переключатель онлайн режима" className="switch__btn" type="checkbox" />
            <span className="switch__slider"></span>
        </label>
    )
}

export default UiSwitch ;



