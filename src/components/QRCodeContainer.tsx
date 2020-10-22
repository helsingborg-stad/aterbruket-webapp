import React from "react";
import QRCode from "qrcode.react";

export default function QRCodeContainer(props: { id: string }) {
  return (
    <div>
      <QRCode value={props.id} />
    </div>
  );
}
