import styled from "styled-components";
import Cookies from "js-cookie";
import Cart from "../Cart";

import Facebook from "../../../assets/images/facebook.png";
import Twitter from "../../../assets/images/twitter.png";
import Line from "../../../assets/images/line.png";
import Member from "../../../assets/images/member-mobile.png";

const Footer = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #313538;
`;

const LinksContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 1.5rem 0 0.5rem 0;
`;

const LinkColumn = styled.div`
  margin-right: 2.34375rem;
  margin-topL 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const FooterLink = styled.a`
  display: block;
  font-family: "Noto Sans TC-Regular", Helvetica;
  text-decoration: none;
  font-size: 1rem;
  padding: 0.3rem 0.3rem;
  color: white;

  &:hover {
    opacity: 0.7;
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
  margin-bottom: 5rem;
`;

const BottomLinkSection = styled.div`
  display: flex;
  //   position: fixed;
  width: 100%;
  padding: 0.5rem 0;
  bottom: 0;
  position: fixed;
  background-color: #313538;
`;

const BottomLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  border-right: 1px solid #828282;

  &:last-child {
    border-right: none;
  }
`;

const LinkText = styled.span`
  font-family: sans-serif;
  font-size: 1rem;
  font-weight: normal;
  color: white;
`;

const SocialContainer = styled.div`
  align-items: center;
`;

function MobileFooter() {
  return (
    <Footer>
      <LinksContainer>
        <LinkColumn>
          <FooterLink href="/">關於 STYLiSH</FooterLink>
          <FooterLink href="/">服務條款</FooterLink>
          <FooterLink href="/">隱私政策</FooterLink>
        </LinkColumn>
        <LinkColumn style={{ marginRight: "1.875rem" }}>
          <FooterLink href="/">聯絡我們</FooterLink>
          <FooterLink href="/">FAQ</FooterLink>
        </LinkColumn>
        <div>
          <SocialIcon src={Line} alt="line-icon" />
          <SocialIcon src={Twitter} alt="twitter-icon" />
          <SocialIcon src={Facebook} alt="facebook-icon" />
        </div>
      </LinksContainer>
      <Copyright>© 2023. All rights reserved.</Copyright>
      <BottomLinkSection>
        <BottomLink href="/checkout">
          <Cart />
          <LinkText>購物車</LinkText>
        </BottomLink>
        <BottomLink href={Cookies.get("token") ? "/user" : "/login"}>
          <img src={Member} alt="member" />
          <LinkText>會員</LinkText>
        </BottomLink>
      </BottomLinkSection>
    </Footer>
  );
}

export default MobileFooter;
