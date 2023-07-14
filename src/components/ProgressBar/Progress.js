import React from 'react';
import './progress.css';

const Progress = ({percentage}) => {
    const [style, setStyle] = React.useState({});

    
    setTimeout(() => {
        const newStyle = {
            opacity: 1,
            width: percentage,
        }
        setStyle(newStyle);
    }, 200);

    return (
            <div className="progress" >
                <div className="progress-done " style={style}>
                 
                </div>
            </div>
    )
}


export default Progress