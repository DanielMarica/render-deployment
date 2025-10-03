import { NavLink, useLocation } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

export default function NavBar() {
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 w-full bg-violet-600 z-50 shadow-lg">
      <div className="flex items-center justify-center p-6">
        <NavigationMenu>
          <NavigationMenuList className="gap-8">
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <NavLink
                  to="/"
                  className={cn(
                    "text-white text-lg transition-opacity hover:opacity-80 no-underline",
                    location.pathname === '/' ? 'font-bold' : 'font-normal'
                  )}
                >
                  Home
                </NavLink>
              </NavigationMenuLink>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <NavLink
                  to="/list"
                  className={cn(
                    "text-white text-lg transition-opacity hover:opacity-80 no-underline",
                    location.pathname === '/list' ? 'font-bold' : 'font-normal'
                  )}
                >
                  List
                </NavLink>
              </NavigationMenuLink>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <NavLink
                  to="/add"
                  className={cn(
                    "text-white text-lg transition-opacity hover:opacity-80 no-underline",
                    location.pathname === '/add' ? 'font-bold' : 'font-normal'
                  )}
                >
                  Add
                </NavLink>
              </NavigationMenuLink>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-white text-lg transition-opacity hover:opacity-80 bg-transparent hover:bg-transparent focus:bg-transparent data-[active]:bg-transparent data-[state=open]:bg-transparent">
                Shad
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-48 gap-3 p-4 bg-white rounded-md shadow-lg">
                  <li>
                    <NavigationMenuLink asChild>
                      <NavLink
                        to="/shad/menu"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground text-gray-900"
                      >
                        <div className="text-sm font-medium leading-none">Menu</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Navigation menu components
                        </p>
                      </NavLink>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <NavLink
                        to="/shad/table"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground text-gray-900"
                      >
                        <div className="text-sm font-medium leading-none">Table</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Data components
                        </p>
                      </NavLink>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <NavLink
                        to="/shad/input"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground text-gray-900"
                      >
                        <div className="text-sm font-medium leading-none">Input</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Sooner
                        </p>
                      </NavLink>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <NavLink
                        to="/shad/file"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground text-gray-900"
                      >
                        <div className="text-sm font-medium leading-none">File</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          File upload components
                        </p>
                      </NavLink>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  );
}
