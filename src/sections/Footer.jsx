import AnimatedBg from '@components/AnimatedBg.jsx';
import { FaGithub } from "react-icons/fa";
import { SiBuymeacoffee } from "react-icons/si";

export default function Footer() {
    const year = new Date().getFullYear();
    return (
        <footer id='footer' className='relative w-full flex justify-center items-center py-4 px-4 bg-linear-to-t from-dark to-transparent min-h-[10vh]'>
            <div
                className="absolute inset-0 z-0"
                style={{
                    background: `
                        radial-gradient(ellipse 120% 80% at 70% 80%, rgba(255, 20, 147, 0.15), transparent 50%),
                        radial-gradient(ellipse 100% 60% at 30% 90%, rgba(0, 255, 255, 0.12), transparent 60%),
                        radial-gradient(ellipse 90% 70% at 50% 100%, rgba(138, 43, 226, 0.18), transparent 65%),
                        radial-gradient(ellipse 110% 50% at 80% 70%, rgba(255, 215, 0, 0.08), transparent 40%),
                        #00000000
                `,
                }}
            />
            {/* <AnimatedBg isFooter={true} /> */}
            <div className='absolute top-0 left-0 h-full flex flex-row items-end justify-between px-8 py-4 w-full'>
                <h2 className=' text-sm font-secondary'>
                    &copy;Utools
                    <span className='text-xs text-transparent bg-clip-text bg-gradient-to-r from-light-blue via-purple to-pink'> {year}</span>
                    </h2>

                <div className='flex flex-row text-sm items-center justify-center gap-4 *:transition-all *:duration-200 *:ease'>
                    <a href='/privacy' target='_blank' rel='noreferrer' className='hoverable hover:scale-110 active:scale-95'>
                        Privacy Policy
                    </a>

                    <a href='/service' target='_blank' rel='noreferrer' className='hoverable hover:scale-110 active:scale-95'>
                        Terms of Service
                    </a>
                </div>
                <div className='flex flex-row items-center justify-center gap-4 *:transition-all *:duration-200 *:ease'>
                    <a href='https://github.com/Tonips22/utools-react' target='_blank' rel='noreferrer' className='hoverable hover:scale-110 active:scale-95'>
                        <FaGithub className=' text-xl' />
                    </a>

                    <a href='https://buymeacoffee.com/tonigt' target='_blank' rel='noreferrer' className='hoverable'>
                        <SiBuymeacoffee className=' text-xl hover:scale-110 active:scale-95' />
                    </a>
                </div>
            </div>
        </footer>
    );
}