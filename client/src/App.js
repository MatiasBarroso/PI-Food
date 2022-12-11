import "./App.css";
import Cards from "./components/Cards/Cards";
import Filters from "./components/Filters/Filters";
import Nav from "./components/Nav/Nav";

function App() {
  return (
    <div className="App">
      <Nav />
      <div className="container-main-cards">
        <Filters />
        <Cards />
      </div>
    </div>
  );
}

export default App;
