import './App.css';
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header';
import Home from './components/Home';
import Reviews from './components/Reviews';
import CategoryNavBar from './components/CategoryNavBar';
import SingleReview from './components/SingleReview';

function App() {
  return (
    <div className="App">
      <Header />
      <CategoryNavBar />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/reviews" element={<Reviews />}/>
        <Route path="/reviews/:review_id" element={<SingleReview />}/>
      </Routes>
    </div>
  );
}

export default App;
