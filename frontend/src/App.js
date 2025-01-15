import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import Navbar from './components/navbar';
import OrdersPage from './pages/OrdersPage.tsx';

const App = () => {
    return (
        <>
        <Navbar></Navbar>
        <Router>
            <Routes>
                <Route path="/orders" element={<OrdersPage></OrdersPage>}></Route>
                <Route path="/items" element={<h1>tester</h1>} />
                <Route path="/" element={<><h1>Home Page</h1><Link to="/orders">test</Link></>} />
                <Route path="*" element={<h1>404 page not found</h1>} />
            </Routes>
        </Router>
        </>
    );
};

export default App;
