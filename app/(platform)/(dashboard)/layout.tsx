import Navbar from './_components/navbar';

export default function DashboardLayout({ children }: React.PropsWithChildren) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}
