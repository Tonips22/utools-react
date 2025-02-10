import { FaArrowTurnUp, FaArrowTurnDown } from "react-icons/fa6";
import '@styles/components/NavBar.css';

export default function NavBar(){
    return (
        <aside className="hoverable nav-bar">
            <nav>
                <a className="nav-bar-link" href="#header">
                    <FaArrowTurnUp />

                </a>

                <a className="nav-bar-link" href="/">
                    <img src='/logo.webp' alt="Utools logo" className="Utools Logo"/>
                </a>

                <a className="nav-bar-link" href="#footer">
                    <FaArrowTurnDown />
                </a>
            </nav>
        </aside>
    )
}