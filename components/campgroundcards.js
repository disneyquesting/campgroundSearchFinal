import Link from "next/link";
import styles from "./campgroundcards.module.sass";

export default function CampgroundCards({ campgrounds }) {
  return (
    <div>
      <Link href={`/campgrounds/${campground.id}`}>
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
            <></>
          )}
        </div>
      </Link>
      <div className="m-2">
        <div className="media-content">
          <Link href={`/campgrounds/${campground.id}`}>
            <div>
              <h2 className="title is-4 is-uppercase cardTitle has-text-centered">
                {campground.title}
              </h2>
            </div>
          </Link>
          <p className="subtitle is-6 pt-5 has-text-weight-medium cardSubtitle has-text-centered">
            {campground.regions.nodes.map((region) => {
              return (
                <h3 className="is-size-7 is-uppercase" key={region.id}>
                  {region.name}
                </h3>
              );
            })}
          </p>
        </div>
        <div className="pt-4 is-italic">
          <p className="is-size-5 mb-0 has-text-centered">Features:</p>
          <div className="cardFeatures">
            <ul className="mt-2">
              {campground.features.nodes.map((feature) => {
                return <li>{feature.name}</li>;
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
