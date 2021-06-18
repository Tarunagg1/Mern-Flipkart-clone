import React from 'react'
import './index.css';

export default function Card(props) {
    return (
        <div className="card"
            {...props}
            style={props.style}
        >
            <div className="cardheader">
                {
                    props.headerLeft && <div>{props.headerLeft}</div>
                }
                {
                    props.headerRight && props.headerRight
                }
                
            </div>
            {props.children}
        </div>
    )
}
