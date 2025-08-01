import '@styles/components/Loader.css';
import { useState } from 'react';
export default function Loader({ inverseColors = false }) {
    return (
        <div className={`loader ${inverseColors ? 'loader-invert' : ''}`}></div>
    );
}