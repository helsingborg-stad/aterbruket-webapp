import { GraphQLResult } from "./node_modules/@aws-amplify/api";
import { API } from "./node_modules/aws-amplify";
import React from "./node_modules/react";
import { ListAdvertisementsQuery } from "../API";
import { listAdvertisements } from "../graphql/queries";

class AdvertContainer extends React.Component<unknown, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      items: [],
    };
  }

  async componentDidMount(): Promise<void> {
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
