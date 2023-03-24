import './App.css';
import { BookProvider } from './Context/BookContext';
import { AppRoutes } from './routes/AppRoutes';

function App() {
  return (
    <div className="App">
      <BookProvider>
        <AppRoutes/>
      </BookProvider>
    </div>
  );
}

export default App;
