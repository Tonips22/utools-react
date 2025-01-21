import Logo from '@assets/logou.png';
import { FaInstagram } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
export default function Header(){
    return (
        <header id='header' className=" z-50 absolute top-0 left-0 w-full flex justify-between items-center py-4 px-8 bg-transparent">
            <a href="/" className='hover:scale-110 transition-transform relative'>
                <img src={Logo} alt="Utools Logo" className="w-12 h-12 z-10" />
                <img src={Logo} alt="Utools Logo" className=" -z-10 w-12 h-12 blur-md absolute top-0 left-0" />
            </a>
            <nav className='flex items-center space-x-8'>
                <a href="https://www.instagram.com/tonniggrcia_/" className='hover:scale-110 transition-transform' target='_blank' rel='noreferrer'>
                    <FaInstagram />
                </a>
                <a href="https://github.com/Tonips22/utools-react" className='hover:scale-110 transition-transform' target='_blank' rel='noreferrer'>
                    <FaGithub />
                </a>
            </nav>
        </header>
    )
}