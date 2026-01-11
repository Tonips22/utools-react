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
        { name: 'Images', icon: <FaImage />, description: 'Herramientas para optimización y gestión de imágenes' },
        { name: 'Videos', icon: <FaVideo />, description: 'Recursos y servicios para contenido multimedia' },
        { name: 'Optimization', icon: <MdSpeed />, description: 'Herramientas para la optimización y mejora de recursos' },
        { name: 'Hosting', icon: <FaServer />, description: 'Servicios de alojamiento y servidores' },
        { name: 'Design', icon: <FaPencilRuler />, description: 'Herramientas de diseño y prototipado' },
        { name: 'Deployment', icon: <FaRocket />, description: 'Plataformas y herramientas de despliegue' },
        { name: 'Components', icon: <FaReact />, description: 'Librerías de componentes UI (React, Vue, etc.)' },
        { name: 'Colors', icon: <FaPalette />, description: 'Paletas de colores y herramientas de diseño' },
        { name: 'Typography', icon: <FaFont />, description: 'Fuentes web y herramientas tipográficas' },
        { name: 'Icons', icon: <FaIcons />, description: 'Colecciones de iconos y recursos gráficos' },
        { name: 'Mockups', icon: <FaFileAlt />, description: 'Plantillas y mockups para presentaciones' },
        { name: 'API', icon: <FaCode />, description: 'APIs y servicios para desarrollo' },
        { name: 'Animations', icon: <MdAnimation />, description: 'Librerías y herramientas de animación' },
        { name: 'Learning', icon: <FaGraduationCap />, description: 'Recursos educativos y tutoriales' }
    ];

    const features = [
        {
            icon: <RiSearchLine className="text-4xl" />,
            title: 'Búsqueda Inteligente',
            description: 'Encuentra recursos en tiempo real por título, descripción y categorías con filtrado avanzado.'
        },
        {
            icon: <RiDashboardLine className="text-4xl" />,
            title: 'Dashboard Personal',
            description: 'Gestiona tus propios recursos con un sistema completo de publicación y moderación.'
        },
        {
            icon: <RiUserAddLine className="text-4xl" />,
            title: 'Autenticación Multi-Plataforma',
            description: 'Inicia sesión rápidamente con Google, GitHub o Twitch para acceder a todas las funciones.'
        }
    ];

    return (
        <>
            <Header />
            
            {/* Hero Section */}
            <section className="min-h-screen relative flex flex-col items-center justify-center gap-12 px-8 py-20 max-w-5xl mx-auto">
                <h1 className="text-6xl md:text-3xl lg:text-5xl font-bold cursor-default text-center">
                    <GradientText animated={true}>
                        Descubre las mejores herramientas, componentes UI, librerías y recursos esenciales para desarrollo web.
                    </GradientText>
                </h1>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Link to="/">
                        <Button className="text-lg px-8 py-4 font-semibold text-white min-w-[200px]">
                            <RiSearchLine className="text-xl" />
                            Explorar Recursos
                        </Button>
                    </Link>
                    
                    <Link to="/login">
                        <Button className="text-lg px-8 py-4 font-semibold text-white min-w-[200px]">
                            <RiUserAddLine className="text-xl" />
                            Comenzar Gratis
                        </Button>
                    </Link>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
                    <div className="flex flex-col items-center gap-2">
                        <p className="text-4xl font-bold">
                            <GradientText animated={true}>100+</GradientText>
                        </p>
                        <p className="text-sm text-white/60">Recursos Disponibles</p>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <p className="text-4xl font-bold">
                            <GradientText animated={true}>14</GradientText>
                        </p>
                        <p className="text-sm text-white/60">Categorías</p>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <p className="text-4xl font-bold">
                            <GradientText animated={true}>24/7</GradientText>
                        </p>
                        <p className="text-sm text-white/60">Acceso Continuo</p>
                    </div>
                </div>
            </section>

                {/* Features Section */}
                <section className="py-20 px-8">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
                            <GradientText animated={true}>Características Principales</GradientText>
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
                            <GradientText animated={true}>Categorías Organizadas</GradientText>
                        </h2>
                        
                        <p className="text-center text-white/70 text-lg mb-16 max-w-2xl mx-auto">
                            Explora recursos cuidadosamente organizados en categorías para encontrar 
                            exactamente lo que necesitas para tu proyecto.
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
                            ¿Listo para potenciar tu desarrollo?
                        </h2>
                        
                        <p className="text-xl text-white/70 max-w-2xl mx-auto">
                            Únete a la comunidad de desarrolladores que optimizan su flujo de trabajo 
                            con las mejores herramientas y recursos.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
                            <Link to="/">
                                <Button className="text-lg px-8 py-4 font-semibold text-white min-w-[200px]">
                                    Comenzar Ahora
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>
            
            <Footer />
        </>
    );
}