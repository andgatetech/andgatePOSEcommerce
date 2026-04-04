import TopBar from "./navbar/TopBar";
import MainHeader from "./navbar/MainHeader";
import SecondaryNav from "./navbar/SecondaryNav";
import MobileHeader from "./navbar/MobileHeader";

export default function Navbar() {
  return (
    <header>
      <TopBar />
      <MainHeader />
      <SecondaryNav />
      <MobileHeader />
    </header>
  );
}
