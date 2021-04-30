import Link from "next/link";
import styles from "./mapcard.module.sass";

export default function MapCard({ campground }) {
  return (
    <div className="cardInitDiv">
      <a
        href={`https://wordpress-385567-1777802.cloudwaysapps.com/${campground.uri}`}
        target="_blank"
      >
        <div className="card-image has-text-centered">
          {campground.acfDetails.picture.mediaItemUrl != null ? (
            <figure className="cardImage">
              <img
                src={campground.acfDetails.picture.mediaItemUrl}
                alt={`${campground.title}`}
                className={styles.cardImage}
              />
            </figure>
          ) : (
            <div className="noImageCard"></div>
          )}
        </div>
      </a>
      <div className="m-2">
        <div className="media-content">
          <a
            href={`https://wordpress-385567-1777802.cloudwaysapps.com/${campground.uri}`}
            target="_blank"
          >
            <div>
              <h2 className="title is-uppercase cardTitle has-text-centered">
                {campground.title}
              </h2>
            </div>
          </a>
          <p className="subtitle is-6 has-text-weight-medium cardRegion has-text-centered">
            {campground.acfDetails.city
              ? campground.acfDetails.city
              : campground.city}
          </p>
        </div>
        <div className="pt-4 is-italic cardFeaturesDiv">
          <p className="mb-0 has-text-centered">Features:</p>
          <div className="cardFeatures">
            <ul className="mt-2">
              {campground.features.nodes.map((feature) => {
                return <li key={feature.name}>{feature.name}</li>;
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
