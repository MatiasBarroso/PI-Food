import { useEffect, useState } from "react";
import "./Home.css"
import Cards from "../Cards/Cards";
import Nav from "../Nav/Nav";
import NavMobile from "../NavMobile";
import Filters from "../Filters/Filters";
import Footer from "../Footer/Footer";
import Pagination from "../Pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { getAllRecipes } from "../../redux/actions";

function Home() {

  const [screenWidth, setScreenWidth] = useState(0);
  const [page, setPage] = useState(1);
  let limit = screenWidth < 730 ? 5 : 12;

  const dispatch = useDispatch()
  const state = useSelector(state => state)
  const max = Math.round(state.recipes.length / limit);
  const start = (page - 1) * limit;
  const end = (page - 1) * limit + limit;


  const handleScroll = () => {
    setScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="Home">
        <div className="cont-nav-fil">
          {screenWidth > 430 ? <Nav /> : <NavMobile />}
          <Filters />
          <Pagination page={page} setPage={setPage} max={max} start={start} end={end} limit={limit}/>
        </div>
        <div className="container-main-cards">
          <Cards page={page} start={start} end={end}/> 
        </div>
      <Footer />
    </div>
  );
}

export default Home;