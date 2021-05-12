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
  font-size: 14px;
  color: ${(props) => props.theme.colors.dark};
`;
const Haffat: FC = () => {
  const menuOpions = [
    { title: "SAKER ATT HÄMTA" },
    { title: "MINA ANNONSER" },
    { title: "STATISTIK" },
  ];
  const [active, setActive] = useState("STATISTIK");
  const { user } = useContext(UserContext);

  const handleActive = (e: React.ChangeEvent<any>) => {
    console.log(e.target.value);
    setActive(e.target.value);
  };

  return (
    <main style={{ marginTop: "60px" }}>
      <Suspense fallback={<div>Loading...</div>}>
        <Container>
          {menuOpions.map((op: { title: string }) => {
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
