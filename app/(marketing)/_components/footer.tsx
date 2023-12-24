import Link from 'next/link';

import Logo from '@/components/logo';
import { Button } from '@/components/ui/button';

export default function Footer() {
  return (
    <header className="w-full fixed bottom-0 p-4 border-t bg-slate-100">
      <nav className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
        <Logo />
        <div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
          <Button size="sm" variant="ghost">
            Privacy Policy
          </Button>
          <Button size="sm" variant="ghost">
            Terms of Service
          </Button>
        </div>
      </nav>
    </header>
  );
}
