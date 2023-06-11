import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Index from './components/Header';
import routes from './route.ts';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Index />
        <Routes>
          {routes.map((route, i) => (
            <Route path={route.path} key={i} element={route.element()} />
          ))}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
