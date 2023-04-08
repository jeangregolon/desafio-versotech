import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import PokemonList from './components/list';
import PokemonDetail from './components/detail';
import Header from './components/header';
import { store } from './store/storeConfig';
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<PokemonList />} />
          <Route path="/pokemon/:name" element={<PokemonDetail />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
