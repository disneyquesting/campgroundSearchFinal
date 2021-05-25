import { useState } from "react";

export default function campgroundResults({
  campgroundinfo,
  campResults,
  setViewport,
  setcampResults,
  allCampgrounds,
}) {
  const handleClick = (latitude, longitude) => {
    setViewport({
      latitude,
      longitude,
      zoom: 13,
    });
  };
  campResults.sort();

  return (
    <>
      {campResults.map((campground, index) => {
        return (
          <div className="searchResultsGrid">
            <div className="row0">
              <a href={campground.link}>
                <h2>{campground.name}</h2>
              </a>
            </div>
            <div className="row1">
              <div className="columnResults column1">
                {campground.acfDetails?.picture.mediaItemUrl ? (
                  <figure className="">
                    <img
                      src={campground.acfDetails.picture.mediaItemUrl}
                      alt={`${campground.title}`}
                    />
                  </figure>
                ) : (
                  <div className="noImageCard"></div>
                )}
              </div>
              <div className="columnResults column2 searchResults">
                {campground.link.length > 1 ? (
                  <>
                    <p>{campground.address}</p>
                    <p>
                      {campground.city}, {campground.state}
                    </p>
                    <p>
                      Phone:
                      <a className="ml-2" href={`tel:${campground.phone}`}>
                        {campground.phone.replace(
                          /(\d{3})(\d{3})(\d{4})/,
                          "($1)$2-$3"
                        )}
                      </a>
                    </p>
                    <p className="websiteLink">
                      <a href={campground.website}>{campground.website}</a>
                    </p>
                    <a href={campground.link}>
                      <button type="button" className="mr-5">
                        View More Details
                      </button>
                    </a>
                    <a href="#map">
                      <button
                        type="button"
                        className=""
                        onClick={(e) => {
                          handleClick(
                            campground.latitude,
                            campground.longitude
                          );
                        }}
                      >
                        View on Map
                      </button>
                    </a>
                  </>
                ) : (
                  <h2>{campground.name}</h2>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
