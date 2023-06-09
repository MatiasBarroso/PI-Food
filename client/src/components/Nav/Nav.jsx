import React from 'react'
import SearchBar from '../SearchBar/SearchBar';
import "./Nav.css";
import logoNav from "../../assets/lp/1x/Recurso2.png"

const Nav = () => {
  return (
    <div className='container-nav bg-white'>
        <img className='nav-title' src={logoNav} alt="img-nav"/>
          <SearchBar />
    </div>
  )
}

export default Nav

// import { Navbar } from "@nextui-org/react";

// export default function App() {
//   return (
//       <Navbar variant="sticky" >
//         <Navbar.Brand>
//           <img src={logoNav} alt='eatime-logo' width={'100px'}/>
//         </Navbar.Brand>
//         <Navbar.Content hideIn="xs" variant="underline">
//           <SearchBar />
//           {/* <Navbar.Link href="#">Filter </Navbar.Link>
//           <Navbar.Link isActive href="#">Customers</Navbar.Link>
//           <Navbar.Link href="#">Pricing</Navbar.Link>
//           <Navbar.Link href="#">Company</Navbar.Link> */}
//         </Navbar.Content>
//       </Navbar>
//   )
// }
