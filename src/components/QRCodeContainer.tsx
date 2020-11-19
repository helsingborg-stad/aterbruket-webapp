import React, { FC } from "react";
import QRCode from "qrcode.react";
import styled from "styled-components";
import HBGLogo from "../pics/HBG_logo_staende_SV.jpg";

const QRCodeCont = styled.div`
  display: flex;
  margin-bottom: 5em;
  margin-top: 25px;
  align-items: center;
  flex-direction: column;
  .labelDiv {
    border: 1px solid black;
    width: 265px;
    height: 121px;
     border-radius: 9.5px;
    box-shadow: 0px 0px 2px rgba(98, 98, 98, 0.18),
      0px 1px 2px rgba(98, 98, 98, 0.18);
  }
  p {
    margin: 2px 0px 0px 10px;
    font-size: 11px;
  }
  .pTop {
    font-size: 20px;
  }
  .qrAndLogoDiv {
    display: flex;
    justify-content: space-between;
    padding: 7px 16px 7px 16px;
   
  }
  .pDownload {
    color: grey;
    font-style: italic;
    font-size: 0.8em;
    text-align: center;
  }
  img {
    width: 46px;
    height: 48px;
    margin-top: 4px;
  }
`;

interface IProps {
  id: string;
}

const QRCodeContainer: FC<IProps> = ({ id }: IProps) => {
  const downloadQRCode = () => {
    const canvas: HTMLElement | null = document.getElementById("mycanvas");
    if (canvas !== null) {
      const image = (canvas as HTMLCanvasElement).toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.href = image;
      downloadLink.download = `${id}.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };
  return (
    <QRCodeCont>
      <div className="labelDiv">
        <p className="pTop">
          DEN HÄR KAN DU <strong>HAFFA</strong>
        </p>
        <p>
          <strong>Återbruka, dela, cirkulera mera</strong> i Helsingborg.
        </p>
        <p>Scanna QR-koden och bidra till en mer hållbar värld.</p>
        <div className="qrAndLogoDiv">
          <QRCode value={id} id="mycanvas" size={50} onClick={downloadQRCode} />
          <img src={HBGLogo} alt="Helsingborg logga" />
        </div>
      </div>
      <p className="pDownload">
        Klicka på etiketten ovan för att ladda ner den
      </p>
    </QRCodeCont>
  );
};

export default QRCodeContainer;
