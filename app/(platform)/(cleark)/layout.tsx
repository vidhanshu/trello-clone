import Logo from '@/components/logo';
import Link from 'next/link';

export default function ClearkLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="h-screen flex items-center justify-center">
      <main>
        <div className="mb-8">{children}</div>
        <div className="w-fit mx-auto">
          <Logo />
        </div>
      </main>
    </div>
  );
}
