import React from "react";
import { Link } from "react-router-dom";

import SidebarItem from "./SidebarItem";

const MENU_SECTIONS = {
    header: {
        logoPath: "/storage/img/laravel-icon.svg",
        title: "Dashbord", 
        href: "/manager/dashboard", 
        itemClass: "brand-link" 
    },
    items: [
        {
            title: "Customers", 
            href: "", 
            itemClass: "nav-header",
            icon: [], 
            iconClass: "", 
            badge: {
                badgeClass: "",
            },
        },
        {
            title: "Users", 
            href: "/manager/users", 
            itemClass: "nav-link", 
            icon: ["fas", "users"], 
            iconClass: "nav-icon", 
            badge: {
                badgeClass: "right badge bg-purple",
            },
        },
        {
            title: "Business", 
            href: "/manager/business", 
            itemClass: "nav-link", 
            icon: ["fas", "user-tie"], 
            iconClass: "nav-icon", 
            badge: {
                badgeClass: "right badge bg-purple",
            },
        },
        {
            title: "Content management", 
            href: "", 
            itemClass: "nav-header", 
            icon: [], 
            iconClass: "", 
            badge: {
                badgeClass: "",
            },
        },
        {
            title: "Listings", 
            href: "/manager/listings", 
            itemClass: "nav-link", 
            icon: ["fas", "ad"], 
            iconClass: "nav-icon",  
            badge: {
                badgeClass: "right badge bg-purple",
            },
        },
        {
            title: "Banners", 
            href: "/manager/banners", 
            itemClass: "nav-link", 
            icon: ["fas", "address-book"], 
            iconClass: "nav-icon",  
            badge: {
                badgeClass: "right badge bg-purple",
            },
        },
        {
            title: "Deals", 
            href: "/manager/deals", 
            itemClass: "nav-link", 
            icon: ["fas", "handshake"], 
            iconClass: "nav-icon",  
            badge: {
                badgeClass: "right badge bg-purple",
            },
        },
        {
            title: "Events", 
            href: "/manager/events", 
            itemClass: "nav-link", 
            icon: ["fas", "calendar"], 
            iconClass: "nav-icon",  
            badge: {
                badgeClass: "right badge bg-purple",
            },
        },
        {
            title: "Website management",
            href: "", 
            itemClass: "nav-header", 
            icon: [], 
            iconClass: "",  
            badge: {
                badgeClass: "",
            },
        },
        {
            title: "Pages", 
            href: "/manager/pages", 
            itemClass: "nav-link",
            icon: ["fas", "pen-fancy"], 
            iconClass: "nav-icon", 
            badge: {
                badgeClass: "right badge bg-purple",
            },
        },
        {
            title: "Itinerary info", 
            href: "/manager/itenerary", 
            itemClass: "nav-link", 
            icon: ["fas", "walking"], 
            iconClass: "nav-icon", 
            badge: {
                badgeClass: "right badge bg-purple",
            },
        },
        {
            title: "User settings", 
            href: "/manager/user-settings", 
            itemClass: "nav-link", 
            icon: ["fas", "user-cog"], 
            iconClass: "nav-icon", 
            badge: {
                badgeClass: "right badge bg-purple",
            },
        },
        {
            title: "Policies", 
            href: "/manager/policies", 
            itemClass: "nav-link", 
            icon: ["fas", "gavel"], 
            iconClass: "nav-icon", 
            badge: {
                badgeClass: "right badge bg-purple",
            },
        },
    ],
};

class SideBar extends React.Component
{
    render() {
        return (
            <aside className="main-sidebar sidebar-dark-primary elevation-4">
                <Link to={ MENU_SECTIONS.header.href } className={ MENU_SECTIONS.header.itemClass }>
                    <img 
                        src={ MENU_SECTIONS.header.logoPath } 
                        alt="Dashboard Logo" 
                        className="brand-image img-circle elevation-3"
                    />
                    <span className="brand-text font-weight-light">
                        { MENU_SECTIONS.header.title }
                    </span>
                </Link>
                <div className="sidebar">
                    <nav className="mt-2">
                        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                            {
                                MENU_SECTIONS.items.map((value, index) => (
                                    <SidebarItem 
                                        key={ index } 
                                        current={ value } />
                                ))
                            }
                        </ul>
                    </nav>
                </div>
            </aside>
        );
    }
}

export default SideBar;