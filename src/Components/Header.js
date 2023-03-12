import { useRef } from "react";
import { Link } from "react-router-dom";
import "./Styles/Header.css";
import { ReactComponent as Logo } from "../assets/Images/Logo.svg";

const Header = () => {
    const handburger = useRef();
    const handburgerMenu = useRef();

    function handleOpenHandburgerMenu() {
        handburgerMenu.current.classList.toggle("handburger-menu-open");
    }

    function handleCloseHandburgerMenu() {
        handburgerMenu.current.classList.toggle("handburger-menu-open");
    }

    return (
        <>
            <header className="header">
                <div className="header-wrapper">
                    <p>
                        <Link to={"/"} className="header-home-link">
                            <Logo />
                        </Link>
                    </p>
                    <div
                        ref={handburger}
                        onClick={handleOpenHandburgerMenu}
                        className="handburger-wrapper"
                    >
                        <p className="bar1"></p>
                        <p className="bar2"></p>
                    </div>
                </div>
                <div ref={handburgerMenu} className="handburger-menu">
                    <div>
                        <h3>At</h3>
                        <button
                            className="header-close-btn"
                            onClick={handleCloseHandburgerMenu}
                        >
                            close
                        </button>
                    </div>
                    <div className="header-links">
                        <ul>
                            <li>
                                <Link
                                    onClick={handleCloseHandburgerMenu}
                                    to={"/"}
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    onClick={handleCloseHandburgerMenu}
                                    to={"/subject/new"}
                                >
                                    Add subject
                                </Link>
                            </li>
                            <li>
                                <Link
                                    onClick={handleCloseHandburgerMenu}
                                    to={"/about"}
                                >
                                    About
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;
