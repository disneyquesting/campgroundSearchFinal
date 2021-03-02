import { useRouter } from 'next/router';
import { useState } from 'react';
import { ViewportContextProvider } from '../lib/state';
import { getCampgroundsByCity } from '../lib/api';

export default function Search({ viewport, setViewport, cities }) {
  const [view, setView] = useState();

  const handleChange = e => {
    setView(e.target.value);
  };

  const updateViewport = async event => {
    event.preventDefault();

    const campgroundsbycity = await getCampgroundsByCity('Bethlehem');
    console.log(view);

    return (
      <form onSubmit={updateViewport}>
        <label htmlFor="city">City</label>
        <select value={view} onChange={handleChange}>
          {cities.nodes.map(town => {
            return (
              <option value={town.acfDetails.city}>
                {town.acfDetails.city}
              </option>
            );
          })}
        </select>
        <button type="submit">Submit</button>
      </form>
    );
  };
}
