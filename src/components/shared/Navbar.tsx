import TopBar from "./navbar/TopBar";
import SecondaryNav from "./navbar/SecondaryNav";
import NavbarClient from "./navbar/NavbarClient";

export default function Navbar() {
  return (
    <header>
      <TopBar />
      <NavbarClient />
      <SecondaryNav />
    </header>
  );
}
