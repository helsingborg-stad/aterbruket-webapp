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
      material {
        wood
        plastic
        metal
        other
      }
      condition
      color
      areaOfUse {
        indoors
        outside
      }
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
      giver
      climateImpact
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
        material {
          wood
          plastic
          metal
          other
        }
        condition
        color
        areaOfUse {
          indoors
          outside
        }
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
        giver
        climateImpact
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getAdvert = /* GraphQL */ `
  query GetAdvert($id: ID!, $version: Int!) {
    getAdvert(id: $id, version: $version) {
      id
      title
      description
      location
      height
      width
      length
      status
      category
      material {
        wood
        plastic
        metal
        other
      }
      condition
      color
      areaOfUse {
        indoors
        outside
      }
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
      giver
      version
      climateImpact
      reservedBySub
      reservedByName
      revisions
      createdAt
      updatedAt
    }
  }
`;
export const listAdverts = /* GraphQL */ `
  query ListAdverts(
    $id: ID
    $version: ModelIntKeyConditionInput
    $filter: ModelAdvertFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listAdverts(
      id: $id
      version: $version
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
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
        material {
          wood
          plastic
          metal
          other
        }
        condition
        color
        areaOfUse {
          indoors
          outside
        }
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
        giver
        version
        climateImpact
        reservedBySub
        reservedByName
        revisions
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
