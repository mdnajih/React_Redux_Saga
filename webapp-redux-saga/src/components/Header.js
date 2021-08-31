import React, {useState} from 'react'
import {NavLink} from 'react-router-dom'
import {MenuList} from "./MenuList";
import "./NavBar.css"

function Header(){
        // <Container>
        //     <Navbar expand="lg" variant="dark" bg="dark">
        //     <Container>
        //     <Navbar.Text className ="m-auto">
        //         Contact Manager
        //     </Navbar.Text>
        //     </Container>
        //     </Navbar>
        // </Container>
    const [clicked, setClicked] = useState(false);
    const menuList = MenuList.map(({ url, title }, index) => {
        return (
            <li key={index}>
                <NavLink exact to={url} activeClassName="active">
                    {title}
                </NavLink>
            </li>
        );
    });

    const handleClick = () => {
        setClicked(!clicked);
    };

    return (
        <nav>
            <div className="logo">
                ADMIN<font>Page</font>
            </div>
            <div className="menu-icon" onClick={handleClick}>
                <i className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
            </div>
            <ul className={clicked ? "menu-list" : "menu-list close"}>{menuList}</ul>
        </nav>
    );
}

export default Header;