import React from 'react';
import Logo from "../img/logo-200x200.png"

const HEADER = () => {
    return(
        <>
            <div className="header"> 
                <img height="100%" id="website_logo" src={Logo} alt="money_flow_dashboard_logo"/>
            </div> 
        </>
    )
}

export default HEADER;