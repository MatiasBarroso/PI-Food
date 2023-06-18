import "./Home.css"
import Cards from "../Cards/Cards";
import Nav from "../Nav/Nav";
import Filters from "../Filters/Filters";

function Home() {


  return (
    <div className="Home">
       <div className="cont-nav-fil">
          <Nav />
          <Filters />
        </div>
        <div className="container-main-cards">
          <Cards /> 
        </div>
    </div>
  );
}

export default Home;