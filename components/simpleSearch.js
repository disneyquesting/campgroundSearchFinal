import Router, { useRouter } from 'next/router';
import { useState } from 'react';
import Nav from './nav';

export default function SimpleSearch() {
  const router = useRouter();
  const { query } = router;

  const [city, setSelect] = useState('all');

  const handleChange = e => {
    setSelect(e.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    Router.push(
      {
        pathname: '/camps',
        query: {
          city,
          campfeatures: 'all',
          region: 'all',
          camptype: 'all',
        },
      },
      undefined,
      { shallow: true }
    );
  };

  return (
    <section>
      <Nav />
      <section
        className="hero is-info is-fullheight is-full"
        style={{
          backgroundImage: "url('/cover2.jpg')",
          backgroundSize: 'cover',
        }}
      >
        <div className="hero-body">
          <div className="container has-text-centered">
            <p className="title has-text-white is-size-1 has-text-weight-light">
              Where is your next adventure?
            </p>
            <div className="columns is-centered">
              <div className="column is-centered is-3">
                <button
                  type="submit"
                  className="button is-info"
                  onClick={handleSubmit}
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
