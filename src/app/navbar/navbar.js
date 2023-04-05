import React from "react";
import Link from "next/link"
import "./navbar.css";


function Navbar() {
  


 
  return (
    
      // <div className="tabNavbar">
      //    <p className="textLOGO "> Algorithm arena</p>
      //    <p className="textmenu">Main</p>
      //    <p className="textmenu">Member</p>
      //    <p className="textmenu">Trainer</p>
      //    <p className="textmenu">Course</p>
      //    <p className="textmenu">Rank</p>




          

         
        

    

<nav className="tabNavbar ">
  <div className="container flex flex-wrap items-center justify-between mx-auto">
       <a className="textLOGO font-Anton"> Algorithm arena</a>
  <div className="flex md:order-2">
      <a className="textmenu font-AudioWide"> username</a>
  </div>
  
  <div className=" textmenu font-AudioWide items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-cta">
    <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg  md:flex-row md:space-x-8 md:mt-0   md:border-0 md:bg-gray dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 ">
      <li>
<Link href="/rank" className=" py-2 pl-3 pr-4 text-white bg-white-700 rounded hover:bg-white-100  md:hover:bg-[#E2FEA7] md:hover:text-black md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Main</Link>
      </li>
      <li>
        <Link href="/member" className=" py-2 pl-3 pr-4 text-white bg-white-700 rounded hover:bg-white-100  md:hover:bg-[#E2FEA7] md:hover:text-black md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Member</Link>
      </li>

      <li>
<Link href="/trainer" className=" py-2 pl-3 pr-4 text-white bg-white-700 rounded hover:bg-white-100  md:hover:bg-[#E2FEA7] md:hover:text-black md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Trainer</Link>
      </li>
      <li>
<Link href="/course" className=" py-2 pl-3 pr-4 text-white bg-white-700 rounded hover:bg-white-100  md:hover:bg-[#E2FEA7] md:hover:text-black md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Course</Link>
      </li>
      <li>
<Link href="/rank" className=" py-2 pl-3 pr-4 text-white bg-white-700 rounded hover:bg-white-100  md:hover:bg-[#E2FEA7] md:hover:text-black md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Rank</Link>
      </li>
     
      {/* <li>
        <a href="#" className=" py-2 pl-3 pr-4 text-white-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Contact</a>
      </li> */}
    </ul>
  </div>
  </div>
</nav>

   
  );
}

export default Navbar;
