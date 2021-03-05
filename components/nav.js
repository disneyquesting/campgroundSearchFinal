import Link from 'next/link';
import Image from 'next/image';

export default function Navigation() {
  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-brand">
          <a className="navbar-item">
            <Link href="/">
              <Image
                src="/campgroundlogo.png"
                alt="NH Campground Owners Association"
                height={500}
                width={500}
              />
            </Link>
          </a>
        </div>
        <div id="navbarMenuHeroA" className="navbar-menu">
          <div className="navbar-end">
            <a className="navbar-item is-active">
              <Link href="/">Home</Link>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
