import React, { FC } from "react";
import QRCode from "qrcode.react";
import styled from "styled-components";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import HBGLogo from "../pics/HBG_logo_staende_SV.jpg";

const QRCodeCont = styled.div`
  display: flex;
  margin-bottom: 1em;
  margin-top: 25px;
  align-items: center;
  flex-direction: column;
  #labelDiv {
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
  const downloadLabel = () => {
    const doc = new jsPDF("l", "px", [265, 121], true);

    const pdfDiv: any | null = document.getElementById("labelDiv");
    console.log(doc);

    if (pdfDiv !== null) {
      doc.html(pdfDiv, {
        callback: function (doc) {
          doc.save(`${id}.pdf`);
        },
      });
    }
  };
  return (
    <QRCodeCont>
      <p className="pDownload">
        Klicka på etiketten nedan för att ladda ner den som PDF
      </p>
      <div
        onClick={downloadLabel}
        className="labelDiv"
        id="labelDiv"
        style={{
          width: "265px",
          height: "121px",
          padding: "5px",
        }}
      >
        <p
          className="pTop"
          style={{ fontSize: "20px", margin: "2px 0px 0px 10px" }}
        >
          DEN HÄR KAN DU <strong>HAFFA</strong>
        </p>
        <p style={{ fontSize: "11px", margin: "2px 0px 0px 10px" }}>
          <strong>Återbruka, dela, cirkulera mera</strong> i Helsingborg.
        </p>
        <p style={{ fontSize: "9px", margin: "2px 0px 0px 10px" }}>
          Scanna QR-koden och bidra till en mer hållbar värld.
        </p>
        <div
          className="qrAndLogoDiv"
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "7px 16px 7px 16px",
          }}
        >
          <QRCode value={id} id="mycanvas" size={50} />
          <img
            src={HBGLogo}
            alt="Helsingborg logga"
            width="46"
            height="48"
            style={{ paddingLeft: "130px" }}
          />
        </div>
      </div>
    </QRCodeCont>
  );
};

export default QRCodeContainer;
