import Link from "next/link";
import Image from "next/image";
import { useState, useImperativeHandle, forwardRef } from "react";
import styles from "./nav.module.sass";

export default function Navigation() {
  const [isActive, setisActive] = useState(false);
  return (
    <div className="hero-head">
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand ">
          <section className="navbar-item">
            <Link href="/">
              <a>
                <Image
                  src="/campgroundlogo.png"
                  alt="NH Campground Owners Association"
                  height={500}
                  width={500}
                />
              </a>
            </Link>
          </section>
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
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
        <div className="navbar-start" />
        <div className="navbar-end" id="navbarMain">
          <div
            id="navbarMainMenu"
            className={`navbar-menu is-size-7 is-uppercase ${
              isActive ? "is-active" : ""
            }`}
          >
            <Link href="/">
              <a className="navbar-item">Home</a>
            </Link>

            <Link href="/camps?region=all&camptype=all&city=all&campfeatures=all">
              <a className="navbar-item">Find a Campground</a>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
