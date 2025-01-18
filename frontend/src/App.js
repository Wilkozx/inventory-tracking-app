import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import Navbar from './components/navbar';

import Orders from './pages/Orders/Orders.tsx';
import AddOrders from './pages/Orders/AddOrders.tsx';

const App = () => {
    return (
        <>
        <Navbar></Navbar>
        <Router>
            <Routes>
                <Route path="/orders" element={<Orders/>}></Route>
                <Route path="/orders/add" element={<AddOrders/>}></Route>
                <Route path="/orders/:id" element={<h1>ID PAGE</h1>}></Route>
                <Route path="/items" element={<h1>tester</h1>} />
                <Route path="/" element={<><h1>Home Page</h1><Link to="/orders">test</Link></>} />
                <Route path="*" element={<h1>404 page not found</h1>} />
            </Routes>
        </Router>
        </>
    );
};

export default App;
