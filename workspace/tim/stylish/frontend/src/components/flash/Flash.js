import styled from "styled-components";
import flashIcon from "../../assets/images/flash.png";
import { useNavigate } from "react-router-dom";

const FlashBtn = styled.img`
  width: 70px;
  position: fixed;
  bottom: 80px;
  right: 5px;
  cursor: pointer;
  transition: transform 200ms cubic-bezier(0.5, 0, 0.5, 1);

  @media screen and (max-width: 1279px) {
    width: 80px;
    position: fixed;
    bottom: 140px;
    right: 0px;
    cursor: pointer;
    background-color: #fafafa;
    border-radius: 9999px;
    box-shadow: -9px 10px 30px rgba(112, 112, 112, 0.35);
  }

  &:hover {
    transform: scale(1.2);
    // Add any other styles you want to apply on hover
  }
`;

const Flash = () => {
  const navigate = useNavigate();

  return (
    <FlashBtn
      src={flashIcon}
      onClick={() => {
        navigate("/flash");
      }}
    />
  );
};

export default Flash;
