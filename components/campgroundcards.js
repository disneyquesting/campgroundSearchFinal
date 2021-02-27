import Link from "next/link";
import Image from "next/image";

export default function CampgroundCards({ campgrounds }) {
  return (
    <div>
      {campgrounds.map(({ node }) => {
        return (
          <li key={node.id}>
            <p>{node.title}</p>
            <p>
              Region:
              {node.regions.nodes.map((region) => {
                return(
                <li key={region.id}>{region.name}</li>
                )
              })}
            </p>
            <Link href={`/campgrounds/${node.id}`}>
              <img
                src={node.acfDetails.picture.mediaItemUrl}
                alt={node.acfDetails.picture.altText}
                height="200"
                width="300"
              />
            </Link>
            <p>Features:
              {node.features.nodes.map((feature) => {
                return (
                  <li>{feature.name}</li>
                )
              })}
            </p>
          </li>
        );
      })}
    </div>
  );
}
