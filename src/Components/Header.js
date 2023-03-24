import { Link } from "react-router-dom";
import "./Styles/Header.css";

const Header = () => {
    return (
        <>
            <header className="header">
                <div className="header-wrapper">
                    <p>
                        <Link to={"/attendTrack"} className="header-home-link">
                            At
                        </Link>
                    </p>
                </div>
            </header>
        </>
    );
};

export default Header;
