import React, { Component } from 'react';
import Auth from './components/Auth';
import Logout from './components/Logout';
import Registrations from './components/Registrations';
import classNames from 'classnames';
import { AppTopbar } from './AppTopbar';
import { AppFooter } from './AppFooter';
import { AppMenu } from './AppMenu';
import { AppProfile } from './AppProfile';
import { Route, withRouter } from 'react-router-dom';
import { Dashboard } from './components/Dashboard';
import { FormsDemo } from './components/FormsDemo';
import { SampleDemo } from './components/SampleDemo';
import { DataDemo } from './components/DataDemo';
import { PanelsDemo } from './components/PanelsDemo';
import { OverlaysDemo } from './components/OverlaysDemo';
import { MenusDemo } from './components/MenusDemo';
import { MessagesDemo } from './components/MessagesDemo';
import { ChartsDemo } from './components/ChartsDemo';
import { MiscDemo } from './components/MiscDemo';
import { EmptyPage } from './components/EmptyPage';
import { Documentation } from "./components/Documentation";
import Gallery from "./components/Gallery"
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';
import './layout/layout.scss';
import './App.scss';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            layoutMode: "static",
            layoutColorMode: "dark",
            staticMenuInactive: false,
            overlayMenuActive: false,
            mobileMenuActive: false
        };

        this.onWrapperClick = this.onWrapperClick.bind(this);
        this.onToggleMenu = this.onToggleMenu.bind(this);
        this.onSidebarClick = this.onSidebarClick.bind(this);
        this.onMenuItemClick = this.onMenuItemClick.bind(this);
        this.createMenu();
    }

    onWrapperClick(event) {
        if (!this.menuClick) {
            this.setState({
                overlayMenuActive: false,
                mobileMenuActive: false
            });
        }

        this.menuClick = false;
    }


    onToggleMenu(event) {
        this.menuClick = true;

        if (this.isDesktop()) {
            if (this.state.layoutMode === "overlay") {
                this.setState({
                    overlayMenuActive: !this.state.overlayMenuActive
                });
            } else if (this.state.layoutMode === "static") {
                this.setState({
                    staticMenuInactive: !this.state.staticMenuInactive
                });
            }
        } else {
            const mobileMenuActive = this.state.mobileMenuActive;
            this.setState({
                mobileMenuActive: !mobileMenuActive
            });
        }
        event.preventDefault();
    }


    onSidebarClick(event) {
        this.menuClick = true;
    }

    onMenuItemClick(event) {
        if (!event.item.items) {
            this.setState({
                overlayMenuActive: false,
                mobileMenuActive: false
            })
        }
    }



    createMenu() {
        this.menu = [
            { label: 'Dashboard', icon: 'pi pi-fw pi-home', command: () => { window.location = '#/dashboard' } },
            {
                label: 'Events', icon: 'pi pi-fw pi-home', command: () => { window.location = '#/data' },
            }, {
                label: 'Registrations', icon: 'pi pi-fw pi-user', command: () => { window.location = '#/registrations' }
            },
            {
                label: 'Gallery', icon: 'pi pi-fw pi-star', command: () => { window.location = '#/gallery' },
            },
            {
                label: 'Logout', icon: 'pi pi-fw pi-quit', command: () => { window.location = '#/logout' }
            }
        ];
    }

    addClass(element, className) {
        if (element.classList)
            element.classList.add(className);
        else
            element.className += ' ' + className;
    }

    removeClass(element, className) {
        if (element.classList)
            element.classList.remove(className);
        else
            element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }

    isDesktop() {
        return window.innerWidth > 1024;
    }

    componentDidUpdate() {
        if (this.state.mobileMenuActive)
            this.addClass(document.body, 'body-overflow-hidden');
        else
            this.removeClass(document.body, 'body-overflow-hidden');
    }


    render() {
        const logo = this.state.layoutColorMode === 'dark' ? 'assets/layout/images/logo-white.svg' : 'assets/layout/images/logo.svg';
        const wrapperClass = classNames("layout-wrapper", {
            "layout-overlay": this.state.layoutMode === "overlay",
            "layout-static": this.state.layoutMode === "static",
            "layout-static-sidebar-inactive":
                this.state.staticMenuInactive && this.state.layoutMode === "static",
            "layout-overlay-sidebar-active":
                this.state.overlayMenuActive && this.state.layoutMode === "overlay",
            "layout-mobile-sidebar-active": this.state.mobileMenuActive
        });

        const sidebarClassName = classNames("layout-sidebar", {
            "layout-sidebar-dark": this.state.layoutColorMode === "dark",
            "layout-sidebar-light": this.state.layoutColorMode === "light"
        });


        return (
            <div className={wrapperClass} onClick={this.onWrapperClick}>
                <AppTopbar onToggleMenu={this.onToggleMenu} {...this.props} />

                <div ref={(el) => this.sidebar = el} className={sidebarClassName} onClick={this.onSidebarClick}>
                    <div className="layout-logo" style={{ color: "#fff" }}>
                        <h1>Meshwar</h1>
                    </div>
                    <AppProfile {...this.props} />
                    <AppMenu model={this.menu} onMenuItemClick={this.onMenuItemClick} />
                </div>

                <div className="layout-main">
                    <Route path="/" exact component={Auth} />
                    <Route path="/dashboard" component={Dashboard} />
                    <Route path="/data" component={DataDemo} />
                    <Route path="/registrations" component={Registrations} />
                    <Route path="/gallery" component={Gallery} />
                </div>

                <AppFooter />

                <div className="layout-mask"></div>
            </div>
        );
    }
}

export default withRouter(App);