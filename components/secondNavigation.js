import Link from "next/link";
import Image from "next/image";

import { useState, useImperativeHandle, forwardRef } from "react";
import "./subpageNav.module.sass";

const NHLogo = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    alertMessge: () => {
      alert("Hello world");
    },
  }));

  return (
    <div>
      <Image
        src="/campgroundlogo.png"
        alt="NH Campground Owners Association"
        height={500}
        width={500}
      />
    </div>
  );
});

export default function SecondNavigation() {
  const [isActive, setisActive] = useState(false);
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand ">
        <Link href="/">
          <a className="navbar-item">
            <Image
              src="/campgroundlogo.png"
              alt="NH Campground Owners Association"
              height={500}
              width={500}
            />
          </a>
        </Link>
        <a
          onClick={() => {
            setisActive(!isActive);
          }}
          onKeyPress={() => {
            setisActive(!isActive);
          }}
          role="button"
          tabIndex={0}
          className={`navbar-burger burger ${isActive ? "is-active" : ""}`}
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
          isActive ? "is-active" : ""
        }`}
      >
        <div className="navbar-start" id="navbarMain">
          <Link href="/">
            <a className="navbar-item">Home</a>
          </Link>
          <Link href="/camps?region=all&camptype=all&city=all&campfeatures=all">
            <a className="navbar-item">Find a Campground</a>
          </Link>
        </div>
      </div>

      <div className="navbar-end"></div>
    </nav>
  );
}
