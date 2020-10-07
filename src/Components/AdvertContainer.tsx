import { GraphQLResult } from "@aws-amplify/api";
import { API } from "aws-amplify";
import React from "react";
import { ListAdvertisementsQuery } from "../API";
import { listAdvertisements } from "../graphql/queries";

class AdvertContainer extends React.Component<{}, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      items: [],
    };
  }

  async componentDidMount() {
    const result = (await API.graphql({
      query: listAdvertisements,
    })) as GraphQLResult<ListAdvertisementsQuery>;
    const advertItems = result.data?.listAdvertisements?.items;

    this.setState({
      items: advertItems,
    });
  }

  render() {
    return (
      <ul>
        {this.state.items.map((item: { title: string }) => (
          <li>{item.title}</li>
        ))}
      </ul>
    );
  }
}

export default AdvertContainer;
