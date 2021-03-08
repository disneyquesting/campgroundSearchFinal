import Link from 'next/link';
import styles from './mapcard.module.sass';

export default function MapCard({ campground }) {
  return (
    <Link href={`/campgrounds/${campground.id}`}>
      <div className={`${styles.cardLink} card has-text-centered`}>
        <div className="card-image">
          <figure className="image is-3by2">
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
            <p className="subtitle is-6 pt-5 has-text-weight-medium">
              {campground.regions.nodes.map(region => {
                return (
                  <h3
                    className="is-size-7 is-uppercase has-text-info-dark"
                    key={region.id}
                  >
                    {region.name}
                  </h3>
                );
              })}
            </p>
          </div>
          <div className="content pt-5">
            <p className="is-italic">
              Features:
              {campground.features.nodes.map(feature => {
                return <li>{feature.name}</li>;
              })}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
