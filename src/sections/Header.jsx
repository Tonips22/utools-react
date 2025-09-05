import Coffee from '@assets/buymeacoffee.svg';
import { useAuth } from "@auth/AuthProvider.jsx";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar } from "@heroui/react";

export default function Header({ transparent = true, absolute = true }) {
  const { user, logout } = useAuth();

  return (
    <header
      id="header"
      className={`z-20 ${absolute ? "absolute" : "relative"} top-0 left-0 w-full flex justify-between items-center py-4 px-8 bg-transparent`}
    >
      {
        transparent === false && (
          <div
            className="absolute inset-0 z-0"
            style={{
              background: `
                radial-gradient(ellipse 180% 120% at 70% 20%, rgba(255, 20, 147, 0.25), transparent 70%),
                radial-gradient(ellipse 160% 100% at 30% 10%, rgba(0, 255, 255, 0.20), transparent 80%),
                radial-gradient(ellipse 150% 110% at 50% 0%, rgba(138, 43, 226, 0.28), transparent 85%),
                radial-gradient(ellipse 170% 80% at 80% 30%, rgba(255, 215, 0, 0.15), transparent 60%),
                #000000
              `,
            }}
          />
        )
      }
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
            className="hoverable bg-dark rounded-2xl cursor-pointer px-4 py-2 font-semibold active:scale-95 transition-all duration-300 group text-center border-1 border-dark/20 before:absolute before:inset-0 before:bg-gradient-to-r before:from-light-blue before:via-purple before:to-pink before:rounded-2xl before:-z-10 before:blur-xs relative flex items-center justify-center space-x-2"
            >
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-light-blue via-purple to-pink bg-[length:200%_100%] bg-left group-hover:bg-right transition-[background-position] duration-200 ease-in-out text-center'>Sign In</span>
          </a>
        )}
      </nav>
    </header>
  );
}
