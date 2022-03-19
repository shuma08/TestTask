import ProductPage from "./pages/ProductPage";
import './App.css';
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <ProductPage />
      </div>
    </Provider>
    
  );
}

export default App;
