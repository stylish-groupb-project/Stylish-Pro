import styled from 'styled-components';
import Cookies from "js-cookie";
import SearchBar from "./SearchBar";
import Cart from "../Cart";
import '../hover.css'
import Logo from "../../../assets/images/logo.png";
import Member from "../../../assets/images/member.png";
import HoveredMember from "../../../assets/images/member-hover.png";

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 10;
  background-color: white;
  display: flex;
  justify-content: space-between;
  padding-top: 1.625rem;
  padding-bottom: 1.625rem;
  border-bottom: 40px solid #313538;
  margin-bottom: 8.875rem;
  
`;

const LeftSection = styled.div`
  display: flex;
  align-items: flex-end;
  margin-left: 3.75rem;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  margin-right: 3.375rem;
`;
//"Noto Sans TC-Regular", Helvetica;
const NavLink = styled.a`
  padding: 0 1.3rem 0 2rem;
  font-size: 1.25rem;
  letter-spacing: 1.25rem;
  text-decoration: none;
  transition: color 0.3s;
  font-weight: normal;
  color: #3f3a3a;
  border-right: 1px solid #3F3A3A;
  &:hover {
    color: brown;
  }
  &:last-child {
    border-right: none;
  }
`;
const Category = styled.div`
text-align: center;
  padding-left: 3rem;
  font-family: "Noto Sans TC-Regular", Helvetica;
`;


// wrong set for hover

// const MemberIcon = styled.img`
//   cursor: pointer;
//   opacity: 0.5

//   &:hover {
//     opacity: 0.5
//   }
// `;

// const HoveredMemberIcon = styled.img`
//   display: none;
//   position: absolute
//   top: 0;
//   left: 0;

//   &:hover {
//     display: block;
//   }
// `;

const DesktopHeader = () => (
    <HeaderContainer>
        <LeftSection>
            <a href="/">
                <img src={Logo} alt="logo" width={258} height={48} />
            </a>
            <Category>
                <NavLink href="/women">女裝</NavLink>
                <NavLink href="/men">男裝</NavLink>
                <NavLink href="/accessories">配件</NavLink>
            </Category>
        </LeftSection>
        <RightSection>
            <SearchBar />
            <a href="/checkout" style={{ margin: '0 2.625rem' }}>
                <Cart />
            </a>
            <a href={Cookies.get("token") ? "/user" : "/login"}>
                <div className='profile-container'>
                    <img className="profile" alt="Profile" src={Member} />
                    <img className="profile-hover" alt="Profile" src={HoveredMember} />
                </div>
                
            </a>
        </RightSection>
    </HeaderContainer>
);

export default DesktopHeader;
