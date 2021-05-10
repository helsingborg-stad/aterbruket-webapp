import API, { GraphQLResult } from "@aws-amplify/api";
import { graphqlOperation } from "aws-amplify";
import React, {
  FC,
  useCallback,
  useContext,
  useEffect,
  useState,
  Suspense,
} from "react";
import styled from "styled-components";
import { ListAdvertsQuery } from "../API";
import UserContext from "../contexts/UserContext";
import { listAdverts } from "../graphql/queries";

const ItemsToGet = React.lazy(() => import("../components/ItemsToGet"));
const MyAdverts = React.lazy(() => import("../components/MyAdverts"));
const Statics = React.lazy(() => import("../components/Statics"));

const InputGroup = styled.div`
   {
     color: ${(props) => props.theme.colors.dark};
 

    input {
      appearance: none;
      outline: none;
      border: none;
    }

 
    .active {
      color: ${(props) => props.theme.colors.primaryDark};
    }
    
    input[type="radio"]:checked,
    &:focus {
      appearance: none;
      outline: none;
      border: none;
      
  }
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  font-weight: 900;
  font-size: 12px;
  color: ${(props) => props.theme.colors.dark};
`;
const Haffat: FC = () => {
  const menuOpions = [
    { title: "SAKER ATT HÄMTA", active: true },
    { title: "MINA ANNONSER", active: false },
    { title: "STATISTIK", active: false },
  ];
  const [active, setActive] = useState("SAKER ATT HÄMTA");
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

  const handleActive = (e: React.ChangeEvent<any>) => {
    console.log(e.target.value);
    setActive(e.target.value);
  };

  return (
    <main style={{ marginTop: "60px" }}>
      <Suspense fallback={<div>Loading...</div>}>
        <Container>
          {menuOpions.map((op: { title: string; active: boolean }) => {
            return (
              <InputGroup key={op.title}>
                <label
                  className={op.title === active ? "active" : "normal"}
                  htmlFor={op.title}
                >
                  {op.title}
                </label>
                <input
                  type="radio"
                  id={op.title}
                  name="menu"
                  value={op.title}
                  onChange={(e) => handleActive(e)}
                  checked={op.title === active}
                />
              </InputGroup>
            );
          })}
        </Container>
        {active === "SAKER ATT HÄMTA" && <ItemsToGet />}
        {active === "MINA ANNONSER" && <MyAdverts />}
        {active === "STATISTIK" && <Statics />}
      </Suspense>
    </main>
  );
};

export default Haffat;
