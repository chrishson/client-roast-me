import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Login from './components/Login';
import { useAuth0 } from '@auth0/auth0-react';
import { Main } from './components/Main';

function App() {
  const { isAuthenticated } = useAuth0();
  return (
    <>
      <header>
        <NavBar />
      </header>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Main /> : <Login />} />
      </Routes>
    </>
  );
}

export default App;
