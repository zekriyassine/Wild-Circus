import React from 'react';
import './index.css'
import cirqueImage from '../../../src/assets/img/cirque.jpeg'

const Header = ()=>(
<React.Fragment>
    <div className="container-header">
        <ul className="list-navbar">
            <li className="item-navbar">Performances</li>
            <li className="item-navbar">Prices</li>
            <li className="item-navbar">About us</li>
            <li className="item-navbar">Comments</li>
            <li className="item-navbar">Contact</li>
        </ul>
    </div>
    <div className="banner-image" style={{backgroundImage: `url(${cirqueImage})`}}>

    </div>
    </React.Fragment>
    
)

export default Header;