'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

interface MobileMenuProps {
  navItems: string[]
  isLoggedIn: boolean
}

export default function MobileMenu({ navItems, isLoggedIn }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <nav className="mt-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item}>
                <Link
                  href={`/${item.toLowerCase().replace(/ & /g, '-')}`}
                  className="block py-2 text-lg hover:text-teal-600 transition duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-8 space-y-4">
          {isLoggedIn ? (
            <Button className="w-full" onClick={() => setIsOpen(false)}>
              Logout
            </Button>
          ) : (
            <>
              <Button className="w-full" asChild>
                <Link href="/login" onClick={() => setIsOpen(false)}>Login</Link>
              </Button>
              <Button className="w-full" variant="outline" asChild>
                <Link href="/register" onClick={() => setIsOpen(false)}>Register</Link>
              </Button>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}

