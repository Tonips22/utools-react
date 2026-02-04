import { useEffect } from "react";
import Button from "@components/Button.jsx";

export default function Modal({ 
    isOpen, 
    onClose, 
    onConfirm, 
    title = "Confirm Action", 
    message = "Are you sure you want to perform this action?",
    confirmText = "Confirm",
    cancelText = "Cancel",
    danger = false
}) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bg/60 backdrop-blur-sm animate-fadeIn"
            onClick={handleBackdropClick}
        >
            <div className="bg-dark border border-white/20 rounded-2xl p-6 max-w-md w-full shadow-2xl relative overflow-hidden animate-scaleIn">
                
                {/* Content */}
                <div className="relative z-10">
                    <h2 className="text-2xl font-bold text-white mb-3">{title}</h2>
                    <p className="text-white/70 mb-6">{message}</p>
                    
                    <div className="flex gap-2 justify-end">
                        <Button
                            onClick={onClose}
                            className="bg-white/10 text-white border-white/10"
                            danger={danger}
                        >
                            {cancelText}
                        </Button>
                        <Button
                            onClick={() => {
                                onConfirm();
                                onClose();
                            }}
                        >
                            {confirmText}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
