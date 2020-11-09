/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateAdvertisementInput = {
  id?: string | null,
  title: string,
  description?: string | null,
  location?: string | null,
  height?: number | null,
  width?: number | null,
  length?: number | null,
  status?: ItemStatus | null,
  category?: ItemCategory | null,
  material?: string | null,
  condition?: ItemCondition | null,
  color?: string | null,
  areaOfUse?: ItemAreaOfUse | null,
  images?: Array< ItemImagesInput | null > | null,
  quantity?: number | null,
  department?: string | null,
  instructions?: string | null,
  contactPerson?: string | null,
  email?: string | null,
  phoneNumber?: number | null,
  giver?: string | null,
};

export enum ItemStatus {
  available = "available",
  reserved = "reserved",
  pickedUp = "pickedUp",
  delivered = "delivered",
}


export enum ItemCategory {
  bord = "bord",
  stol = "stol",
  skrivbord = "skrivbord",
}


export enum ItemCondition {
  new = "new",
  good = "good",
  worn = "worn",
}


export enum ItemAreaOfUse {
  indoors = "indoors",
  outside = "outside",
}


export type ItemImagesInput = {
  src?: string | null,
  alt?: string | null,
};

export type ModelAdvertisementConditionInput = {
  title?: ModelStringInput | null,
  description?: ModelStringInput | null,
  location?: ModelStringInput | null,
  height?: ModelIntInput | null,
  width?: ModelIntInput | null,
  length?: ModelIntInput | null,
  status?: ModelItemStatusInput | null,
  category?: ModelItemCategoryInput | null,
  material?: ModelStringInput | null,
  condition?: ModelItemConditionInput | null,
  color?: ModelStringInput | null,
  areaOfUse?: ModelItemAreaOfUseInput | null,
  quantity?: ModelIntInput | null,
  department?: ModelStringInput | null,
  instructions?: ModelStringInput | null,
  contactPerson?: ModelStringInput | null,
  email?: ModelStringInput | null,
  phoneNumber?: ModelIntInput | null,
  giver?: ModelStringInput | null,
  and?: Array< ModelAdvertisementConditionInput | null > | null,
  or?: Array< ModelAdvertisementConditionInput | null > | null,
  not?: ModelAdvertisementConditionInput | null,
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

export type ModelItemAreaOfUseInput = {
  eq?: ItemAreaOfUse | null,
  ne?: ItemAreaOfUse | null,
};

export type UpdateAdvertisementInput = {
  id: string,
  title?: string | null,
  description?: string | null,
  location?: string | null,
  height?: number | null,
  width?: number | null,
  length?: number | null,
  status?: ItemStatus | null,
  category?: ItemCategory | null,
  material?: string | null,
  condition?: ItemCondition | null,
  color?: string | null,
  areaOfUse?: ItemAreaOfUse | null,
  images?: Array< ItemImagesInput | null > | null,
  quantity?: number | null,
  department?: string | null,
  instructions?: string | null,
  contactPerson?: string | null,
  email?: string | null,
  phoneNumber?: number | null,
  giver?: string | null,
};

export type DeleteAdvertisementInput = {
  id?: string | null,
};

export type CreateAdvertInput = {
  id?: string | null,
  title: string,
  description?: string | null,
  location?: string | null,
  height?: number | null,
  width?: number | null,
  length?: number | null,
  status?: ItemStatus | null,
  category?: ItemCategory | null,
  material?: string | null,
  condition?: ItemCondition | null,
  color?: string | null,
  areaOfUse?: ItemAreaOfUse | null,
  images?: Array< ItemImagesInput | null > | null,
  quantity?: number | null,
  department?: string | null,
  instructions?: string | null,
  contactPerson?: string | null,
  email?: string | null,
  phoneNumber?: number | null,
  giver?: string | null,
  version: number,
  revisions: number,
  createdAt?: string | null,
};

export type ModelAdvertConditionInput = {
  title?: ModelStringInput | null,
  description?: ModelStringInput | null,
  location?: ModelStringInput | null,
  height?: ModelIntInput | null,
  width?: ModelIntInput | null,
  length?: ModelIntInput | null,
  status?: ModelItemStatusInput | null,
  category?: ModelItemCategoryInput | null,
  material?: ModelStringInput | null,
  condition?: ModelItemConditionInput | null,
  color?: ModelStringInput | null,
  areaOfUse?: ModelItemAreaOfUseInput | null,
  quantity?: ModelIntInput | null,
  department?: ModelStringInput | null,
  instructions?: ModelStringInput | null,
  contactPerson?: ModelStringInput | null,
  email?: ModelStringInput | null,
  phoneNumber?: ModelIntInput | null,
  giver?: ModelStringInput | null,
  revisions?: ModelIntInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelAdvertConditionInput | null > | null,
  or?: Array< ModelAdvertConditionInput | null > | null,
  not?: ModelAdvertConditionInput | null,
};

export type UpdateAdvertInput = {
  id: string,
  title?: string | null,
  description?: string | null,
  location?: string | null,
  height?: number | null,
  width?: number | null,
  length?: number | null,
  status?: ItemStatus | null,
  category?: ItemCategory | null,
  material?: string | null,
  condition?: ItemCondition | null,
  color?: string | null,
  areaOfUse?: ItemAreaOfUse | null,
  images?: Array< ItemImagesInput | null > | null,
  quantity?: number | null,
  department?: string | null,
  instructions?: string | null,
  contactPerson?: string | null,
  email?: string | null,
  phoneNumber?: number | null,
  giver?: string | null,
  version: number,
  revisions?: number | null,
  createdAt?: string | null,
};

export type DeleteAdvertInput = {
  id: string,
  version: number,
};

export type ModelAdvertisementFilterInput = {
  id?: ModelIDInput | null,
  title?: ModelStringInput | null,
  description?: ModelStringInput | null,
  location?: ModelStringInput | null,
  height?: ModelIntInput | null,
  width?: ModelIntInput | null,
  length?: ModelIntInput | null,
  status?: ModelItemStatusInput | null,
  category?: ModelItemCategoryInput | null,
  material?: ModelStringInput | null,
  condition?: ModelItemConditionInput | null,
  color?: ModelStringInput | null,
  areaOfUse?: ModelItemAreaOfUseInput | null,
  quantity?: ModelIntInput | null,
  department?: ModelStringInput | null,
  instructions?: ModelStringInput | null,
  contactPerson?: ModelStringInput | null,
  email?: ModelStringInput | null,
  phoneNumber?: ModelIntInput | null,
  giver?: ModelStringInput | null,
  and?: Array< ModelAdvertisementFilterInput | null > | null,
  or?: Array< ModelAdvertisementFilterInput | null > | null,
  not?: ModelAdvertisementFilterInput | null,
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
  height?: ModelIntInput | null,
  width?: ModelIntInput | null,
  length?: ModelIntInput | null,
  status?: ModelItemStatusInput | null,
  category?: ModelItemCategoryInput | null,
  material?: ModelStringInput | null,
  condition?: ModelItemConditionInput | null,
  color?: ModelStringInput | null,
  areaOfUse?: ModelItemAreaOfUseInput | null,
  quantity?: ModelIntInput | null,
  department?: ModelStringInput | null,
  instructions?: ModelStringInput | null,
  contactPerson?: ModelStringInput | null,
  email?: ModelStringInput | null,
  phoneNumber?: ModelIntInput | null,
  giver?: ModelStringInput | null,
  version?: ModelIntInput | null,
  revisions?: ModelIntInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelAdvertFilterInput | null > | null,
  or?: Array< ModelAdvertFilterInput | null > | null,
  not?: ModelAdvertFilterInput | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type CreateAdvertisementMutationVariables = {
  input: CreateAdvertisementInput,
  condition?: ModelAdvertisementConditionInput | null,
};

export type CreateAdvertisementMutation = {
  createAdvertisement:  {
    __typename: "Advertisement",
    id: string,
    title: string,
    description: string | null,
    location: string | null,
    height: number | null,
    width: number | null,
    length: number | null,
    status: ItemStatus | null,
    category: ItemCategory | null,
    material: string | null,
    condition: ItemCondition | null,
    color: string | null,
    areaOfUse: ItemAreaOfUse | null,
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
    phoneNumber: number | null,
    giver: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateAdvertisementMutationVariables = {
  input: UpdateAdvertisementInput,
  condition?: ModelAdvertisementConditionInput | null,
};

export type UpdateAdvertisementMutation = {
  updateAdvertisement:  {
    __typename: "Advertisement",
    id: string,
    title: string,
    description: string | null,
    location: string | null,
    height: number | null,
    width: number | null,
    length: number | null,
    status: ItemStatus | null,
    category: ItemCategory | null,
    material: string | null,
    condition: ItemCondition | null,
    color: string | null,
    areaOfUse: ItemAreaOfUse | null,
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
    phoneNumber: number | null,
    giver: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteAdvertisementMutationVariables = {
  input: DeleteAdvertisementInput,
  condition?: ModelAdvertisementConditionInput | null,
};

export type DeleteAdvertisementMutation = {
  deleteAdvertisement:  {
    __typename: "Advertisement",
    id: string,
    title: string,
    description: string | null,
    location: string | null,
    height: number | null,
    width: number | null,
    length: number | null,
    status: ItemStatus | null,
    category: ItemCategory | null,
    material: string | null,
    condition: ItemCondition | null,
    color: string | null,
    areaOfUse: ItemAreaOfUse | null,
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
    phoneNumber: number | null,
    giver: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

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
    height: number | null,
    width: number | null,
    length: number | null,
    status: ItemStatus | null,
    category: ItemCategory | null,
    material: string | null,
    condition: ItemCondition | null,
    color: string | null,
    areaOfUse: ItemAreaOfUse | null,
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
    phoneNumber: number | null,
    giver: string | null,
    version: number,
    revisions: number,
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
    height: number | null,
    width: number | null,
    length: number | null,
    status: ItemStatus | null,
    category: ItemCategory | null,
    material: string | null,
    condition: ItemCondition | null,
    color: string | null,
    areaOfUse: ItemAreaOfUse | null,
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
    phoneNumber: number | null,
    giver: string | null,
    version: number,
    revisions: number,
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
    height: number | null,
    width: number | null,
    length: number | null,
    status: ItemStatus | null,
    category: ItemCategory | null,
    material: string | null,
    condition: ItemCondition | null,
    color: string | null,
    areaOfUse: ItemAreaOfUse | null,
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
    phoneNumber: number | null,
    giver: string | null,
    version: number,
    revisions: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetAdvertisementQueryVariables = {
  id: string,
};

export type GetAdvertisementQuery = {
  getAdvertisement:  {
    __typename: "Advertisement",
    id: string,
    title: string,
    description: string | null,
    location: string | null,
    height: number | null,
    width: number | null,
    length: number | null,
    status: ItemStatus | null,
    category: ItemCategory | null,
    material: string | null,
    condition: ItemCondition | null,
    color: string | null,
    areaOfUse: ItemAreaOfUse | null,
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
    phoneNumber: number | null,
    giver: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListAdvertisementsQueryVariables = {
  filter?: ModelAdvertisementFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListAdvertisementsQuery = {
  listAdvertisements:  {
    __typename: "ModelAdvertisementConnection",
    items:  Array< {
      __typename: "Advertisement",
      id: string,
      title: string,
      description: string | null,
      location: string | null,
      height: number | null,
      width: number | null,
      length: number | null,
      status: ItemStatus | null,
      category: ItemCategory | null,
      material: string | null,
      condition: ItemCondition | null,
      color: string | null,
      areaOfUse: ItemAreaOfUse | null,
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
      phoneNumber: number | null,
      giver: string | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken: string | null,
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
    height: number | null,
    width: number | null,
    length: number | null,
    status: ItemStatus | null,
    category: ItemCategory | null,
    material: string | null,
    condition: ItemCondition | null,
    color: string | null,
    areaOfUse: ItemAreaOfUse | null,
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
    phoneNumber: number | null,
    giver: string | null,
    version: number,
    revisions: number,
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
      height: number | null,
      width: number | null,
      length: number | null,
      status: ItemStatus | null,
      category: ItemCategory | null,
      material: string | null,
      condition: ItemCondition | null,
      color: string | null,
      areaOfUse: ItemAreaOfUse | null,
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
      phoneNumber: number | null,
      giver: string | null,
      version: number,
      revisions: number,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type OnCreateAdvertisementSubscription = {
  onCreateAdvertisement:  {
    __typename: "Advertisement",
    id: string,
    title: string,
    description: string | null,
    location: string | null,
    height: number | null,
    width: number | null,
    length: number | null,
    status: ItemStatus | null,
    category: ItemCategory | null,
    material: string | null,
    condition: ItemCondition | null,
    color: string | null,
    areaOfUse: ItemAreaOfUse | null,
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
    phoneNumber: number | null,
    giver: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateAdvertisementSubscription = {
  onUpdateAdvertisement:  {
    __typename: "Advertisement",
    id: string,
    title: string,
    description: string | null,
    location: string | null,
    height: number | null,
    width: number | null,
    length: number | null,
    status: ItemStatus | null,
    category: ItemCategory | null,
    material: string | null,
    condition: ItemCondition | null,
    color: string | null,
    areaOfUse: ItemAreaOfUse | null,
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
    phoneNumber: number | null,
    giver: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteAdvertisementSubscription = {
  onDeleteAdvertisement:  {
    __typename: "Advertisement",
    id: string,
    title: string,
    description: string | null,
    location: string | null,
    height: number | null,
    width: number | null,
    length: number | null,
    status: ItemStatus | null,
    category: ItemCategory | null,
    material: string | null,
    condition: ItemCondition | null,
    color: string | null,
    areaOfUse: ItemAreaOfUse | null,
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
    phoneNumber: number | null,
    giver: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateAdvertSubscription = {
  onCreateAdvert:  {
    __typename: "Advert",
    id: string,
    title: string,
    description: string | null,
    location: string | null,
    height: number | null,
    width: number | null,
    length: number | null,
    status: ItemStatus | null,
    category: ItemCategory | null,
    material: string | null,
    condition: ItemCondition | null,
    color: string | null,
    areaOfUse: ItemAreaOfUse | null,
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
    phoneNumber: number | null,
    giver: string | null,
    version: number,
    revisions: number,
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
    height: number | null,
    width: number | null,
    length: number | null,
    status: ItemStatus | null,
    category: ItemCategory | null,
    material: string | null,
    condition: ItemCondition | null,
    color: string | null,
    areaOfUse: ItemAreaOfUse | null,
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
    phoneNumber: number | null,
    giver: string | null,
    version: number,
    revisions: number,
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
    height: number | null,
    width: number | null,
    length: number | null,
    status: ItemStatus | null,
    category: ItemCategory | null,
    material: string | null,
    condition: ItemCondition | null,
    color: string | null,
    areaOfUse: ItemAreaOfUse | null,
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
    phoneNumber: number | null,
    giver: string | null,
    version: number,
    revisions: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};
