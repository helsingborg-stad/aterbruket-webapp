import API, { GraphQLResult } from "@aws-amplify/api";
import { graphqlOperation } from "aws-amplify";
import React, { useEffect, useState } from "react";
import QRCode from "qrcode.react";
import { GetAdvertisementQuery } from "../API";
import { getAdvertisement } from "../graphql/queries";

export default function QRCodeContainer(props: { id: string }) {
  const [item, setItem] = useState({}) as any;

  const fetchItems = async () => {
    const result = (await API.graphql(
      graphqlOperation(getAdvertisement, { id: props.id })
    )) as GraphQLResult<GetAdvertisementQuery>;
    const qrValue = JSON.stringify(result.data?.getAdvertisement);
    setItem(qrValue);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div>
      <QRCode value={item} />
    </div>
  );
}
