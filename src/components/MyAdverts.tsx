import API, { GraphQLResult } from "@aws-amplify/api";
import { graphqlOperation } from "aws-amplify";
import React, { FC, useContext, useEffect, useState, useCallback } from "react";
import AdvertContainer from "./AdvertContainer";
import { ListAdvertsQuery } from "../API";
import { listAdverts } from "../graphql/queries";
import UserContext from "../contexts/UserContext";
import Pagination from "./Pagination";

const MyAdverts: FC = () => {
  const user: any = useContext(UserContext);
  const [adverts, setAdverts] = useState([{}]) as any;
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

      setRenderItems(adverts.slice(start, end));
    }
  };

  const fetchCreatedAdverts = useCallback(async () => {
    const result = (await API.graphql(
      graphqlOperation(listAdverts, {
        filter: {
          and: [{ giver: { eq: user.attributes.sub } }, { version: { eq: 0 } }],
          not: { status: { eq: "pickedUp" } },
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
    setAdverts(advertItem);
  }, [user.attributes.sub]);

  useEffect(() => {
    if (user.attributes.sub) {
      fetchCreatedAdverts();
    }
  }, [user]);
  return (
    <main style={{ marginTop: "60px" }}>
      <AdvertContainer
        filteredSweValues={null}
        items={renderItems}
        searchValue={false}
        itemsFrom="profile"
      />
      {renderItems.length > 0 && (
        <Pagination
          paginationOption={paginationOption}
          handlePagination={handlePages}
        />
      )}
    </main>
  );
};

export default MyAdverts;
