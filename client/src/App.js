import './App.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Home from './pages/Home';
import Card from './pages/CardEvents';
import Details from './pages/Details';
import Payment from './pages/payement';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      
    <Route path="/" element={<Home />   } />
       <Route path="/card" element={ <Card />  } />
       <Route path="/:id" element={<Details />} />
       <Route path="/Payment/:id" element={<Payment />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
