import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import PokemonList from './components/pokemonList';
import PokemonDetail from './components/pokemonDetail';
import Header from './components/header';

function App() {
  return (
    <>
    <Header/>
    <Router>
      <Routes>
        <Route exact path="/" element={<PokemonList/>} />
        <Route path="/pokemon/:name" element={<PokemonDetail/>} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
