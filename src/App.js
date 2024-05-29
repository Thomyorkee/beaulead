import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => {

    return (
        <React.Fragment>
            <div>TEST</div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<div className='main'><p>page1</p></div>} />
                    <Route path="/login" element={<div className='main'><p>page2</p></div>} />
                </Routes>
            </BrowserRouter>
        </React.Fragment>
    );
};

export default App;