import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Form from './components/Form';
import Submissions from './pages/Submissions';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Form />} />
                    <Route path="/submission" element={<Submissions />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
