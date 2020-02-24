import React, { Component } from 'react';

export class AppFooter extends Component {

    render() {
        return  (
            <div className="layout-footer">
                <span className="footer-text" style={{'marginRight': '5px'}}>Anthony &</span>
                <span className="footer-text" style={{'marginLeft': '5px'}}>Mohamad & Karim Panel</span>
            </div>
        );
    }
}