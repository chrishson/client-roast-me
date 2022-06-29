import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import { useAuth0 } from '@auth0/auth0-react';
import { Main } from './components/Main';
import Login from './components/Login';

function App() {
  const { isAuthenticated } = useAuth0();
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={isAuthenticated ? <Main /> : <Login />} />
      </Routes>
    </>
  );
}

export default App;
