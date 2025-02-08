import { FaArrowTurnUp } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import '@styles/components/NavBar.css';

export default function NavBar(){
    return (
        <aside className="nav-bar">
            <nav>
                <a className="nav-bar-link" href="https://github.com/Tonips22" target="_blank">
                    <FaGithub />
                </a>

                <a className="nav-bar-link" href="/">
                    <img src='/logou.webp' alt="Utools logo" className="Utools Logo"/>
                </a>

                <a className="nav-bar-link" href="#header">
                    <FaArrowTurnUp />
                </a>
            </nav>
        </aside>
    )
}