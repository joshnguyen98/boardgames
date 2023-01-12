import './App.css';
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header';
import Home from './components/Home';
import Reviews from './components/Reviews';
import SingleReview from './components/SingleReview';
import Error from './components/Error';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/reviews" element={<Reviews />}/>
        <Route path="/reviews/:review_id" element={<SingleReview />}/>
        <Route path="/*" element={<Error />}/>
      </Routes>
    </div>
  );
}

export default App;
