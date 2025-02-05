import { useState, useEffect } from 'react';
import AnimatedBg from '@components/AnimatedBg.jsx';
import { getPostsByTitle } from '@logic/posts.js';

export default function Hero() {
    const [posts, setPosts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const searchPosts = async () => {
            if (searchTerm) {
                const newPosts = await getPostsByTitle(searchTerm);
                setPosts(newPosts);
            }
        };

        searchPosts();
    }, [searchTerm]);

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    console.log(posts);
    

    return (
        <section className="min-h-[75vh] flex-col items-center justify-center relative z-10" id='hero'>
            <AnimatedBg />

            <div className="absolute top-0 left-0 w-full h-full z-10 flex flex-col items-center justify-center">
                <h1 className='hoverable text-6xl text-white font-bold cursor-default'>Utools</h1>
                <p className='hoverable cursor-default italic'>iThe best websites-tools reference in all web</p>
                <input
                    type="text"
                    onChange={handleInputChange}
                    autoFocus
                    className='hoverable searchBar text-white bg-dark py-4 px-8 rounded-full border-none outline-none w-[350px] md:w-[500px] lg:w-[600px]'
                />
            </div>
        </section>
    );
}