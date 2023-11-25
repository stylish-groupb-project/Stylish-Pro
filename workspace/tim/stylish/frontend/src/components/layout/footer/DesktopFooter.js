import styled from 'styled-components';

import Facebook from "../../../assets/images/facebook.png";
import Twitter from "../../../assets/images/twitter.png";
import Line from "../../../assets/images/line.png";

const Footer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 0; /* py-8 */
  background-color: #313538;
`;

const LinksContainer = styled.div`
  margin-right: 6.25rem;
`;

const FooterLink = styled.a`
  padding: 0 1.25rem;
  font-family: "Noto Sans TC-Regular", Helvetica;
  font-size: 1rem;
  color: white;
  border-right: 1px solid #828282;
  &:hover {
    opacity: 0.7;
  }
  &:last-child {
    border-right: none;
  }
`;

const SocialIcon = styled.img`
  margin-right: 1.875rem;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
`;

const Copyright = styled.p`
  color: #828282;
  font-size: 0.75rem;
  font-weight: normal;
`;

function DesktopFooter() {
  return (
    <Footer>
      <LinksContainer>
        <FooterLink href="/">關於 STYLiSH</FooterLink>
        <FooterLink href="/">服務條款</FooterLink>
        <FooterLink href="/">隱私政策</FooterLink>
        <FooterLink href="/">聯絡我們</FooterLink>
        <FooterLink href="/" style={{ borderRight: 'none' }}>FAQ</FooterLink>
      </LinksContainer>
      <div>
        <SocialIcon src={Line} alt="line-icon" />
        <SocialIcon src={Twitter} alt="twitter-icon" />
        <SocialIcon src={Facebook} alt="facebook-icon" />
      </div>
      <Copyright>
        © 2023. All rights reserved.
      </Copyright>
    </Footer>
  );
}

export default DesktopFooter;
