import React, { FC } from "react";
import styled from "styled-components";

const Button = styled.button`
  background-color: ${(props) => props.theme.appTheme.primaryColor};
  box-sizing: border-box;
  outline: none;
  cursor: pointer;

  height: 50px;
  width: 50px;
  border: none;
  border-radius: 4px;
  height: 30px;
  width: 45px;
  margin: 0 2px;

  &.active {
    border: 2px solid ${(props) => props.theme.colors.primary};
  }
  &.endButtons {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-content: center;
  }
  &.endButtons {
    &:hover {
      background-color: ${(props) => props.theme.colors.opacityPrimaryLight};
    }
  }
`;
const ButtonContainer = styled.div`
  margin-top: 10px;
  display: flex;
  width: 100%;
  justify-content: center;
  margin: 10px 0 60px 0;
`;
type Props = {
  items: any;
  handleSortItems: (str: string, secondStr: string) => void;
};
const SortItems: FC<Props> = ({ items, handleSortItems }) => {
  console.log(items);

  // const handleSortItems = (str: string) => {
  //   console.log(str, items.sort(sortBy(str)));
  // };

  return (
    <ButtonContainer>
      <Button onClick={() => handleSortItems("-createdAt", "title^")}>
        Nyast först
      </Button>
      <Button onClick={() => handleSortItems("createdAt", "title^")}>
        Äldst först
      </Button>
      <Button onClick={() => handleSortItems("category", "-createdAt")}>
        Katergorie A-Ö
      </Button>
      <Button onClick={() => handleSortItems("-category", "-createdAt")}>
        Katergorie Ö-A
      </Button>
      <Button onClick={() => handleSortItems("condition", "-createdAt")}>
        Skick A-Ö
      </Button>
      <Button onClick={() => handleSortItems("-condition", "-createdAt")}>
        Skick Ö-A
      </Button>
      <Button onClick={() => handleSortItems("title^", "-createdAt")}>
        Titel A-Ö
      </Button>
      <Button onClick={() => handleSortItems("-title^", "-createdAt")}>
        Titel Ö-A
      </Button>
      <Button onClick={() => handleSortItems("climateImpact", "-createdAt")}>
        Klimatavtryck lägst
      </Button>
      <Button onClick={() => handleSortItems("-climateImpact", "-createdAt")}>
        Klimatavtryck högst
      </Button>
    </ButtonContainer>
  );
};

export default SortItems;
