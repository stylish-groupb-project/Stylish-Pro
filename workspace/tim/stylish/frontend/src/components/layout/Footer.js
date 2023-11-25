import useCheckResponsive from "../../hooks/checkRwd";
import MobileFooter from "./footer/MobileFooter";
import DesktopFooter from "./footer/DesktopFooter";

const Footer = () => {
  const isMobile = useCheckResponsive();

  return isMobile ? <MobileFooter /> : <DesktopFooter />;
};

export default Footer;