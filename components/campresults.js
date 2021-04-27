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
      zoom: 13,
    });
  };
  campResults.sort();
  return (
    <>
      {campResults.map((campground, index) => {
        return (
          <div className="searchResults" key={index}>
            {campground.link.length > 1 ? (
              <div className="buttonCard">
                <a href={campground.link}>
                  <h2>{campground.name}</h2>
                </a>
                <p>{campground.city}</p>
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
              <h2>{campground.name}</h2>
            )}
          </div>
        );
      })}
    </>
  );
}
