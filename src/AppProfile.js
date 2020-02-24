import React, { Component } from 'react';
import classNames from 'classnames';

export class AppProfile extends Component {

    constructor() {
        super();
        this.state = {
            expanded: false
        };
        this.onClick = this.onClick.bind(this);
    }

    onClick(event) {
        this.setState({expanded: !this.state.expanded});
        event.preventDefault();
    }

    render() {
        return  (
            <div className="layout-profile">
                <div>
                    <img src="assets/layout/images/profile.png" alt="" />
                </div>
                <button className="p-link layout-profile-link" onClick={this.onClick}>
<<<<<<< HEAD
                    <span className="username">Claire Williams</span>
=======
                    <span className="username">Maguy Swiss</span>
>>>>>>> f0fd67c3675dc702acf7497714efb5d1373857bb
                    <i className="pi pi-fw pi-cog"/>
                </button>
                <ul className={classNames({'layout-profile-expanded': this.state.expanded})}>
                    <li><button className="p-link"><i className="pi pi-fw pi-user"/><span>Account</span></button></li>
                    <li><button className="p-link"><i className="pi pi-fw pi-inbox"/><span>Notifications</span><span className="menuitem-badge">2</span></button></li>
                    <li><button className="p-link"><i className="pi pi-fw pi-power-off"/><span>Logout</span></button></li>
                </ul>
            </div>
        );
    }
}