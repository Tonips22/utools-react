import { useState, useEffect, useRef } from 'react';
import '@styles/Cursor.css';

export default function Cursor() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const circleRef = useRef(null);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setPosition({ x: e.clientX + 10, y: e.clientY - 10 });
        };

        const handleHover = (e) => {
            if (circleRef.current) {
                circleRef.current.classList.add('active-circle');
            }
        };

        const handleLeave = (e) => {
            if (circleRef.current) {
                circleRef.current.classList.remove('active-circle');
            }
        };

        // Attach global mousemove event
        window.addEventListener('mousemove', handleMouseMove);

        // Attach hover events to hoverable elements
        const hoverables = document.querySelectorAll('.hoverable');
        hoverables.forEach((hoverable) => {
            hoverable.addEventListener('mouseover', handleHover);
            hoverable.addEventListener('mouseleave', handleLeave);
        });

        // Cleanup event listeners
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            hoverables.forEach((hoverable) => {
                hoverable.removeEventListener('mouseover', handleHover);
                hoverable.removeEventListener('mouseleave', handleLeave);
            });
        };
    }, []);

    return (
        <div
            ref={circleRef}
            className="circle"
            style={{
                top: `${position.y}px`,
                left: `${position.x}px`,
                position: 'fixed',
            }}
        ></div>
    );
}
