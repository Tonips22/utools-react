import '@styles/components/AnimatedBg.css';
export default function AnimatedBg() {
    return (
        <div className=" bg-bg w-full h-full absolute top-0 left-0 overflow-hidden filter blur-3xl">
            <div className="bg-bubble"></div>
            <div className="bg-bubble"></div>
            <div className="bg-bubble"></div>
            <div className="bg-bubble"></div>
        </div>
    )
}