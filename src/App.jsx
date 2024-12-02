import './App.css';
import { Outlet } from 'react-router-dom';
import ScrollToTop from './components/General/ScrollToTop';

function App() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}

export default App;
