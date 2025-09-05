import logo from '../assets/logo.png';

function Header() {
  return (
    <header className="bg-neutral-900 text-white p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">
          <img src={logo} alt="Logo" className="h-14"/>
        </div>

        <div className="flex items-center space-x-6">
          <a href="#" className="hover:text-yellow-400">Post Generator</a>
          <a href="#" className="hover:text-yellow-400">Join Community</a>
          <a href="#" className="border border-yellow-400 px-4 py-2 rounded-md text-yellow-400 hover:bg-yellow-400 hover:text-black">
            Log In / Sign Up
          </a>
        </div>
      </nav>
    </header>
  );
}

export default Header;