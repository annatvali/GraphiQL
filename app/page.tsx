import Header from './components/Header';
import Footer from './components/Footer';
import './globals.css';

export default function Home() {
  return (
    <div className="flex flex-col max-w-screen-xl px-4 mx-auto min-h-screen">
      <Header />
      <main className="main">
        <h1 className="title">Welcome to Our API Client</h1>
        <p>A powerful tool for testing and interacting with your APIs.</p>
        <div className="buttons buttons_main">
          <button className="button sign-in">Sign In</button>
          <button className="button sign-up">Sign Up</button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
