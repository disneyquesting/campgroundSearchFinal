import { useState } from "react";

export default function campgroundResults({
  campgroundinfo,
  campResults,
  setViewport,
  setcampResults,
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
            <div class="row1">
              <a href={campground.link}>
                <h2>{campground.name}</h2>
              </a>
              <div class="columnGrid has-text-centered">
                {campground.acfDetails != null ? (
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
            </div>
            <div class="row2">
              <div class="columnGrid">
                <div className="searchResults" key={index}>
                  {campground.link.length > 1 ? (
                    <div className="">
                      <p>{campground.address}</p>
                      <p>
                        {campground.city}, {campground.state}
                      </p>
                      <p>
                        Phone:
                        <a className="ml-2" href={`tel:${campground.phone}`}>
                          {campground.phone}
                        </a>
                      </p>
                      <p>
                        Website:
                        <a href={campground.website} className="ml-2">
                          {campground.website}
                        </a>
                      </p>
                      <p>
                        <a href={campground.link}>View More Details</a>
                      </p>
                      <a href="#map">
                        <button
                          type="button"
                          className="button"
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
                    </div>
                  ) : (
                    <h2>{campground.name}</h2>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
