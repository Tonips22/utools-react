import { button } from "@heroui/theme";
import { LuCornerRightUp } from "react-icons/lu";

interface ScrollToButtonProps {
    itemToScrollTo?: string;
    children?: React.ReactNode; // elemento para mostrar dentro del botón
}

export default function ScrollToButton({ itemToScrollTo, children }: ScrollToButtonProps) {
    const handleScrollTo = () => {
        const element = itemToScrollTo ? document.getElementById(itemToScrollTo) : null;
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }else{
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };
    return (
        <button
        className="hoverable fixed bottom-4 right-4 flex items-center justify-center bg-dark backdrop-blur-sm py-2 border border-white/10 hover:border-white/30 hover:scale-105 active:scale-95 transition-all duration-200 group disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 cursor-pointer z-50 rounded-full w-12 h-12 timeline-view animate-fade-in-up animate-range[entry_5%_contain_6%]"
        onClick={handleScrollTo}>
            {
                children ? (
                    children
                ) : (
                    <LuCornerRightUp size={24} />
                )
            }

            <div className={`absolute -inset-[1px] rounded-2xl blur-sm opacity-0 group-hover:opacity-50 -z-10 transition-opacity duration-200 ease-in-out bg-gradient-to-r from-light-blue via-purple to-pink`}></div>
        </button>
    )
}