import AnimatedBg from '@components/AnimatedBg.jsx';
import { FaGithub } from "react-icons/fa";
import { SiBuymeacoffee } from "react-icons/si";

export default function Footer() {
    const year = new Date().getFullYear();
    return (
        <footer id='footer' className='relative z-50 w-full flex justify-center items-center py-4 px-8 bg-transparent min-h-[25vh]'>
            <AnimatedBg />
            <div className='absolute top-0 left-0 h-full flex flex-row items-end justify-between px-8 py-4 w-full'>
                <h2 className=' text-lg font-primary-font'>&copy;Utools {year}</h2>

                <div className='flex flex-row items-center justify-center gap-4 *:transition-all *:duration-200 *:ease'>
                    <a href='https://github.com/Tonips22/utools-react' target='_blank' rel='noreferrer' className='hoverable hover:scale-110'>
                        <FaGithub className=' text-xl' />
                    </a>

                    <a href='https://buymeacoffee.com/tonigt' target='_blank' rel='noreferrer' className='hoverable'>
                        <SiBuymeacoffee className=' text-xl hover:scale-110' />
                    </a>

                </div>
            </div>
        </footer>
    );
}