// Cursor.jsx
import { useState, useEffect, useRef, useCallback } from 'react';
import '../styles/components/Cursor.css';

export default function Cursor() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const circleRef = useRef(null);

    const handleMouseMove = useCallback((e) => {
        const newPosition = { x: e.clientX, y: e.clientY };
        setPosition(newPosition);
        console.log('🖱️ Cursor position:', newPosition);
    }, []);

    const handleHover = useCallback(() => {
        if (circleRef.current) {
            circleRef.current.classList.add('active-circle');
        }
    }, []);

    const handleLeave = useCallback(() => {
        if (circleRef.current) {
            circleRef.current.classList.remove('active-circle');
        }
    }, []);

    useEffect(() => {
        const supportsHover = window.matchMedia('(hover: hover)').matches;
        console.log('🖱️ Supports hover:', supportsHover);
        if (!supportsHover) return;

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
        console.log('🖱️ Mouse move listener added');
        
        return () => {
            document.removeEventListener('mousemove', throttledMouseMove);
            console.log('🖱️ Mouse move listener removed');
        };
    }, [handleMouseMove]);

    useEffect(() => {
        const observer = new MutationObserver(() => {
            const hoverables = document.querySelectorAll('.hoverable');
            hoverables.forEach((hoverable) => {
                if (!hoverable.dataset.cursorListenerAdded) {
                    hoverable.addEventListener('mouseenter', handleHover, { passive: true });
                    hoverable.addEventListener('mouseleave', handleLeave, { passive: true });
                    hoverable.dataset.cursorListenerAdded = 'true';
                }
            });
        });

        const hoverables = document.querySelectorAll('.hoverable');
        hoverables.forEach((hoverable) => {
            hoverable.addEventListener('mouseenter', handleHover, { passive: true });
            hoverable.addEventListener('mouseleave', handleLeave, { passive: true });
            hoverable.dataset.cursorListenerAdded = 'true';
        });

        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            observer.disconnect();
            const hoverables = document.querySelectorAll('.hoverable');
            hoverables.forEach((hoverable) => {
                hoverable.removeEventListener('mouseenter', handleHover);
                hoverable.removeEventListener('mouseleave', handleLeave);
                delete hoverable.dataset.cursorListenerAdded;
            });
        };
    }, [handleHover, handleLeave]);

    const isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    console.log('📱 Is touch device:', isTouchDevice);
    console.log('🖱️ Cursor position for render:', position);
    
    if (isTouchDevice) return null;

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                transform: `translate(${position.x - 6}px, ${position.y - 6}px)`,
                zIndex: 1000,
                pointerEvents: 'none',
            }}
        >
            <div ref={circleRef} className="circle" />
        </div>
    );
}
