// Componente temporal para testing del cursor en producción
import { useEffect, useState } from 'react';

export default function CursorTest() {
    const [debugInfo, setDebugInfo] = useState({});

    useEffect(() => {
        const updateDebugInfo = () => {
            const info = {
                userAgent: navigator.userAgent,
                touchDevice: window.matchMedia('(hover: none) and (pointer: coarse)').matches,
                supportsHover: window.matchMedia('(hover: hover)').matches,
                screenWidth: window.innerWidth,
                screenHeight: window.innerHeight,
                timestamp: new Date().toISOString(),
                location: window.location.href
            };
            setDebugInfo(info);
            console.log('🔍 Cursor Debug Info:', info);
        };

        updateDebugInfo();
        window.addEventListener('resize', updateDebugInfo);
        
        return () => window.removeEventListener('resize', updateDebugInfo);
    }, []);

    return (
        <div style={{
            position: 'fixed',
            top: '10px',
            right: '10px',
            background: 'rgba(0,0,0,0.8)',
            color: 'white',
            padding: '10px',
            borderRadius: '5px',
            fontSize: '12px',
            zIndex: 10000,
            maxWidth: '300px'
        }}>
            <h4>🔍 Cursor Debug Info</h4>
            <pre>{JSON.stringify(debugInfo, null, 2)}</pre>
        </div>
    );
}
