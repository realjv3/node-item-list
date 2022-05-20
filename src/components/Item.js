import React from 'react';
import {FaTrash, FaEdit} from "react-icons/fa";

export default (props) => {
    return (
        <li className={'item'} style={itemStyle}>
            <div><b>{props.item.name}</b></div>
            <div style={{flexGrow: 2}}>{props.item.description}</div>
            <div>{props.item.code}</div>
            <div>{props.item.status}</div>
            <div onClick={() => props.show(props.item.id)}><FaEdit/></div>
            <div onClick={() => props.del(props.item.id)}><FaTrash/></div>
        </li>
    );
}


const itemStyle = {
    border: '1px solid darkgray',
    width: '500px',
    display: 'flex',
    justifyItems: 'space-between',
};