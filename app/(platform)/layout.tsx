import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from 'sonner';

export default function PlatformLayout({ children }: React.PropsWithChildren) {
  return (
    <ClerkProvider>
      <Toaster />
      {children}
    </ClerkProvider>
  );
}
