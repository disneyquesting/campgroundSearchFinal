import Nav from './nav';

export default function Layout({ children, pageTitle }) {
  return (
    <div>
      <div>{children}</div>
    </div>
  );
}
