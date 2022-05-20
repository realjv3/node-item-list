import React, { useEffect, useState } from 'react';
import Item from "./Item";
import EditModal from "./editModal";

const item = {
    name: '',
    description: '',
    code: '',
    status: 'active',
};

export default () => {

    const [valid, setValid] = useState(false);
    const [items, setItems] = useState([]);
    const [editItem, setEditItem] = useState(item);
    const [editing, setEditing] = useState(false);

    useEffect(() => {refresh()}, []);
    useEffect(() => {validate()}, [editItem]);

    const handleChange = event => {

        setEditItem(prevState => {

            const state = {...prevState};
            state[event.target.name] = event.target.value;

            return state;
        });
    };

    const validate = () => {

        setValid(() => !!(editItem.name.length && editItem.description.length && editItem.code.length));
    }

    const refresh = async () => {

        const
            resp = await fetch('/api/items'),
            json = await resp.json();

        if (resp.ok) {
            setItems(() => json);
            setEditItem(() => item);
        }
    }

    const create = async () => {

        const
            resp = await fetch('/api/item', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(editItem)
            }),
            json = await resp.json();

        if (resp.ok && json.itemID) {
            refresh();
        } else {
            alert('Error adding item.')
        }
    }

    const update = async () => {

        const
            resp = await fetch(`/api/item/${editItem.id}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(editItem)
            }),
            json = await resp.json();

        if (resp.ok && json.affectedRows) {
            refresh();
            setEditing(() => false)
        } else {
            alert('Error updating item.')
        }
    }

    const remove = async (itemID) => {

        if (confirm('Are you sure you want to permanently delete this editItem?')) {
            const
                resp = await fetch(`/api/item/${itemID}`, {method: 'DELETE'}),
                json = await resp.json();

            if (resp.ok && json.affectedRows) {
                refresh();
            } else {
                alert('Error removing item.')
            }
        }
    }

    const showEditModal = (itemID) => {

        setEditItem(() => items.find(item => item.id === itemID));
        setEditing(() => true);
    };

    const closeEditModal = () => {

        setEditItem(() => item);
        setEditing(() => false);
    };

    const listItems = items.map( item => (
        <Item
            item={item}
            key={item.id}
            del={remove}
            show={showEditModal}
        />)
    );

    let editModal;

    if (editing) {
        editModal = (<EditModal
            item={editItem}
            handleChange={handleChange}
            handleSave={update}
            close={closeEditModal}
            valid={valid}
        />);
    } else {
        editModal = '';
    }

    return (
        <div>

            {editModal}

            <h1>Items</h1>

            <div id="inputs">
                <label>
                    Name
                    <input name="name" value={editItem.name} onChange={handleChange}/>
                </label>

                <label>
                    Description
                    <input name="description" value={editItem.description} onChange={handleChange}/>
                </label>

                <label>
                    Code
                    <input name="code" value={editItem.code} onChange={handleChange}/>
                </label>

                <label>
                    Status
                    <select name="status" value={editItem.status} onChange={handleChange}>
                        <option>active</option>
                        <option>inactive</option>
                    </select>
                </label>

            </div>
            <button disabled={!valid} onClick={create}>Add Item</button>

            <ul id="items">
                {listItems}
            </ul>
        </div>
    );
}
