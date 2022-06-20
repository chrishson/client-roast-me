
import './App.css';
import { Routes } from 'react-router-dom';
import NavBar from './components/NavBar';

function App() {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <Routes>
        {/* <Route path="/" exact component={Home} />
        <AuthenticatedRoute path="/profile" component={Profile} />
        <AuthenticatedRoute path="/people" component={People} /> */}
      </Routes>
    </>
  );
}

export default App;
