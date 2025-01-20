import AnimatedBg from '@components/AnimatedBg.jsx';

export default function Hero(){

    return (
        <section className="min-h-screen flex flex-col items-center justify-center relative" id='hero'>
            <AnimatedBg/>

            <div className="abosulte z-10 top-0 left-0 w-full h-full flex items-center justify-center">
                <h1 className='hoverable font-primary-font cursor-default'>Utools</h1>
            </div>
        </section>
    )
}
