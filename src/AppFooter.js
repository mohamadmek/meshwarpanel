import React, { Component } from 'react';

export class AppFooter extends Component {

    render() {
        return  (
            <div style={{position: "relative", bottom: 0}} className="layout-footer">
                <span className="footer-text" style={{'marginRight': '5px'}}>Anthony & Mohamad & Karim</span>
                
                <span className="footer-text" style={{'marginLeft': '5px'}}></span>
            </div>
        );
    }
}