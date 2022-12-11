import { Route } from "react-router-dom";
import "./App.css";
import Cards from "./components/Cards/Cards";
import CreateRecipe from "./components/CreateRecipe/CreateRecipe";
import Filters from "./components/Filters/Filters";
import Nav from "./components/Nav/Nav";
import RecipeDetails from "./components/RecipeDetails/RecipeDetails";

function App() {
  return (
    <div className="App">
      <Nav />
      <div className="container-main-cards">
        <Filters />
        <Cards />
      </div>
      <Route path="/recipes/:id">
        <RecipeDetails />
      </Route>
      <Route path="/recipe">
        <CreateRecipe />
      </Route>
    </div>
  );
}

export default App;
