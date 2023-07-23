
import  './UiSnackBar.scss';

import classNames from 'classnames';

const UiSnackBar = ({ message = '', visible = false, err = false, mixClass=[] }) => {
       

        
        return (

            <div className={classNames('snackbar-container', {
                'snackbar-container--negative':err,
                'snackbar-container--positive':!err,
            },...mixClass)}>
                <p className="snackbar-message">{ message }</p>
            </div>
        )
    
    
}

export default UiSnackBar