import { NavLink } from "react-router-dom";

const navmenu = [
    { path: "/", label: "Homepage" },
    { path: "/about", label: "Chi Siamo" },
    { path: "/posts", label: "Posts" }
];

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/">
                    Il mio Blog
                </NavLink>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        {navmenu.map((item) => (
                            <li className="nav-item" key={item.path}>
                                <NavLink
                                    className="nav-link"
                                    to={item.path}
                                    end
                                    style={({ isActive }) => ({
                                        color: isActive ? "red" : "black"
                                    })}
                                >
                                    {item.label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;