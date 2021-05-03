/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateAdvertInput = {
  id?: string | null,
  title: string,
  description?: string | null,
  location?: string | null,
  height?: string | null,
  width?: string | null,
  length?: string | null,
  status?: ItemStatus | null,
  category?: ItemCategory | null,
  material?: Array< ItemAMaterialInput | null > | null,
  condition?: ItemCondition | null,
  color?: string | null,
  areaOfUse?: Array< ItemAreaOfUseInput | null > | null,
  images?: Array< ItemImagesInput | null > | null,
  quantity?: number | null,
  department?: string | null,
  instructions?: string | null,
  contactPerson?: string | null,
  email?: string | null,
  phoneNumber?: string | null,
  giver?: string | null,
  version: number,
  climateImpact?: number | null,
  reservedBySub?: string | null,
  reservedByName?: string | null,
  revisions?: number | null,
  purchasePrice?: string | null,
};

export enum ItemStatus {
  available = "available",
  reserved = "reserved",
  pickedUp = "pickedUp",
}


export enum ItemCategory {
  table = "table",
  chair = "chair",
  desk = "desk",
  officeChair = "officeChair",
  raiseAndLowerableDesk = "raiseAndLowerableDesk",
  other = "other",
}


export type ItemAMaterialInput = {
  wood?: boolean | null,
  plastic?: boolean | null,
  metal?: boolean | null,
  other?: boolean | null,
};

export enum ItemCondition {
  new = "new",
  good = "good",
  worn = "worn",
}


export type ItemAreaOfUseInput = {
  indoors?: boolean | null,
  outside?: boolean | null,
};

export type ItemImagesInput = {
  src?: string | null,
  alt?: string | null,
};

