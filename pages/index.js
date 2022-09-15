import { useState } from 'react';
import style from "styles/home.module.css";


const HomePage = () => {
  return (
    <div className={`${style.fullscreen} align-items-center`}>
      <h1 className="display-4">Menus</h1>
      <span className="p-4 display-6">Scan a QR code To Get Started!</span>
      
      <span className="lead ">Or Enter Name</span>
      <form className="w-50 my-2">
        <div className="row mb-3 w-100 d-inline-flex justify-content-center">
          
          <div className="col-sm-5">
            <input type="text" class="form-control" id="searchInput"/>
          </div>
          
          <button className="col-sm-3 btn btn-success">Search</button>
          
        </div>
       
      </form>
    </div>
  )
};

export default HomePage;
