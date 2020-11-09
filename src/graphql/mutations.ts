/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createAdvertisement = /* GraphQL */ `
  mutation CreateAdvertisement(
    $input: CreateAdvertisementInput!
    $condition: ModelAdvertisementConditionInput
  ) {
    createAdvertisement(input: $input, condition: $condition) {
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
      giver
      createdAt
      updatedAt
    }
  }
`;
export const updateAdvertisement = /* GraphQL */ `
  mutation UpdateAdvertisement(
    $input: UpdateAdvertisementInput!
    $condition: ModelAdvertisementConditionInput
  ) {
    updateAdvertisement(input: $input, condition: $condition) {
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
      giver
      createdAt
      updatedAt
    }
  }
`;
export const deleteAdvertisement = /* GraphQL */ `
  mutation DeleteAdvertisement(
    $input: DeleteAdvertisementInput!
    $condition: ModelAdvertisementConditionInput
  ) {
    deleteAdvertisement(input: $input, condition: $condition) {
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
      giver
      createdAt
      updatedAt
    }
  }
`;
export const createAdvert = /* GraphQL */ `
  mutation CreateAdvert(
    $input: CreateAdvertInput!
    $condition: ModelAdvertConditionInput
  ) {
    createAdvert(input: $input, condition: $condition) {
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
      giver
      version
      revisions
      createdAt
      updatedAt
    }
  }
`;
export const updateAdvert = /* GraphQL */ `
  mutation UpdateAdvert(
    $input: UpdateAdvertInput!
    $condition: ModelAdvertConditionInput
  ) {
    updateAdvert(input: $input, condition: $condition) {
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
      giver
      version
      revisions
      createdAt
      updatedAt
    }
  }
`;
export const deleteAdvert = /* GraphQL */ `
  mutation DeleteAdvert(
    $input: DeleteAdvertInput!
    $condition: ModelAdvertConditionInput
  ) {
    deleteAdvert(input: $input, condition: $condition) {
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
      giver
      version
      revisions
      createdAt
      updatedAt
    }
  }
`;
