/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getAdvertisement = /* GraphQL */ `
  query GetAdvertisement($id: ID!) {
    getAdvertisement(id: $id) {
      id
      title
      description
      location
      height
      width
      length
      status
      category
      material
      condition
      color
      areaOfUse
      images {
        src
        alt
      }
      quantity
      department
      instructions
      contactPerson
      email
      phoneNumber
      createdAt
      updatedAt
    }
  }
`;
export const listAdvertisements = /* GraphQL */ `
  query ListAdvertisements(
    $filter: ModelAdvertisementFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAdvertisements(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        description
        location
        height
        width
        length
        status
        category
        material
        condition
        color
        areaOfUse
        images {
          src
          alt
        }
        quantity
        department
        instructions
        contactPerson
        email
        phoneNumber
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
