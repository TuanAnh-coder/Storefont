
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { IconType } from 'react-icons';
import { FiUser, FiHeart, FiShoppingBag, FiAlignJustify, FiX } from 'react-icons/fi';
import { Search } from './Search';
import { TopBar } from './TopBar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuTrigger } from '../ui/navigation-menu';
import Sidebar from './SideBar';
import { api } from '@/utils/api';
import { HeartHandshakeIcon, MapIcon, Package, User, UserCircle } from 'lucide-react';
import { useCustomer } from '@/hooks/useCustomer';
import { GiFountainPen } from 'react-icons/gi';

export interface NavLink {
  name: string;
  href: string;
  collapsible?: boolean;
}

export const navLinks: NavLink[] = [
  { name: 'Create Your Own', href: '/create' },
  { name: 'Thanksgiving', href: '/thanksgiving' },
  { name: 'Chrishmas', href: '/Chrishmas' },
  { name: 'Product', href: '/product', collapsible: true },
  // { name: 'Explore Designs', href: '/desgins' },
  { name: 'Blog', href: '/blog', collapsible: true },
];
export const sideNavLinks: [string, IconType][] = [
  ['/wishlist', FiHeart],
  ['/cart', FiShoppingBag],
];

export const Header = () => {
  const { t } = useTranslation('header');
  const [open, setOpen] = useState(false);
  const [sidebar, setSibar] = useState(false)
  const [hoveredNavLink, setHoveredNavLink] = useState<NavLink | null>();
  const { data: categories } = api.medusa.listCategories.useQuery();
  const { data: blog } = api.blog.getCollections.useQuery();
  const getToken = () => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("authToken") ?? localStorage.getItem("authToken") ?? undefined;
    }
    return undefined;
  };

  // Trong component
  const accessToken = getToken(); const { data: user } = api.medusa.userDetail.useQuery(
    { accessToken: accessToken?.toString() }, // ← truyền chuỗi, không phải object
    { enabled: !!accessToken }
  );
  console.log("User data:", user);
  const handleShowMenu = (navLink: NavLink) => setHoveredNavLink(navLink);
  const handleCloseMenu = () => setHoveredNavLink(null);

  return (
    <header>
      <TopBar />
      <Sidebar open={sidebar} onClose={() => setSibar(false)} />
      <div className="relative w-full xl:py-2 bg-[url('/assets/header-bg.png')] md:bg-[url('/assets/header-bg.png'),_linear-gradient(to_right,var(--event-bg-light,#fff)_70%,var(--event-bg-dark,#FFF2CE)_90%)] bg-contain bg-no-repeat">
        <div className='max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8'>
          <div className="flex items-center gap-2 justify-between">
            <div className="flex gap-1 items-center">
              <FiAlignJustify
                color='#ffff'
                size={28}
                className="cursor-pointer xl:hidden"
                onClick={() => setSibar(true)}
              />
              <Link href="/">
                <Image
                  className='bg-none w-12 md:20 lg:w-24 xl:w-32'
                  priority
                  src="/logo.png"
                  alt="logo"
                  width={128}
                  height={32}
                  quality={100}
                />
              </Link>
            </div>
            <div className='hidden xl:block'>
              <DropdownMenu open={open} onOpenChange={setOpen}>
                <DropdownMenuTrigger className="flex items-center gap-1 font-bold hover:text-orange-500 text-base sm:text-lg transition-colors">
                  {open ? <FiX size={20} /> : <FiAlignJustify size={20} />}
                  <span className="hidden sm:inline">Categories</span>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  className="rounded-xl overflow-hidden p-0 shadow-lg !bg-white w-72 max-h-[500px]"
                >
                  {/* Lớp cuộn */}
                  <div className="overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-300 scrollbar-track-transparent">
                    {categories?.map((item, index) => (
                      <DropdownMenuItem key={index} className="p-0">
                        <Link
                          href={`/collection/${item.handle}`}
                          className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 font-bold w-full text-sm sm:text-lg"
                          onClick={handleCloseMenu}
                        >
                          {/* <Image
                            alt={item.name}
                            src={item.image}
                            width={40}
                            height={40}
                            className="rounded-md w-8 h-8 sm:w-11 sm:h-11"
                          /> */}
                          <span className="truncate">{t(item.name)}</span>
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className='w-full'>
              <Search onSearch={value => console.log(value)} />
            </div>
            <div className="items-center flex gap-2 sm:gap-4">
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center gap-2 hover:text-orange-500 transition-colors">
                    <User size={18} />
                    <span className="hidden md:inline text-sm">{user.first_name}</span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-48">
                    <DropdownMenuItem asChild>
                      <Link href="/account" className="w-full cursor-pointer">
                        <UserCircle /> User profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/orders" className="w-full cursor-pointer">
                       <MapIcon />  Address book
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/orders" className="w-full cursor-pointer">
                        <Package />  My orders
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/orders" className="w-full cursor-pointer">
                        <HeartHandshakeIcon />  Loyatly program
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="cursor-pointer text-red-600"
                      onClick={() => {
                        sessionStorage.removeItem('authToken');
                        localStorage.removeItem('authToken');
                        window.location.href = '/';
                      }}
                    >
                       <GiFountainPen />  Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link href="/signin">
                  <User
                    className="text-neutral-700 transition-colors hover:text-orange-500"
                    size={18}
                  />
                </Link>
              )}
              {sideNavLinks.map(([url, Icon]) => (
                <Link key={url} href={url}>
                  <Icon
                    className="text-neutral-700 transition-colors hover:text-orange-500"
                    size={18}
                  />
                </Link>
              ))}
            </div>
          </div>
          <ul className="mx-auto hidden max-w-7xl xl:flex w-full items-center justify-between px-2 sm:px-4 h-full flex-wrap gap-1">
            {navLinks.map((item, index) => (
              <li
                className={`font-medium text-xs sm:text-sm text-neutral-700 transition-colors ${hoveredNavLink === item && 'text-orange-500'
                  }`}
                key={index}
                onMouseEnter={() => handleShowMenu(item)}
                onMouseLeave={handleCloseMenu}
              >
                {item.collapsible ? (
                  <NavigationMenu>
                    <NavigationMenuItem className="hidden md:block">
                      <NavigationMenuTrigger className='bg-transperent text-xs sm:text-sm'>{item.name}</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-40 gap-2">
                          {item.name === 'Product' && categories?.map((category) => (
                            <li key={category.id}>
                              <NavigationMenuLink asChild>
                                <Link
                                  href={`/products/${category.handle}`}
                                  className="block p-1 rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                  <div className="font-medium text-sm">{category.name}</div>
                                  {category.description && (
                                    <div className="text-xs text-muted-foreground mt-1">
                                      {category.description}
                                    </div>
                                  )}
                                </Link>
                              </NavigationMenuLink>
                            </li>
                          ))}
                          {item.name === 'Blog' && (blog as unknown as { id: number; documentId?: string; Title: string; title?: string; Description?: string }[] | undefined)?.map((post) => (
                            <li key={post.id}>
                              <NavigationMenuLink asChild>
                                <Link
                                  href={`/blog/${post.documentId || post.id}`}
                                  className="block p-1 rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                  <div className="font-medium text-sm">
                                    {post.Title || post.title}
                                  </div>
                                  {post.Description && (
                                    <div className="text-xs text-muted-foreground mt-1 line-clamp-2">
                                      {post.Description}
                                    </div>
                                  )}
                                </Link>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenu>) : (
                  <Link
                    href={item.href}
                    className="flex h-full items-center px-2 sm:px-4 text-xs sm:text-sm"
                    onClick={handleCloseMenu}
                  >
                    {t(item.name)}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header >
  );
};
