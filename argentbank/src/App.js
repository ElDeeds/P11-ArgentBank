import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages/index';
import SignIn from './pages/signIn';
import User from './pages/user';

import { Provider } from 'react-redux';
import store  from './redux/store'


function App() {
  return (
    <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/Sign-In" element={<SignIn />} />
        <Route path="/User" element={<User />} />
      </Routes>
    </Router>
    </Provider>
  );
}

export default App;