import { Route } from "react-router-dom";
import "./Home.css"
import Cards from "../Cards/Cards";
import CreateRecipe from "../CreateRecipe/CreateRecipe";
import Filters from "../Filters/Filters";
import Nav from "../Nav/Nav";
import RecipeDetails from "../RecipeDetails/RecipeDetails";

function Home() {
  
  return (
    <div className="Home">
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

export default Home;