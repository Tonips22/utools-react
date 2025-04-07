import Coffee from '@assets/buymeacoffee.svg';
import { useAuth } from "@auth/AuthProvider.jsx";
import { RiLoginCircleLine } from "react-icons/ri";
import { FaUserCircle } from "react-icons/fa";
// import { userIcon} from "@assets/user-icon.svg";
export default function Header(){
    const { user, logout } = useAuth(); // Obtener el usuario autenticado desde el contexto de autenticación
    
    return (
        <header id='header' className=" z-50 absolute top-0 left-0 w-full flex justify-between items-center py-4 px-8 bg-transparent">
            <a href="/" className='hoverable hover:scale-110 transition-transform relative active:scale-95'>
                <img src='/logo.webp' alt="Utools Logo" className="w-12 h-12 z-10" />
                <img src='/logo.webp' alt="Utools Logo" className=" -z-10 w-12 h-12 blur-md absolute top-0 left-0" />
            </a>
            <nav className='flex items-center space-x-8'>

                <a href="https://buymeacoffee.com/tonigt" className='hoverable hover:scale-110 transition-transform max-w-6 relative active:scale-95' target='_blank' rel='noreferrer'>
                    <img src={Coffee} alt="BuyMeACoffee Logo" />
                    <img src={Coffee} alt="BuyMeACoffee Logo" className=" -z-10 w-12 h-12 blur-md absolute top-0 left-0" />
                </a>
                
                {user ?(
                    <a href="/login" className='hoverable hover:scale-110 transition-transform max-w-6 relative active:scale-95'>
                    {/* Contenedor cuadrado */}
                    <div className="z-10 rounded-full overflow-hidden h-8 w-8 relative">
                        <img
                            src={user.user_metadata.avatar_url || "/user-icon.svg"} // Foto del avatar
                            alt="User Avatar"
                            className="object-cover w-full h-full" // Asegura que la imagen cubra el área y sea circular
                        />
                    </div>
                    {/* Imagen de fondo borroso */}
                    <div className="-z-10 rounded-full overflow-hidden h-8 w-8 absolute top-0 left-0 blur-md">
                        <img
                            src={user.user_metadata.avatar_url || "/user-icon.svg"} // Foto del avatar
                            alt="User Avatar"
                            className="object-cover w-full h-full"
                        />
                    </div>
                </a>
                ) : (
                    <a href="/login" className='hoverable flex items-center backdrop-blur-xl bg-gray-50/20  p-2 gap-2 z-10 rounded-xl hover:scale-110 transition-transform relative active:scale-95'>
                        <RiLoginCircleLine className='h-6 w-6'/>
                        <p>Sign In</p>
                    </a>
                )}

                    {/* <button
                        onClick={logout}  // Llama a la función logout cuando se hace clic
                        className="logout-button"
                    >
                        Logout
                    </button> */}
            </nav>
        </header>
    )
}