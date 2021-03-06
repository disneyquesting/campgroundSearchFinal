import Link from "next/link";
import styles from "./mapcard.module.sass";

export default function MapCard({ campground }) {
    {console.log(campground)}
  return (
          <Link href={`/campgrounds/${campground.id}`}>
            <div className={`${styles.cardLink} card`}>
              <div className="card-image">
                <figure className="image is-4by3">
                  <img
                    src={
                      campground.acfDetails.picture
                        ? campground.acfDetails.picture.mediaItemUrl
                        : `/pin.png`
                    }
                    alt={
                      campground.acfDetails.picture
                        ? campground.acfDetails.picture.altText
                        : `${campground.title}`
                    }
                    className={styles.cardImage}
                  />
                </figure>
              </div>
              <div className="card-content">
                <div className="media-content">
                  <h2 className="title is-4">{campground.title}</h2>
                  <p className="subtitle is-6">
                    {campground.regions.nodes.map((region) => {
                      return <p key={region.id}>{region.name}</p>;
                    })}
                  </p>
                </div>
                <div className="content">
                  <p className="is-italic">Features:
                  {campground.features.nodes.map((feature) => {
                    return <li>{feature.name}</li>;
                  })}
                  </p>
                </div>
              </div>
            </div>
          </Link>
  );
}
