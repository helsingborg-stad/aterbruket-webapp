import React from "react";
import QRCode from "qrcode.react";
import styled from "styled-components";

const QRCodeCont = styled.div`
  display: flex;
  margin-bottom: 7em;
  align-items: center;
  flex-direction: column;
  p {
    color: grey;
    margin: 0;
    font-style: italic;
    font-size: 0.8em;
  }
`;

export default function QRCodeContainer(props: { id: string }) {
  const downloadQRCode = () => {
    const canvas: HTMLElement | null = document.getElementById("mycanvas");
    console.log(canvas);
    if (canvas !== null) {
      const image = (canvas as HTMLCanvasElement).toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.href = image;
      downloadLink.download = `${props.id}.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };
  return (
    <QRCodeCont>
      <QRCode
        value={props.id}
        id="mycanvas"
        size={100}
        includeMargin
        onClick={downloadQRCode}
      />
      <p>Klicka på QR-koden för att ladda ner den</p>
    </QRCodeCont>
  );
}
