import React, { FC } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const ModalHeader = styled.header`
  position: relative;

  h2 {
    font-style: ${(props) => props.theme.headerTheme.fontStyle};
    font-weight: ${(props) => props.theme.headerTheme.fontWeight};
    font-size: ${(props) => `${props.theme.headerTheme.fontSize}px`};
    line-height: ${(props) => `${props.theme.headerTheme.lineHeight}%`};
  }

  .closeBtn {
    height: 20px;
    width: auto;
    position: absolute;
    top: 0px;
    right: 10px;
    border: 1px solid black;
    border-radius: 5px;
    background-color: transparent;
  }
`;

const ContentDiv = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  h4 {
    color: ${(props) => `${props.theme.cardTheme.descColor}`};
    font-weight: 500;
    font-size: 25px;
    line-height: 150%;
    text-align: center;
    margin-top: 100px;
  }

  .selectionBtn {
    height: 50px;
    width: 100px;
    border: 1px solid black;
    border-radius: 5px;
    background-color: transparent;
    border-radius: 14.5px;
    margin: 5px;

    span {
      font-size: 20px;
    }
  }
`;

type Props = {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setAlreadyAQRCode: React.Dispatch<React.SetStateAction<boolean>>;
};

const ModalAddItemContent: FC<Props> = ({
  setModalOpen,
  setAlreadyAQRCode,
}: Props) => (
  <>
    <ModalHeader>
      <h2>Lägg till en annons</h2>
      <button
        className="closeBtn"
        type="button"
        onClick={() => setModalOpen(false)}
      >
        X
      </button>
    </ModalHeader>

    <ContentDiv>
      <h4>Finns det redan en QR-kod på din pryl?</h4>
      <Link to="/add">
        <button
          className="selectionBtn"
          type="button"
          onClick={() => {
            setModalOpen(false);
            setAlreadyAQRCode(false);
          }}
        >
          <span>NEJ</span>
        </button>
      </Link>

      <Link to="/add">
        <button
          className="selectionBtn"
          type="button"
          onClick={() => {
            setModalOpen(false);
            setAlreadyAQRCode(true);
          }}
        >
          <span>JA</span>
        </button>
      </Link>
    </ContentDiv>
  </>
);

export default ModalAddItemContent;
