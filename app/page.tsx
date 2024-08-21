import Header from './components/Header';
import Footer from './components/Footer';
import './globals.css';

export default function Home() {
  return (
    <div className="flex flex-col max-w-screen-xl px-4 mx-auto min-h-screen">
      <Header />
      <main className="flex flex-col p-2.5 flex-1">
        <h1 className="color-white text-[45px] font-medium">Welcome to Our API Client</h1>
        <p>A powerful tool for testing and interacting with your APIs.</p>
      </main>
      <Footer />
    </div>
  );
}
