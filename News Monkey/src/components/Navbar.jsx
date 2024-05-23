import React, { Component } from 'react';
// import logo from './logo.png'; // Assuming logo.png is your logo file

const Navbar = class extends Component {
  render() {
    return (
      <nav className="bg-gray-800 p-4">
        <div className="container flex-row mx-auto flex items-center justify-between">
          <div className="flex items-center">
            {/* <img className="h-8 w-8 mr-2" src={logo} alt="Logo" /> */}
            <span className="text-white text-lg font-semibold">News Monkey</span>
          </div>
          <div>
            <div className="flex space-x-4">
              <div><a className="text-white hover:text-gray-300" href="/">Home</a></div>
              <div><a className="text-white hover:text-gray-300" href="/about">About</a></div>
              <div><a className="text-white hover:text-gray-300" href="/contact">Contact</a></div>
              {/* Add more navigation links here */}
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
