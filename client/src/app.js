import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './components/Signin';
import SignUp from './components/Signup';
import Header from './components/Header';
import Search from './components/Search';
import ReviewForm from './components/ReviewForm';
import ReviewList from './components/ReviewList';
import { UserProvider } from './components/UserContext';

function App() {
  return (
    <UserProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" exact element={ReviewList} />
          <Route path="/reviews" element={ReviewList} />
          <Route path="/submit" element={ReviewForm} />
          <Route path="/search" element={Search} />
          <Route path="/login" element={SignIn} />
          <Route path="/signup" element={SignUp} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;