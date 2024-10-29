import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TandaForm from './components/TandaForm';
import Submissions from './pages/Submissions';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<TandaForm />} />
                    <Route path="/submission" element={<Submissions />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
