import Link from "next/link";
import Image from "next/image";

export default function SecondNavigation() {
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
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
      <div id="navbarMain" className="navbar-menu"></div>
      <div className="navbar-end">
        <div className="navbar-start">
          <a class="navbar-item is-size-7 is-uppercase">
            <Link href="/">Home</Link>
          </a>
          <a className="navbar-item is-size-7 is-uppercase">
            <Link href="/camps?region=all&camptype=all&city=all&page=1">
              Find a Campground
            </Link>
          </a>
        </div>
      </div>
    </nav>
  );
}
