import { FaGithub } from "react-icons/fa";
import Coffee from '@assets/buymeacoffee.svg';
export default function Header(){
    return (
        <header id='header' className=" z-50 absolute top-0 left-0 w-full flex justify-between items-center py-4 px-8 bg-transparent">
            <a href="/" className='hoverable hover:scale-110 transition-transform relative'>
                <img src='/logou.webp' alt="Utools Logo" className="w-12 h-12 z-10" />
                <img src='/logou.webp' alt="Utools Logo" className=" -z-10 w-12 h-12 blur-md absolute top-0 left-0" />
                <p className=' absolute uppercase font-primary-font text-[10px] opacity-85 text-white w-full text-center mt-2 rounded-full bg-gradient-to-r from-blue via-purple to-pink px-[4px] py-[2px]'>Beta</p>
            </a>
            <nav className='flex items-center space-x-8'>
                <a href="https://buymeacoffee.com/tonigt" className='hoverable hover:scale-110 transition-transform max-w-6 relative' target='_blank' rel='noreferrer'>
                    <img src={Coffee} alt="BuyMeACoffee Logo" />
                    <img src={Coffee} alt="BuyMeACoffee Logo" className=" -z-10 w-12 h-12 blur-md absolute top-0 left-0" />
                </a>
            </nav>
        </header>
    )
}