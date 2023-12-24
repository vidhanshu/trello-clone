import Link from 'next/link';

import Logo from '@/components/logo';
import { Button } from '@/components/ui/button';

export default function Navbar() {
  return (
    <header className="w-full fixed top-0 h-14 px-4 border-b shadow-sm bg-white flex items-center">
      <nav className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
        <Logo />
        <div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
          <Button asChild size="sm" variant="outline">
            <Link href="/sign-in">Login</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/sign-up">Get vello for free</Link>
          </Button>
        </div>
      </nav>
    </header>
  );
}
