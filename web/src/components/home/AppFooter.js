import React from 'react';

const AppFooter = () => {

    return (
        <div className="layout-footer" >
            <div className="p-grid">
                <div className="p-col">
                    <img src="assets/layout/images/logo-white.svg" alt="sapphire-layout" height="10"/>
                    <div className="layout-footer-appname">Squer Products</div>
                </div>
                <div className="p-col p-col-align-right">
                    <span>All Rights Reserved</span>
                </div>
            </div>
        </div>
    )
}

export default AppFooter;
