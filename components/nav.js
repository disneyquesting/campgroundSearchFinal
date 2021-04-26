import Link from 'next/link';
import Image from 'next/image';

import { useState, useImperativeHandle, forwardRef } from 'react';
import './subpageNav.module.sass';

export default function Navigation() {
  const [isActive, setisActive] = useState(false);
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="sitelogo" href="https://www.ucampnh.com">
          <Image
            src="/campgroundlogo.png"
            alt="NH Campground Owners Association"
            layout="intrinsic"
            height={70}
            width={70}
          />
        </a>
        <h1 className="siteTitle">
          New Hampshire Campground Owners Association
        </h1>
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
      <div
        id="navbarMainMenu"
        className={`navbar-menu is-size-7 is-uppercase ${
          isActive ? 'is-active' : ''
        } `}
      >
        <div className="navbar-start" id="navbarMain">
          <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link">Explore NH</a>
            <div className="navbar-dropdown">
              <a
                className="navbar-item"
                href="https://www.ucampnh.com/dartmouth-sunapee/"
              >
                Dartmouth / Sunapee
              </a>
              <a
                className="navbar-item"
                href="https://www.ucampnh.com/great-north-woods/"
              >
                Great North Woods
              </a>
              <a
                className="navbar-item"
                href="https://www.ucampnh.com/lakes-region/"
              >
                Lakes Region
              </a>
              <a
                className="navbar-item"
                href="https://www.ucampnh.com/monadnock/"
              >
                Monadnock
              </a>
              <a
                className="navbar-item"
                href="https://www.ucampnh.com/seacoast/"
              >
                Seacoast
              </a>
              <a
                className="navbar-item"
                href="https://www.ucampnh.com/south-central-merrimack/"
              >
                South Central / Merrimack
              </a>
              <a
                className="navbar-item"
                href="https://www.ucampnh.com/white-mountains/"
              >
                White Mountains
              </a>
            </div>
          </div>

          <a
            className="navbar-item"
            href="https://www.ucampnh.com/nh-camping-rv-show/"
          >
            NH Camping & RV Show
          </a>

          <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link">Resources</a>
            <div className="navbar-dropdown">
              <a
                className="navbar-item"
                href="https://www.ucampnh.com/affiliate-members/"
              >
                Affiliate Members
              </a>

              <a
                className="navbar-item"
                href="https://www.ucampnh.com/nh-rv-dealers/"
              >
                NH RV Dealers
              </a>
              <a
                className="navbar-item"
                href="https://www.ucampnh.com/helpful-links/"
              >
                Helpful Links
              </a>
              <a
                className="navbar-item"
                href="https://www.ucampnh.com/nh-travel-info"
              >
                NH Travel Info
              </a>
            </div>
          </div>

          <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link">About Us</a>
            <div className="navbar-dropdown">
              <a
                className="navbar-item"
                href="https://www.ucampnh.com/who-we-are/"
              >
                Who We Are
              </a>

              <a
                className="navbar-item"
                href="https://www.ucampnh.com/contact-us/"
              >
                Contact Us
              </a>
            </div>
          </div>

          <a
            className="navbar-item"
            href="https://www.ucampnh.com/member-login/"
          >
            Member Login
          </a>
        </div>
      </div>

      <div className="navbar-end" />
    </nav>
  );
}
