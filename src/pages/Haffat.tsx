import API, { GraphQLResult } from "@aws-amplify/api";
import { graphqlOperation } from "aws-amplify";
import React, { FC, useCallback, useContext, useEffect, useState } from "react";
import { ListAdvertsQuery } from "../API";
import AdvertContainer from "../components/AdvertContainer";
import Pagination from "../components/Pagination";
import UserContext from "../contexts/UserContext";
import { listAdverts } from "../graphql/queries";

const Haffat: FC = () => {
  const { user } = useContext(UserContext);
  const [reservedItems, setReservedItems] = useState([]) as any;
  const [paginationOption, setPaginationOption] = useState({
    activePage: 1,
    totalPages: 1, // Will change after the fetch
    amountToShow: 15,
    itemLength: 14, // Will change after the fetch
  });
  const [renderItems, setRenderItems] = useState([]) as any;

  const handlePages = (updatePage: number) => {
    setPaginationOption({
      ...paginationOption,
      activePage: updatePage,
    });

    if (paginationOption.activePage !== updatePage) {
      const start = (updatePage - 1) * paginationOption.amountToShow;
      const end = start + paginationOption.amountToShow;

      setRenderItems(reservedItems.slice(start, end));
    }
  };

  const fetchReservedAdverts = useCallback(async () => {
    const result = (await API.graphql(
      graphqlOperation(listAdverts, {
        filter: {
          and: [{ reservedBySub: { eq: user.sub } }, { version: { eq: 0 } }],
          not: { status: { eq: "available" } },
        },
      })
    )) as GraphQLResult<ListAdvertsQuery>;
    const advertItem: any = result.data?.listAdverts?.items;
    if (advertItem.length > 0) {
      setPaginationOption({
        ...paginationOption,
        totalPages: Math.ceil(
          advertItem.length / paginationOption.amountToShow
        ),
        itemLength: advertItem.length,
      });
      setRenderItems(advertItem.slice(0, paginationOption.amountToShow));
    }
    setReservedItems(advertItem);
  }, [user.sub]);

  useEffect(() => {
    if (user.sub) {
      fetchReservedAdverts();
    }
  }, [fetchReservedAdverts, user]);


  const haffatItems = renderItems.filter((renderItem: any) => {
    return renderItem.status === "reserved";
  });

  const pickedUpItems = renderItems.filter((renderItem: any) => {
    return renderItem.status === "pickedUp";
  });

  return (
    <main style={{ marginTop: "60px" }}>
      <AdvertContainer
        filteredSweValues={[]}
        searchValue={false}
        items={haffatItems}
        itemsFrom="haffat"
      />

      <AdvertContainer
        filteredSweValues={[]}
        searchValue={false}
        items={pickedUpItems}
        itemsFrom="pickedUp"
      />
      {reservedItems.length > 0 && (
        <Pagination
          paginationOption={paginationOption}
          handlePagination={handlePages}
        />
      )}
    </main>
  );
};

export default Haffat;
