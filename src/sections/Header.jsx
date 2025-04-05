import Coffee from '@assets/buymeacoffee.svg';
import { AiOutlineLogin } from "react-icons/ai";
export default function Header(){
    return (
        <header id='header' className=" z-50 absolute top-0 left-0 w-full flex justify-between items-center py-4 px-8 bg-transparent">
            <a href="/" className='hoverable hover:scale-110 transition-transform relative active:scale-95'>
                <img src='/logo.webp' alt="Utools Logo" className="w-12 h-12 z-10" />
                <img src='/logo.webp' alt="Utools Logo" className=" -z-10 w-12 h-12 blur-md absolute top-0 left-0" />
            </a>
            <nav className='flex items-center space-x-8'>
                <a href="https://buymeacoffee.com/tonigt" className='hoverable hover:scale-110 transition-transform max-w-6 relative active:scale-95' target='_blank' rel='noreferrer'>
                    <img src={Coffee} alt="BuyMeACoffee Logo" />
                    <img src={Coffee} alt="BuyMeACoffee Logo" className=" -z-10 w-12 h-12 blur-md absolute top-0 left-0" />
                </a>
                <a href="/login" className='hoverable hover:scale-110 transition-transform max-w-6 relative active:scale-95'>
                    <AiOutlineLogin className="w-12 h-12 z-10 text-pink" />
                    <AiOutlineLogin className="-z-10 w-12 h-12 blur-xl absolute top-0 left-0 bg-pink" />
                </a>
            </nav>
        </header>
    )
}