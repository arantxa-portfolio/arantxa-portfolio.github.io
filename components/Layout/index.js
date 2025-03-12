import { Footer } from "../Footer";
import { Navbar } from "../Navbar";

export function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
