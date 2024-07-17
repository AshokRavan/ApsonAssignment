import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import NoteForm from './components/Notes/NoteForm';
import NoteList from './components/Notes/NoteList';
import './App.css';

const App = () => {
    return (
        <Router>
            <div className="App">
                <Navbar />
                <div className="container">
                    <Switch>
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/notes" component={NoteList} />
                        <Route exact path="/notes/new" component={NoteForm} />
                    </Switch>
                </div>
            </div>
        </Router>
    );
};

export default App;
