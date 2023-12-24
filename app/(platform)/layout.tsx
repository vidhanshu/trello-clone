import { ClerkProvider } from '@clerk/nextjs';

export default function PlatformLayout({ children }: React.PropsWithChildren) {
  return <ClerkProvider>{children}</ClerkProvider>;
}
