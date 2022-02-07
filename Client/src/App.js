import * as React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Signup from './Components/Auth/Signup/SignupContainer';
function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </div>
  );
}

function Home() {
  return (
    <>
      <main>
        <h2>Welcome to the homepage!</h2>
        <p>You can do this, I believe in you.</p>
      </main>
      <nav>
        <Link to='/about'>About</Link>
      </nav>
    </>
  );
}

export default App;
