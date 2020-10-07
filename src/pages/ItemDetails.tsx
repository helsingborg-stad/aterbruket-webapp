import React from 'react';
import { useRouteMatch } from 'react-router-dom';

export default function ItemDetails() {
  const match = useRouteMatch('/item/:id');

  // let id = this.props.match.params.id; // fast hooks

  return <h1>Details about item {match}</h1>;
}
