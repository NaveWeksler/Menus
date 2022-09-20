import { useState } from 'react';



const HomePage = () => {
  return (
    <div className="fullscreen align-items-center">
      <h1 className="display-4">Menus</h1>
      <span className="p-4 display-6">Scan a QR code To Get Started!</span>
      
      <span className="lead ">Or Enter Name</span>
      <form className="w-50 my-2">
        <div className="row mb-3 w-100 d-inline-flex justify-content-center">
          
          <div className="col-sm-5">
            <input type="text" className="form-control" id="searchInput"/>
          </div>
          
          <button className="col-sm-3 btn btn-success">Search</button>
          
        </div>
       
      </form>
    </div>
  )
};

export default HomePage;
