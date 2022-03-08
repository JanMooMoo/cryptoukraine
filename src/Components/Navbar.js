import React, { Component } from 'react';
import Artist from '../artist.jpg';

class Navbar extends Component {
    render() {
        return (
            <div className='navbar-border'>
                 <div className='navbar'>
                 <img className="navLogo" src={Artist} border={1} alt="Ditto logo" ></img>
                
               </div>
            </div>
            
        );
    }
}

export default Navbar;