import Link from 'next/link'
import Image from 'next/image'
import { getUser } from '@/lib/auth'
import { SearchButton } from './SearchButton'
import { ThemeToggle } from './ThemeToggle'
import LogoutButton from './LogoutButton'
import { Button } from '@/components/ui/button'
import MobileMenu from '@/components/MobileMenu'

export default async function Navbar() {
  const userData = await getUser()

  const navItems = ['Tech & Science', 'Food & Travel', 'Sports', 'Automotive', 'Business', 'Woman', 'Mom', 'Lifestyle']
  

  return (
    <header className="bg-white border-hidden sticky top-0 z-50 dark:bg-gray-950 shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <MobileMenu navItems={navItems} isLoggedIn={!!userData} />
            <Link href="/" className="flex items-center space-x-2">
              <Image 
                src="/REILOGO.svg" 
                alt="REI Logo" 
                width={40} 
                height={40} 
                className="w-10 h-10" 
              />
              <span className="text-2xl font-bold text-indigo_dye-500 dark:text-white">
                Real Estate Indonesia Jatim
              </span>
            </Link>
          </div>

          <div className="hidden lg:flex items-center space-x-4">
            <SearchButton />
            <ThemeToggle />
            {userData ? (
              <>
                {userData.roles === 'admin' && (
                  <Button variant="ghost" asChild>
                    <Link href="/admin">Admin</Link>
                  </Button>
                )}
                <LogoutButton />
              </>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link href="/login">Login</Link>
                </Button>
                <Button variant="secondary" asChild>
                  <Link href="/register">Register</Link>
                </Button>
              </>
            )}
          </div>

          <div className="flex lg:hidden items-center space-x-2">
            <SearchButton />
          </div>
        </div>

        <nav className="mt-4 hidden lg:block">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {navItems.map((item) => (
              <li key={item}>
                <Link
                  href={`/${item.toLowerCase().replace(/ & /g, '-')}`}
                  className="text-muted-foreground hover:text-foreground transition duration-200"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
