import Link from 'next/link';
import styles from './campgroundcards.module.sass';

export default function CampgroundCards({ campgrounds }) {
  return (
    <div className="columns is-multiline">
      {campgrounds.map(({ node }) => {
        return (
          <Link href={`/campgrounds/${node.id}`}>
            <div
              className={`${styles.cardLink} has-text-centered card mb-5 mr-5`}
            >
              <div className="card-image">
                <figure className="image is-3by2">
                  <img
                    src={
                      node.acfDetails.picture
                        ? node.acfDetails.picture.mediaItemUrl
                        : `/pin.png`
                    }
                    alt={
                      node.acfDetails.picture
                        ? node.acfDetails.picture.altText
                        : `${node.title}`
                    }
                    className={styles.cardImage}
                  />
                </figure>
              </div>
              <div className="card-content">
                <div className="media-content">
                  <h2 className="title is-4">{node.title}</h2>
                  <p className="subtitle is-6 pt-2 has-text-weight-medium">
                    {node.regions.nodes.map(region => {
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
                <div className="content pt-2">
                  <p className="is-italic">
                    Features:
                    {node.features.nodes.map(feature => {
                      return <li>{feature.name}</li>;
                    })}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
