import Link from "next/link";
import styles from "./mapcard.module.sass";

export default function MapCard({ campground }) {
  return (
    <div className="cardGrid">
      <div className="cardRow1">
        <a
          href={`https://www.nhlovescampers.com/${campground.uri}`}
          target="_blank"
        >
          <div>
            <h2 className="title is-uppercase cardTitle has-text-centered">
              {campground.title}
            </h2>
          </div>
        </a>
      </div>
      <div className="cardRow2">
        <div className="cardCol2">
          <p className="cardRegion">
            {campground.acfDetails.address
              ? campground.acfDetails.address
              : campground.address}
            <br />
            {campground.acfDetails.city
              ? campground.acfDetails.city
              : campground.city}
            ,{" "}
            {campground.acfDetails.state
              ? campground.acfDetails.state
              : campground.state}
          </p>
          <a
            href={`https://www.nhlovescampers.com/${campground.uri}`}
            target="_blank"
            className="cardProfileLink"
          >
            View Profile
          </a>
        </div>
      </div>
    </div>
  );
}
