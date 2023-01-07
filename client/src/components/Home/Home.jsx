

import "./Home.css"
import Nav from "../Nav/Nav"
import Cards from "../Cards/Cards";
import Filters from "../Filters/Filters";
import Footer from "../Footer/Footer"
function Home() {


  return (
    <div className="Home">
      <Nav />
      <Filters />
      <div className="container-main-cards">
        <Cards /> 
      </div>
      <Footer/>
    </div>
  );
}

export default Home;