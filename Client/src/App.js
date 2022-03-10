import * as React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Signup from './Pages/Signup/SignupContainer';
import { withAdminRole } from './Components/HOC/withRoles';
import Restricted from './Pages/Restricted/Restricted';
function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route exact path='/signup' element={<Signup />} />
        <Route exact path='/restricted' element={<Restricted />} />
      </Routes>
    </div>
  );
}

function Home() {
  const handleCredentialResponse = (response) => {
    // Here we can do whatever process with the response we want
    // Note that response.credential is a JWT ID token
    console.log('Encoded JWT ID token: ' + response.credential);
  };
  return (
    <>
      {/* <div
        id='g_id_onload'
        data-client_id='408504121475-fh32r051n4sa7bnborhc3u7680ltou8s.apps.googleusercontent.com'
        data-login_uri='http://localhost:4001/'
        data-callback={handleCredentialResponse}
        data-auto_select='true'
        data-your_own_param_1_to_login='aanish'
        data-your_own_param_2_to_login='any_value'
      ></div> */}
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
