import { useState } from "react";

export default function campgroundResults({
  campgroundinfo,
  campResults,
  setViewport,
  setcampResults,
}) {
  const handleClick = (latitude, longitude) => {
    setViewport({
      latitude: latitude,
      longitude: longitude,
      zoom: 15,
    });
  };
  return (
    <>
      <ul>
        {campResults.map((campground) => {
          return (
            <div className="searchResults">
              {campground.link.length > 1 ? (
                <div className="buttonCard">
                  <a href={campground.link}>
                    <li>{campground.name}</li>
                  </a>
                  <button
                    type="button"
                    onClick={(e) => {
                      handleClick(campground.latitude, campground.longitude);
                    }}
                  >
                    View on Map
                  </button>
                </div>
              ) : (
                <li>{campground.name}</li>
              )}
            </div>
          );
        })}
      </ul>
    </>
  );
}
