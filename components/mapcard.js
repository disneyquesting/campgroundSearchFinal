import Link from "next/link";
import styles from "./mapcard.module.sass";

export default function MapCard({ campground }) {
  return (
    <div className="cardInitDiv">
      <Link
        href={`https://wordpress-385567-1777802.cloudwaysapps.com/${campground.uri}`}
      >
        <div className="card-image has-text-centered">
          {campground.acfDetails.picture ? (
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
      </Link>
      <div className="m-2">
        <div className="media-content">
          <Link
            href={`https://wordpress-385567-1777802.cloudwaysapps.com/${campground.uri}`}
          >
            <div>
              <h2 className="title is-uppercase cardTitle has-text-centered">
                {campground.title}
              </h2>
            </div>
          </Link>
          <p className="subtitle is-6 has-text-weight-medium cardRegion has-text-centered">
            {campground.regions.nodes.map((region) => {
              return (
                <h3 className="is-size-7 is-uppercase" key={region.id}>
                  {region.name}
                </h3>
              );
            })}
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
