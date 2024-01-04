import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import LuckyWheel from "./LotteryWheel";
import styled from "styled-components";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* Adjust the opacity as needed */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const LotteryModal = ({ onClose }) => {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose(); // Close the modal when clicking on the overlay
    }
  };

  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === "Escape") {
        onClose(); // Close the modal when pressing the Escape key
      }
    };

    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [onClose]);

  return ReactDOM.createPortal(
    <ModalOverlay onClick={handleOverlayClick}>
      <LuckyWheel onClose={onClose} />
    </ModalOverlay>,
    document.body
  );
};

export default LotteryModal;
