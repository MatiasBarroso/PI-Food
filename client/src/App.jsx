import { Route } from "react-router-dom";
import "./App.css";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllRecipes, getDiets } from "./redux/actions";
import Home from "./components/Home/Home";
import LandingPage from "./components/LandingPage/LandingPage";
import RecipeDetails from "./components/RecipeDetails/RecipeDetails";
import CreateRecipe from "./components/CreateRecipe/CreateRecipe";
import Footer from "./components/Footer/Footer";
import axios from "axios";
axios.defaults.baseURL = 'pi-food-production-ff23.up.railway.app';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllRecipes());
    dispatch(getDiets());
  }, [dispatch]);

  return (
    <div className="App">
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/recipes" component={Home} />
      <Route exact path="/recipes/:id" component={RecipeDetails} />
      <Route exact path="/recipe/create" component={CreateRecipe} />
      <Footer/>
    </div>
  );
}

export default App;
