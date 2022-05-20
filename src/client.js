import React from 'react';
import * as ReactDOM from 'react-dom/client';
import Items from "./components/Items";

const items = ReactDOM.createRoot(document.getElementById('container'));
items.render(<Items />)