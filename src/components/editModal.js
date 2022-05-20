import React from 'react';

export default (props) => {

    return (
        <div id="modal">

            <h1>Edit Item</h1>

            <div id="inputs">
                <label>
                    Name
                    <input name="name" value={props.item.name} onChange={props.handleChange}/>
                </label>

                <label>
                    Description
                    <input name="description" value={props.item.description} onChange={props.handleChange}/>
                </label>

                <label>
                    Code
                    <input name="code" value={props.item.code} onChange={props.handleChange}/>
                </label>

                <label>
                    Status
                    <select name="status" value={props.item.status} onChange={props.handleChange}>
                        <option>active</option>
                        <option>inactive</option>
                    </select>
                </label>

            </div>

            <button onClick={() => props.close(() => false)}>Close</button>
            <button disabled={!props.valid} onClick={props.handleSave}>Save</button>
        </div>
    );
}