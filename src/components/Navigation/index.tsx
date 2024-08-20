'use client'

import { useAuth } from "@/context/AuthContext";
import { Button } from "@nextui-org/button"
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from "@nextui-org/navbar"
import Link from "next/link"
import { Avatar } from "@nextui-org/avatar"
import { usePathname } from "next/navigation";
import React, { useMemo } from "react";

type MenuItem = {
  friendlyName: string
  href: string
}

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const pathname = usePathname();
  const { user } = useAuth();

  const menuItems: MenuItem[] = useMemo(() => [
    { friendlyName: "Search", href: "/search" },
    { friendlyName: "Sets", href: "/sets" },
    { friendlyName: "Profile", href: `/u/${user?.username}` },
    { friendlyName: 'My Collection', href: `/u/${user?.username}/collection` },
    { friendlyName: 'My Decks', href: `/u/${user?.username}/decks` },
    { friendlyName: 'Sign Out', href: '/logout' }
  ], [user]);

  if (pathname === "/login" || pathname === "/register" || pathname === '/logout') return null

  return (
    <Navbar key={user?._id} isBordered isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link href="/">
            <p className="font-bold text-inherit">DEX BUILDER</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive={pathname === '/search'}>
          <Link color="foreground" href="/search">
            Search
          </Link>
        </NavbarItem>
        <NavbarItem isActive={pathname === '/sets'}>
          <Link color="foreground" href="/sets">
            Sets
          </Link>
        </NavbarItem>
        {user && (
          <NavbarItem isActive={pathname === `/u/${user.username}/collection`}>
            <Link href={`/u/${user?.username}/collection`} aria-current="page">
              My Collection
            </Link>
          </NavbarItem>
        )}
        {user && (
          <NavbarItem isActive={pathname === `/u/${user.username}/decks`}>
            <Link color="foreground" href={`/u/${user?.username}/decks`}>
              My Decks
            </Link>
          </NavbarItem>
        )}
        {user && (
        <NavbarItem isActive={pathname === `/u/${user.username}`}>
          <Link color="foreground" href={`/u/${user.username}`}>
            <Avatar isBordered={pathname === `/u/${user.username}`} size="md" src={user?.photoURL as string} name={user?.username} />
          </Link>
        </NavbarItem>
        )}
      </NavbarContent>
      {!user && (
        <NavbarContent justify="end">
          <NavbarItem>
            <Link href="/login">Login</Link>
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} color="primary" href="/register" variant="flat">
              Sign Up
            </Button>
          </NavbarItem>
        </NavbarContent>
      )}
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem onClick={() => setIsMenuOpen(false)} key={`${item}-${index}`}>
            <Link
              color={
                index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
              }
              className="w-full"
              href={item.href}
            >
              {item.friendlyName}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}

export default Navigation