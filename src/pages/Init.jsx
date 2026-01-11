import { Link } from 'react-router-dom';
import Header from '@sections/Header.jsx';
import Footer from '@sections/Footer.jsx';
import GradientText from '@components/GradientText.jsx';
import Button from '@components/Button.jsx';
import { RiSearchLine, RiDashboardLine, RiUserAddLine } from 'react-icons/ri';
import { FaPalette, FaReact, FaIcons, FaPencilRuler, FaCode, FaFont, FaImage, FaVideo, FaServer, FaRocket, FaFileAlt, FaGraduationCap } from 'react-icons/fa';
import { MdAnimation, MdSpeed } from 'react-icons/md';

export default function Init() {
    const categories = [
        { name: 'Images', icon: <FaImage />, description: 'Tools for image optimization and management' },
        { name: 'Videos', icon: <FaVideo />, description: 'Resources and services for multimedia content' },
        { name: 'Optimization', icon: <MdSpeed />, description: 'Tools for resource optimization and improvement' },
        { name: 'Hosting', icon: <FaServer />, description: 'Hosting services and servers' },
        { name: 'Design', icon: <FaPencilRuler />, description: 'Design and prototyping tools' },
        { name: 'Deployment', icon: <FaRocket />, description: 'Deployment platforms and tools' },
        { name: 'Components', icon: <FaReact />, description: 'UI component libraries (React, Vue, etc.)' },
        { name: 'Colors', icon: <FaPalette />, description: 'Color palettes and design tools' },
        { name: 'Typography', icon: <FaFont />, description: 'Web fonts and typography tools' },
        { name: 'Icons', icon: <FaIcons />, description: 'Icon collections and graphic resources' },
        { name: 'Mockups', icon: <FaFileAlt />, description: 'Templates and mockups for presentations' },
        { name: 'API', icon: <FaCode />, description: 'APIs and development services' },
        { name: 'Animations', icon: <MdAnimation />, description: 'Animation libraries and tools' },
        { name: 'Learning', icon: <FaGraduationCap />, description: 'Educational resources and tutorials' }
    ];

    const features = [
        {
            icon: <RiSearchLine className="text-4xl" />,
            title: 'Smart Search',
            description: 'Find resources in real-time by title and categories with advanced filtering.'
        },
        {
            icon: <RiDashboardLine className="text-4xl" />,
            title: 'Personal Dashboard',
            description: 'Manage your own resources with a complete publishing and moderation system.'
        },
        {
            icon: <RiUserAddLine className="text-4xl" />,
            title: 'Multi-Platform Authentication',
            description: 'Sign in quickly with Google, GitHub, or Twitch to access all features.'
        }
    ];

    return (
        <>
            <Header />
            
            {/* Hero Section */}
            <section className="min-h-screen relative flex flex-col items-center justify-center gap-12 px-8 py-20 max-w-5xl mx-auto">
                <h1 className="text-6xl md:text-3xl lg:text-5xl font-bold cursor-default text-center">
                    <GradientText animated={true}>
                        Discover the best tools, UI components, libraries, and essential resources for web development.
                    </GradientText>
                </h1>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Link to="/">
                        <Button className="text-lg px-8 py-4 font-semibold text-white min-w-[200px]">
                            <RiSearchLine className="text-xl" />
                            Explore Resources
                        </Button>
                    </Link>
                    
                    <Link to="/login">
                        <Button className="text-lg px-8 py-4 font-semibold text-white min-w-[200px]">
                            <RiUserAddLine className="text-xl" />
                            Get Started Free
                        </Button>
                    </Link>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
                    <div className="flex flex-col items-center gap-2">
                        <p className="text-4xl font-bold">
                            <GradientText animated={true}>100+</GradientText>
                        </p>
                        <p className="text-sm text-white/60">Available Resources</p>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <p className="text-4xl font-bold">
                            <GradientText animated={true}>14</GradientText>
                        </p>
                        <p className="text-sm text-white/60">Categories</p>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <p className="text-4xl font-bold">
                            <GradientText animated={true}>24/7</GradientText>
                        </p>
                        <p className="text-sm text-white/60">Continuous Access</p>
                    </div>
                </div>
            </section>

                {/* Features Section */}
                <section className="py-20 px-8">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
                            <GradientText animated={true}>Key Features</GradientText>
                        </h2>
                        
                        <div className="grid md:grid-cols-3 gap-8">
                            {features.map((feature, index) => (
                                <div 
                                    key={index}
                                    className="hoverable relative group flex flex-col gap-4 bg-dark/50 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:border-white/30 transition-all duration-300 hover:scale-105"
                                >
                                    <div className="absolute -inset-[1px] rounded-3xl blur-sm opacity-0 group-hover:opacity-50 -z-10 transition-opacity duration-200 bg-gradient-to-r from-light-blue via-purple to-pink"></div>
                                    
                                    <div className="flex items-center gap-2">
                                        <i className="text-white/80">
                                            {feature.icon}
                                        </i>
                                        
                                        <h3 className="text-xl font-bold text-white text-balance">
                                            {feature.title}
                                        </h3>
                                    </div>
                                    
                                    <p className="text-white/60 leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Categories Section */}
                <section className="py-20 px-8">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
                            <GradientText animated={true}>Organized Categories</GradientText>
                        </h2>
                        
                        <p className="text-center text-white/70 text-lg mb-16 max-w-2xl mx-auto">
                            Explore carefully organized resources in categories to find 
                            exactly what you need for your project.
                        </p>
                        
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {categories.map((category, index) => (
                                <div 
                                    key={index}
                                    className="hoverable relative flex flex-col gap-4 group bg-dark/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-white/30 transition-all duration-300 hover:scale-105"
                                >
                                    <div className="absolute -inset-[1px] rounded-2xl blur-sm opacity-0 group-hover:opacity-50 -z-10 transition-opacity duration-200 bg-gradient-to-r from-light-blue via-purple to-pink"></div>
                                    
                                    <div className="flex items-center gap-2">
                                        <i className="text-3xl text-white/80">
                                            {category.icon}
                                        </i>

                                        <h3 className="text-lg font-bold text-white">
                                            {category.name}
                                        </h3>
                                        
                                    </div>

                                    <p className="text-sm text-white/60">
                                        {category.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 px-8">
                    <div className="max-w-4xl mx-auto text-center space-y-8">
                        <h2 className="text-4xl md:text-5xl font-bold">
                            Ready to boost your development?
                        </h2>
                        
                        <p className="text-xl text-white/70 max-w-2xl mx-auto">
                            Join the community of developers optimizing their workflow 
                            with the best tools and resources.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
                            <Link to="/">
                                <Button className="text-lg px-8 py-4 font-semibold text-white min-w-[200px]">
                                    Get Started Now
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>
            
            <Footer />
        </>
    );
}