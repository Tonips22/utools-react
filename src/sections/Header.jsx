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

      <nav className="flex items-center gap-4">
        <a
          href="https://github.com/Tonips22/utools-react"
          className="hidden md:flex hoverable items-center gap-2 bg-dark backdrop-blur-sm rounded-2xl px-4 py-2 border border-white/10 hover:border-white/30 hover:scale-105 transition-all duration-200 active:scale-95 relative group"
          target="_blank"
          rel="noreferrer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-all duration-200">
            <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" className="fill-[#eab308] stroke-[#eab308] transition-all duration-200"/>
          </svg>
          <span className="text-white text-sm font-medium">Star on GitHub</span>
          <div className="absolute -inset-[1px] bg-gradient-to-r from-light-blue via-purple to-pink rounded-2xl blur-sm opacity-0 group-hover:opacity-50 -z-10 transition-opacity duration-300"></div>
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
            className="hoverable flex items-center gap-2 bg-dark backdrop-blur-sm rounded-2xl px-4 py-2 border border-white/10 hover:border-white/30 hover:scale-105 transition-all duration-200 active:scale-95 relative group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-all duration-200">
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
              <polyline points="10 17 15 12 10 7"/>
              <line x1="15" y1="12" x2="3" y2="12"/>
            </svg>
            <span className="text-white text-sm font-medium">Sign In</span>
            <div className="absolute -inset-[1px] bg-gradient-to-r from-light-blue via-purple to-pink rounded-2xl blur-sm opacity-0 group-hover:opacity-50 -z-10 transition-opacity duration-300"></div>
          </a>
        )}
      </nav>
    </header>
  );
}
