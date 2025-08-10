import Coffee from '@assets/buymeacoffee.svg';
import { useAuth } from "@auth/AuthProvider.jsx";
import { RiLoginCircleLine } from "react-icons/ri";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar } from "@heroui/react";

export default function Header({ transparent = true, absolute = true }) {
  const { user, logout } = useAuth();

  return (
    <header
      id="header"
      className={`z-20 ${absolute ? "absolute" : ""} top-0 left-0 w-full flex justify-between items-center py-4 px-8 bg-transparent ${transparent ? "" : "backdrop-blur-md"}`}
    >
      <a href="/" className="hoverable hover:scale-110 transition-transform relative active:scale-95">
        <img src="/logo.webp" alt="Utools Logo" className="w-12 h-12 z-10" />
        <img src="/logo.webp" alt="Utools Logo" className=" -z-10 w-12 h-12 blur-md absolute top-0 left-0" />
      </a>

      <nav className="flex items-center space-x-8">
        <a
          href="https://buymeacoffee.com/tonigt"
          className="hoverable hover:scale-110 transition-transform max-w-6 relative active:scale-95"
          target="_blank"
          rel="noreferrer"
        >
          <img src={Coffee} alt="BuyMeACoffee Logo" />
          <img src={Coffee} alt="BuyMeACoffee Logo" className=" -z-10 w-12 h-12 blur-md absolute top-0 left-0" />
        </a>

        {user ? (
          <Dropdown
            placement="bottom-end"
            classNames={{
                // wrapper del popover (el que tiene bg-content1)
                content: "bg-transparent backdrop-blur-md rounded-xl", 
                // puedes ocultar la flechita si quieres
                arrow: "hidden",
            }}
          >
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                classNames={{
                    
                  base: "hoverable relative transition-transform w-9 h-9 rounded-full hover:scale-110 active:scale-95 cursor-pointer",
                  image: "rounded-full object-cover w-full h-full",

                }}
                src={user.user_metadata.avatar_url || "/user-icon.svg"}
              />
            </DropdownTrigger>

            <DropdownMenu
              aria-label="Profile Actions"
              variant="light"
              classNames={{
                base: " rounded-xl bg-dark backdrop-blur-sm p-2", // contenedor principal
                list: "flex flex-col gap-2",                             // lista UL interna
              }}
              itemClasses={{
                base: "rounded-lg py-1 px-2 text-sm text-white hover:scale-105 active:scale-95 transition-all duration-200 ease-in-out",
              }}
            >
              <DropdownItem key="profile" textValue="Profile info" isReadOnly classNames={{ base: "h-14 gap-2 bg-transparent hover:scale-100 cursor-default" }}>
                <p className="text-xs text-white/80">Signed in as</p>
                <p className="text-sm text-white">{user.user_metadata.name || user.user_metadata.email}</p>
              </DropdownItem>

              <DropdownItem
              key="dashboard"
              textValue="Dashboard"
              href="/dashboard"
              classNames={{
                base: "group bg-transparent hover:bg-white",
                title: "text-sm text-white group-hover:text-dark",
              }}
            >
              Dashboard
            </DropdownItem>

              <DropdownItem
                key="logout"
                textValue="Sign out"
                classNames={{
                  base: "group bg-transparent hover:bg-pink",
                  title: "text-sm text-pink group-hover:text-dark",
                }}
                onPress={logout}
              >
                Sign Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : (
          <a
            href="/login"
            className="hoverable flex items-center backdrop-blur-xl bg-gray-50/20  p-2 gap-2 z-10 rounded-xl hover:scale-110 transition-transform relative active:scale-95"
          >
            <RiLoginCircleLine className="h-6 w-6" />
            <p>Sign In</p>
          </a>
        )}
      </nav>
    </header>
  );
}
