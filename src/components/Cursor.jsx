// Cursor.jsx
import { useState, useEffect, useRef, useCallback } from 'react';
import '../styles/components/Cursor.css';

export default function Cursor() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const circleRef = useRef(null);

    // Detección más robusta de dispositivos táctiles
    const detectTouchDevice = useCallback(() => {
        if (typeof window === 'undefined') return true;
        
        return (
            ('ontouchstart' in window) ||
            (navigator.maxTouchPoints > 0) ||
            (navigator.msMaxTouchPoints > 0) ||
            window.matchMedia('(hover: none) and (pointer: coarse)').matches
        );
    }, []);

    const handleMouseMove = useCallback((e) => {
        if (!isMounted) return;
        const newPosition = { x: e.clientX, y: e.clientY };
        setPosition(newPosition);
        
        // Mostrar cursor al primer movimiento
        if (!isVisible) {
            setIsVisible(true);
        }
    }, [isMounted, isVisible]);

    const handleHover = useCallback(() => {
        if (circleRef.current && isMounted) {
            circleRef.current.classList.add('active-circle');
        }
    }, [isMounted]);

    const handleLeave = useCallback(() => {
        if (circleRef.current && isMounted) {
            circleRef.current.classList.remove('active-circle');
        }
    }, [isMounted]);

    // Inicialización con mejor timing
    useEffect(() => {
        // Verificar si estamos en el cliente
        if (typeof window === 'undefined') return;

        const isTouch = detectTouchDevice();
        if (isTouch) return;

        // Delay para asegurar que el DOM esté listo
        const initTimer = setTimeout(() => {
            setIsMounted(true);
        }, 100);

        return () => clearTimeout(initTimer);
    }, [detectTouchDevice]);

    // Event listeners para mouse
    useEffect(() => {
        if (!isMounted || detectTouchDevice()) return;

        let ticking = false;
        const throttledMouseMove = (e) => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    handleMouseMove(e);
                    ticking = false;
                });
                ticking = true;
            }
        };

        document.addEventListener('mousemove', throttledMouseMove, { passive: true });
        
        return () => {
            document.removeEventListener('mousemove', throttledMouseMove);
        };
    }, [handleMouseMove, isMounted, detectTouchDevice]);

    // Event listeners para elementos hoverable
    useEffect(() => {
        if (!isMounted || detectTouchDevice()) return;

        const addListeners = (elements) => {
            elements.forEach((hoverable) => {
                if (!hoverable.dataset.cursorListenerAdded) {
                    hoverable.addEventListener('mouseenter', handleHover, { passive: true });
                    hoverable.addEventListener('mouseleave', handleLeave, { passive: true });
                    hoverable.dataset.cursorListenerAdded = 'true';
                }
            });
        };

        // Configurar elementos existentes
        const hoverables = document.querySelectorAll('.hoverable');
        addListeners(hoverables);

        // Observer para elementos dinámicos
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        const newHoverables = node.classList?.contains('hoverable') 
                            ? [node] 
                            : node.querySelectorAll?.('.hoverable') || [];
                        addListeners(Array.from(newHoverables));
                    }
                });
            });
        });

        observer.observe(document.body, { 
            childList: true, 
            subtree: true 
        });

        return () => {
            observer.disconnect();
            const allHoverables = document.querySelectorAll('.hoverable');
            allHoverables.forEach((hoverable) => {
                hoverable.removeEventListener('mouseenter', handleHover);
                hoverable.removeEventListener('mouseleave', handleLeave);
                delete hoverable.dataset.cursorListenerAdded;
            });
        };
    }, [handleHover, handleLeave, isMounted, detectTouchDevice]);

    // No renderizar en servidor o dispositivos táctiles
    if (typeof window === 'undefined' || !isMounted || detectTouchDevice()) {
        return null;
    }

    return (
        <div
            className={`cursor-wrapper ${isVisible ? 'cursor-visible' : 'cursor-hidden'}`}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                transform: `translate(${position.x - 6}px, ${position.y - 6}px)`,
                zIndex: 9999,
                pointerEvents: 'none',
                transition: isVisible ? 'opacity 0.2s ease' : 'none',
            }}
        >
            <div ref={circleRef} className="circle" />
        </div>
    );
}
