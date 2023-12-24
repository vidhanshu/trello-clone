import Footer from './_components/footer';
import Navbar from './_components/navbar';

export default function MarketingLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="h-full">
      <Navbar />
      <main className="pt-40 pb-20 bg-slate-100 h-full">{children}</main>
      <Footer />
    </div>
  );
}
