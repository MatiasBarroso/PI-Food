import React, { useEffect, useState } from 'react'
import SearchBar from '../SearchBar/SearchBar'
import logoNav from '../../assets/lp/1x/Recurso2.png'
import './navMobile.css'
import { Link } from 'react-router-dom'

const NavMobile = () => {

    const [scrollPosition, setPosition] = useState(0);
    const [isActive, setActive] = useState(false);

    const handleToggle = () => {
      setActive(!isActive);
    };
      

    const handleScroll = () => {
      setPosition(window.scrollY);
    };
    useEffect(() => {
      handleScroll();
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);
  

  return (
    <div>
        <div className={`container-nav-mobile bg-white ${ scrollPosition === 0 ? '' : ' nav-scroll' }`}>
            <div className='cont-logo-nav'>
                <img className='nav-title' src={logoNav} alt="img-nav"/>
            </div>
            <button className='btn-menu-mobile' onClick={handleToggle}>
            { isActive 
              ? <svg viewBox="0 0 24 24" height="25px" width="25px" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#FFC400"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>Close</title> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Close"> <rect id="Rectangle" fill-rule="nonzero" x="0" y="0" width="24" height="24"> </rect> <line x1="16.9999" y1="7" x2="7.00001" y2="16.9999" id="Path" stroke="#ffc400" stroke-width="2" stroke-linecap="round"> </line> <line x1="7.00006" y1="7" x2="17" y2="16.9999" id="Path" stroke="#FFC400" stroke-width="2" stroke-linecap="round"> </line> </g> </g> </g></svg>
              : <svg fill="#FFC400" height="20px" width="20px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 297 297" xml:space="preserve"  stroke="#000000"><g id="SVGRepo_bgCarrier" stroke-width="1"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <g> <path d="M280.214,39.211H16.786C7.531,39.211,0,46.742,0,55.997v24.335c0,9.256,7.531,16.787,16.786,16.787h263.428 c9.255,0,16.786-7.531,16.786-16.787V55.997C297,46.742,289.469,39.211,280.214,39.211z"></path> <path d="M280.214,119.546H16.786C7.531,119.546,0,127.077,0,136.332v24.336c0,9.255,7.531,16.786,16.786,16.786h263.428 c9.255,0,16.786-7.531,16.786-16.786v-24.336C297,127.077,289.469,119.546,280.214,119.546z"></path> <path d="M280.214,199.881H16.786C7.531,199.881,0,207.411,0,216.668v24.335c0,9.255,7.531,16.786,16.786,16.786h263.428 c9.255,0,16.786-7.531,16.786-16.786v-24.335C297,207.411,289.469,199.881,280.214,199.881z"></path> </g> </g> </g> </g></svg>}
            </button>
            
        </div>
        <div className={`cont-main-mobile ${!isActive ? 'cont-close' : ' '}`}>
          <div className={`container-menu-mobile ${isActive ? 'menu-on' : ''}`} >
            <SearchBar />
            <div className='cont-links-mobile'>
              <Link to='/recipes' className='link-menu-mobile'>Home</Link>
              <Link to='/create' className='link-menu-mobile'>Create</Link>
            </div>
          </div>
        </div>
    </div>
  )
}

export default NavMobile