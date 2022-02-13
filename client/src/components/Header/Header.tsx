
import { Menu } from "antd";
import React from "react";
import AuthService from "../../core/services/auth";
import LoginPage from "../../pages/Login/Login";
import "./Header.scss";

const Header = (props: any) => {

    const authService: AuthService = new AuthService();

    const handleClickMenu = (event: any) => {
        if(event.key === "logout") {
            authService.logout();
            props.history.push(LoginPage.url);
            return;
        }
        props.history.push(event.key);
    }

    return (
        <div id="header">
            <Menu onClick={handleClickMenu} mode="horizontal">
                <Menu.Item key="/">
                    Movies
                </Menu.Item>
                <Menu.Item key="/actors">
                    Actors
                </Menu.Item>
                <Menu.SubMenu key="my-profile" title="My Profile">
                    <Menu.Item key="/profile">Profile</Menu.Item>
                    <Menu.Item key="logout">Log out</Menu.Item>
                </Menu.SubMenu>
            </Menu>
        </div>
    )
}

export default Header;