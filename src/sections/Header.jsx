import Coffee from '@assets/buymeacoffee.svg';
import { useAuth } from "@auth/AuthProvider.jsx";
import { RiLoginCircleLine } from "react-icons/ri";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar} from "@heroui/react";



export default function Header({transparent=true, absolute=true}) {
    const { user, logout } = useAuth(); // Obtener el usuario autenticado desde el contexto de autenticación
    
    return (
        <header id='header' className={` z-50 ${absolute ? "absolute" : ""} top-0 left-0 w-full flex justify-between items-center py-4 px-8 bg-transparent ${transparent ? "" : "backdrop-blur-md"}`}>
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

                    <Dropdown placement="bottom-end" className="hoverable z-0 rounded-xl p-2 backdrop-blur-sm bg-gray-600/20">
                    <DropdownTrigger>
                        <Avatar
                            isBordered
                            as="button"
                            className={`hoverable relative transition-transform w-9 h-9 rounded-full hover:scale-110 active:scale-95`}
                            src={user.user_metadata.avatar_url || "/user-icon.svg"}
                        />
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Profile Actions" variant="solid" className='flex flex-col gap-4 min-w-36'>
                        <DropdownItem key="profile" className=" h-14 gap-2">
                            <p className="text-xs text-gray-50/80">Signed in as</p>
                            <p className="text-sm">{user.user_metadata.name || user.user_metadata.email}</p>
                        </DropdownItem>
                        <DropdownItem key="dashboard" className='hoverable hover:bg-white hover:text-dark transition-all duration-150 ease-out rounded-lg py-1 px-2 text-white text-sm hover:scale-105 active:scale-95' href="/dashboard">
                        Dashboard
                        </DropdownItem>
                        <DropdownItem key="logout" className='hoverable hover:bg-pink hover:text-white transition-all duration-150 ease-out rounded-lg py-1 px-2 text-pink text-sm hover:scale-105 active:scale-95' onPress={logout}>
                        Sign Out
                        </DropdownItem>
                    </DropdownMenu>
                    </Dropdown>
                    
                ) : (
                    <a href="/login" className='hoverable flex items-center backdrop-blur-xl bg-gray-50/20  p-2 gap-2 z-10 rounded-xl hover:scale-110 transition-transform relative active:scale-95'>
                        <RiLoginCircleLine className='h-6 w-6'/>
                        <p>Sign In</p>
                    </a>
                )}
            </nav>
        </header>
    )
}