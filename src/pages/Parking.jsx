import { FaGithub } from "react-icons/fa";
import { SiBuymeacoffee } from "react-icons/si";
import { BsStars } from "react-icons/bs";

export default function Parking() {
    const year = new Date().getFullYear();
  return (
    <div className="min-h-screen bg-dark flex flex-col justify-between text-white relative overflow-hidden">
        <main className="h-full flex flex-col justify-center gap-6 mx-auto flex-1 px-4">
            <h1 className="text-8xl font-primary text-transparent bg-clip-text bg-gradient-to-r from-purple to-pink text-center">Maintenance</h1>
            <div className="max-w-3xl mx-auto space-y-4">
                <p className="text-white/70 text-center text-lg leading-relaxed">
                    We're currently giving <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple to-pink">Utools</span> some love and making it even better for you. 
                    Our team is working hard behind the scenes to bring you an improved experience with cool new features.
                </p>
                <p className="text-white/60 text-center text-base flex items-center gap-2 justify-center">
                    We'll be back before you know it. Thanks for your patience!
                    <i className="text-pink">
                        <BsStars />
                    </i>
                </p>
            </div>
        </main>

        <footer id='footer' className='relative w-full flex justify-center items-center py-4 px-4 bg-linear-to-t from-dark to-transparent min-h-[10vh]'>
            {/* <AnimatedBg isFooter={true} /> */}
            <div className='absolute top-0 left-0 h-full flex flex-row items-end justify-between px-8 py-4 w-full'>
                <h2 className=' text-sm font-secondary'>
                    &copy;Utools
                    <span className='text-xs text-transparent bg-clip-text bg-gradient-to-r from-light-blue via-purple to-pink'> {year}</span>
                </h2>
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

    </div>
);}