export type ModelAdvertConditionInput = {
  title?: ModelStringInput | null,
  description?: ModelStringInput | null,
  location?: ModelStringInput | null,
  height?: ModelStringInput | null,
  width?: ModelStringInput | null,
  length?: ModelStringInput | null,
  status?: ModelItemStatusInput | null,
  category?: ModelItemCategoryInput | null,
  condition?: ModelItemConditionInput | null,
  color?: ModelStringInput | null,
  quantity?: ModelIntInput | null,
  department?: ModelStringInput | null,
  instructions?: ModelStringInput | null,
  contactPerson?: ModelStringInput | null,
  email?: ModelStringInput | null,
  phoneNumber?: ModelStringInput | null,
  giver?: ModelStringInput | null,
  climateImpact?: ModelIntInput | null,
  reservedBySub?: ModelStringInput | null,
  reservedByName?: ModelStringInput | null,
  revisions?: ModelIntInput | null,
  purchasePrice?: ModelStringInput | null,
  and?: Array< ModelAdvertConditionInput | null > | null,
  or?: Array< ModelAdvertConditionInput | null > | null,
  not?: ModelAdvertConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelItemStatusInput = {
  eq?: ItemStatus | null,
  ne?: ItemStatus | null,
};

export type ModelItemCategoryInput = {
  eq?: ItemCategory | null,
  ne?: ItemCategory | null,
};

export type ModelItemConditionInput = {
  eq?: ItemCondition | null,
  ne?: ItemCondition | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type UpdateAdvertInput = {
  id: string,
  title?: string | null,
  description?: string | null,
  location?: string | null,
  height?: string | null,
  width?: string | null,
  length?: string | null,
  status?: ItemStatus | null,
  category?: ItemCategory | null,
  material?: Array< ItemAMaterialInput | null > | null,
  condition?: ItemCondition | null,
  color?: string | null,
  areaOfUse?: Array< ItemAreaOfUseInput | null > | null,
  images?: Array< ItemImagesInput | null > | null,
  quantity?: number | null,
  department?: string | null,
  instructions?: string | null,
  contactPerson?: string | null,
  email?: string | null,
  phoneNumber?: string | null,
  giver?: string | null,
  version: number,
  climateImpact?: number | null,
  reservedBySub?: string | null,
  reservedByName?: string | null,
  revisions?: number | null,
  purchasePrice?: string | null,
};

export type DeleteAdvertInput = {
  id: string,
  version: number,
};

export type ModelIntKeyConditionInput = {
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelAdvertFilterInput = {
  id?: ModelIDInput | null,
  title?: ModelStringInput | null,
  description?: ModelStringInput | null,
  location?: ModelStringInput | null,
  height?: ModelStringInput | null,
  width?: ModelStringInput | null,
  length?: ModelStringInput | null,
  status?: ModelItemStatusInput | null,
  category?: ModelItemCategoryInput | null,
  condition?: ModelItemConditionInput | null,
  color?: ModelStringInput | null,
  quantity?: ModelIntInput | null,
  department?: ModelStringInput | null,
  instructions?: ModelStringInput | null,
  contactPerson?: ModelStringInput | null,
  email?: ModelStringInput | null,
  phoneNumber?: ModelStringInput | null,
  giver?: ModelStringInput | null,
  version?: ModelIntInput | null,
  climateImpact?: ModelIntInput | null,
  reservedBySub?: ModelStringInput | null,
  reservedByName?: ModelStringInput | null,
  revisions?: ModelIntInput | null,
  purchasePrice?: ModelStringInput | null,
  and?: Array< ModelAdvertFilterInput | null > | null,
  or?: Array< ModelAdvertFilterInput | null > | null,
  not?: ModelAdvertFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type CreateAdvertMutationVariables = {
  input: CreateAdvertInput,
  condition?: ModelAdvertConditionInput | null,
};

export type CreateAdvertMutation = {
  createAdvert:  {
    __typename: "Advert",
    id: string,
    title: string,
    description: string | null,
    location: string | null,
    height: string | null,
    width: string | null,
    length: string | null,
    status: ItemStatus | null,
    category: ItemCategory | null,
    material:  Array< {
      __typename: "ItemAMaterial",
      wood: boolean | null,
      plastic: boolean | null,
      metal: boolean | null,
      other: boolean | null,
    } | null > | null,
    condition: ItemCondition | null,
    color: string | null,
    areaOfUse:  Array< {
      __typename: "ItemAreaOfUse",
      indoors: boolean | null,
      outside: boolean | null,
    } | null > | null,
    images:  Array< {
      __typename: "ItemImages",
      src: string | null,
      alt: string | null,
    } | null > | null,
    quantity: number | null,
    department: string | null,
    instructions: string | null,
    contactPerson: string | null,
    email: string | null,
    phoneNumber: string | null,
    giver: string | null,
    version: number,
    climateImpact: number | null,
    reservedBySub: string | null,
    reservedByName: string | null,
    revisions: number | null,
    purchasePrice: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateAdvertMutationVariables = {
  input: UpdateAdvertInput,
  condition?: ModelAdvertConditionInput | null,
};

export type UpdateAdvertMutation = {
  updateAdvert:  {
    __typename: "Advert",
    id: string,
    title: string,
    description: string | null,
    location: string | null,
    height: string | null,
    width: string | null,
    length: string | null,
    status: ItemStatus | null,
    category: ItemCategory | null,
    material:  Array< {
      __typename: "ItemAMaterial",
      wood: boolean | null,
      plastic: boolean | null,
      metal: boolean | null,
      other: boolean | null,
    } | null > | null,
    condition: ItemCondition | null,
    color: string | null,
    areaOfUse:  Array< {
      __typename: "ItemAreaOfUse",
      indoors: boolean | null,
      outside: boolean | null,
    } | null > | null,
    images:  Array< {
      __typename: "ItemImages",
      src: string | null,
      alt: string | null,
    } | null > | null,
    quantity: number | null,
    department: string | null,
    instructions: string | null,
    contactPerson: string | null,
    email: string | null,
    phoneNumber: string | null,
    giver: string | null,
    version: number,
    climateImpact: number | null,
    reservedBySub: string | null,
    reservedByName: string | null,
    revisions: number | null,
    purchasePrice: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteAdvertMutationVariables = {
  input: DeleteAdvertInput,
  condition?: ModelAdvertConditionInput | null,
};

export type DeleteAdvertMutation = {
  deleteAdvert:  {
    __typename: "Advert",
    id: string,
    title: string,
    description: string | null,
    location: string | null,
    height: string | null,
    width: string | null,
    length: string | null,
    status: ItemStatus | null,
    category: ItemCategory | null,
    material:  Array< {
      __typename: "ItemAMaterial",
      wood: boolean | null,
      plastic: boolean | null,
      metal: boolean | null,
      other: boolean | null,
    } | null > | null,
    condition: ItemCondition | null,
    color: string | null,
    areaOfUse:  Array< {
      __typename: "ItemAreaOfUse",
      indoors: boolean | null,
      outside: boolean | null,
    } | null > | null,
    images:  Array< {
      __typename: "ItemImages",
      src: string | null,
      alt: string | null,
    } | null > | null,
    quantity: number | null,
    department: string | null,
    instructions: string | null,
    contactPerson: string | null,
    email: string | null,
    phoneNumber: string | null,
    giver: string | null,
    version: number,
    climateImpact: number | null,
    reservedBySub: string | null,
    reservedByName: string | null,
    revisions: number | null,
    purchasePrice: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetAdvertQueryVariables = {
  id: string,
  version: number,
};

export type GetAdvertQuery = {
  getAdvert:  {
    __typename: "Advert",
    id: string,
    title: string,
    description: string | null,
    location: string | null,
    height: string | null,
    width: string | null,
    length: string | null,
    status: ItemStatus | null,
    category: ItemCategory | null,
    material:  Array< {
      __typename: "ItemAMaterial",
      wood: boolean | null,
      plastic: boolean | null,
      metal: boolean | null,
      other: boolean | null,
    } | null > | null,
    condition: ItemCondition | null,
    color: string | null,
    areaOfUse:  Array< {
      __typename: "ItemAreaOfUse",
      indoors: boolean | null,
      outside: boolean | null,
    } | null > | null,
    images:  Array< {
      __typename: "ItemImages",
      src: string | null,
      alt: string | null,
    } | null > | null,
    quantity: number | null,
    department: string | null,
    instructions: string | null,
    contactPerson: string | null,
    email: string | null,
    phoneNumber: string | null,
    giver: string | null,
    version: number,
    climateImpact: number | null,
    reservedBySub: string | null,
    reservedByName: string | null,
    revisions: number | null,
    purchasePrice: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListAdvertsQueryVariables = {
  id?: string | null,
  version?: ModelIntKeyConditionInput | null,
  filter?: ModelAdvertFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListAdvertsQuery = {
  listAdverts:  {
    __typename: "ModelAdvertConnection",
    items:  Array< {
      __typename: "Advert",
      id: string,
      title: string,
      description: string | null,
      location: string | null,
      height: string | null,
      width: string | null,
      length: string | null,
      status: ItemStatus | null,
      category: ItemCategory | null,
      material:  Array< {
        __typename: "ItemAMaterial",
        wood: boolean | null,
        plastic: boolean | null,
        metal: boolean | null,
        other: boolean | null,
      } | null > | null,
      condition: ItemCondition | null,
      color: string | null,
      areaOfUse:  Array< {
        __typename: "ItemAreaOfUse",
        indoors: boolean | null,
        outside: boolean | null,
      } | null > | null,
      images:  Array< {
        __typename: "ItemImages",
        src: string | null,
        alt: string | null,
      } | null > | null,
      quantity: number | null,
      department: string | null,
      instructions: string | null,
      contactPerson: string | null,
      email: string | null,
      phoneNumber: string | null,
      giver: string | null,
      version: number,
      climateImpact: number | null,
      reservedBySub: string | null,
      reservedByName: string | null,
      revisions: number | null,
      purchasePrice: string | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type OnCreateAdvertSubscription = {
  onCreateAdvert:  {
    __typename: "Advert",
    id: string,
    title: string,
    description: string | null,
    location: string | null,
    height: string | null,
    width: string | null,
    length: string | null,
    status: ItemStatus | null,
    category: ItemCategory | null,
    material:  Array< {
      __typename: "ItemAMaterial",
      wood: boolean | null,
      plastic: boolean | null,
      metal: boolean | null,
      other: boolean | null,
    } | null > | null,
    condition: ItemCondition | null,
    color: string | null,
    areaOfUse:  Array< {
      __typename: "ItemAreaOfUse",
      indoors: boolean | null,
      outside: boolean | null,
    } | null > | null,
    images:  Array< {
      __typename: "ItemImages",
      src: string | null,
      alt: string | null,
    } | null > | null,
    quantity: number | null,
    department: string | null,
    instructions: string | null,
    contactPerson: string | null,
    email: string | null,
    phoneNumber: string | null,
    giver: string | null,
    version: number,
    climateImpact: number | null,
    reservedBySub: string | null,
    reservedByName: string | null,
    revisions: number | null,
    purchasePrice: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateAdvertSubscription = {
  onUpdateAdvert:  {
    __typename: "Advert",
    id: string,
    title: string,
    description: string | null,
    location: string | null,
    height: string | null,
    width: string | null,
    length: string | null,
    status: ItemStatus | null,
    category: ItemCategory | null,
    material:  Array< {
      __typename: "ItemAMaterial",
      wood: boolean | null,
      plastic: boolean | null,
      metal: boolean | null,
      other: boolean | null,
    } | null > | null,
    condition: ItemCondition | null,
    color: string | null,
    areaOfUse:  Array< {
      __typename: "ItemAreaOfUse",
      indoors: boolean | null,
      outside: boolean | null,
    } | null > | null,
    images:  Array< {
      __typename: "ItemImages",
      src: string | null,
      alt: string | null,
    } | null > | null,
    quantity: number | null,
    department: string | null,
    instructions: string | null,
    contactPerson: string | null,
    email: string | null,
    phoneNumber: string | null,
    giver: string | null,
    version: number,
    climateImpact: number | null,
    reservedBySub: string | null,
    reservedByName: string | null,
    revisions: number | null,
    purchasePrice: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteAdvertSubscription = {
  onDeleteAdvert:  {
    __typename: "Advert",
    id: string,
    title: string,
    description: string | null,
    location: string | null,
    height: string | null,
    width: string | null,
    length: string | null,
    status: ItemStatus | null,
    category: ItemCategory | null,
    material:  Array< {
      __typename: "ItemAMaterial",
      wood: boolean | null,
      plastic: boolean | null,
      metal: boolean | null,
      other: boolean | null,
    } | null > | null,
    condition: ItemCondition | null,
    color: string | null,
    areaOfUse:  Array< {
      __typename: "ItemAreaOfUse",
      indoors: boolean | null,
      outside: boolean | null,
    } | null > | null,
    images:  Array< {
      __typename: "ItemImages",
      src: string | null,
      alt: string | null,
    } | null > | null,
    quantity: number | null,
    department: string | null,
    instructions: string | null,
    contactPerson: string | null,
    email: string | null,
    phoneNumber: string | null,
    giver: string | null,
    version: number,
    climateImpact: number | null,
    reservedBySub: string | null,
    reservedByName: string | null,
    revisions: number | null,
    purchasePrice: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};
