import Router, { useRouter } from "next/router";
import { useState } from "react";
import Nav from "./nav";

export default function SimpleSearch({ cities }) {
  const router = useRouter();
  const { query } = router;

  const [city, setSelect] = useState("all");

  const handleChange = (e) => {
    setSelect(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    Router.push(
      {
        pathname: "/camps",
        query: {
          city: city,
          campfeatures: "all",
          region: "all",
          camptype: "all",
        },
      },
      undefined,
      { shallow: true }
    );
  };

  return (
    <section
      className="hero is-info is-fullheight is-full"
      style={{
        backgroundImage: "url('/cover2.jpg')",
        backgroundSize: "cover",
      }}
    >
      <div className="hero-head">
        <Nav />
      </div>
      <div className="hero-body">
        <div className="container has-text-centered">
          <p className="title has-text-white is-size-1 has-text-weight-light">
            Where is your next adventure?
          </p>
          <div className="columns is-centered">
            <div className="column is-centered is-3">
              <form onSubmit={handleSubmit}>
                <div className="field has-addons">
                  <div className="control is-expanded">
                    <div className="select is-fullwidth">
                      <select
                        className="input is-rounded"
                        name="city"
                        onChange={handleChange}
                      >
                        <option value="all">All</option>
                        {cities.map((town) => {
                          return (
                            <option key={town} value={town}>
                              {town}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                  <div className="control">
                    <button type="submit" className="button is-info">
                      Bon Voyage
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
