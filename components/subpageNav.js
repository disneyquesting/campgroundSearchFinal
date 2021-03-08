import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import './subpageNav.module.sass';

export default function SecondNavigation() {
  const [isActive, setisActive] = useState(false);
  return (
    <nav
      className="navbar has-background-info-light"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand ">
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
        <a
          onClick={() => {
            setisActive(!isActive);
          }}
          onKeyPress={() => {
            setisActive(!isActive);
          }}
          role="button"
          tabIndex={0}
          className={`navbar-burger burger ${isActive ? 'is-active' : ''}`}
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarMainMenu"
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </a>
      </div>
      <div className="navbar-start" />
      <div className="navbar-end" id="navbarMain">
        <div
          id="navbarMainMenu"
          className={`navbar-menu is-size-7 is-uppercase ${
            isActive ? 'is-active' : ''
          }`}
        >
          <a className="navbar-item">
            <Link href="/">Home</Link>
          </a>
          <a className="navbar-item">
            <Link href="/camps?region=all&camptype=all&city=all&page=1">
              Find a Campground
            </Link>
          </a>
        </div>
      </div>
    </nav>
  );
}
