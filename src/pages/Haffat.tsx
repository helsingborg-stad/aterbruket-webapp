import API, { GraphQLResult } from "@aws-amplify/api";
import { graphqlOperation } from "aws-amplify";
import React, { useContext, useEffect, useState, useCallback, FC } from "react";
import AdvertContainer from "../components/AdvertContainer";
import { ListAdvertsQuery } from "../API";
import { listAdverts } from "../graphql/queries";
import { UserContext } from "../contexts/UserContext";
import Pagination from "../components/Pagination";

const Haffat: FC = () => {
  const user: any = useContext(UserContext);
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
      if (updatePage === 1) {
        setRenderItems(
          reservedItems.slice(0, paginationOption.amountToShow - 1)
        );
      } else {
        setRenderItems(
          reservedItems.slice(
            updatePage * paginationOption.amountToShow -
              paginationOption.amountToShow,
            updatePage * paginationOption.amountToShow - 1
          )
        );
      }
    }
  };

  const fetchReservedAdverts = useCallback(async () => {
    const result = (await API.graphql(
      graphqlOperation(listAdverts, {
        filter: {
          and: [
            { reservedBySub: { eq: user.attributes.sub } },
            { version: { eq: 0 } },
          ],
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
      setRenderItems(advertItem.slice(0, paginationOption.amountToShow - 1));
    }
    setReservedItems(advertItem);
  }, [user.attributes.sub]);

  useEffect(() => {
    if (user.attributes.sub) {
      fetchReservedAdverts();
    }
  }, [fetchReservedAdverts, user]);

  return (
    <main style={{ marginTop: "60px" }}>
      <AdvertContainer
        searchValue={false}
        items={renderItems}
        itemsFrom="haffat"
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
