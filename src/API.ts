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
  company?: string | null,
  aterbruketId?: string | null,
};

export enum ItemStatus {
  available = "available",
  reserved = "reserved",
  pickedUp = "pickedUp",
}


export enum ItemCategory {
  desk = "desk",
  raiseAndLowerableDesk = "raiseAndLowerableDesk",
  kidsFurniture = "kidsFurniture",
  table = "table",
  other = "other",
  storageFurniture = "storageFurniture",
  officeChair = "officeChair",
  sparepart = "sparepart",
  seatingFurniture = "seatingFurniture",
  sofaAndBench = "sofaAndBench",
  wanted = "wanted",
  painting = "painting",
  outdoorItem = "outdoorItem",
  appliances = "appliances",
  constructionMaterial = "constructionMaterial",
}


export type ItemAMaterialInput = {
  wood?: boolean | null,
  plastic?: boolean | null,
  metal?: boolean | null,
  other?: boolean | null,
};

export enum ItemCondition {
  Anew = "Anew",
  Bgood = "Bgood",
  Cworn = "Cworn",
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
  company?: ModelStringInput | null,
  aterbruketId?: ModelStringInput | null,
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

export type Advert = {
  __typename: "Advert",
  id?: string,
  title?: string,
  description?: string | null,
  location?: string | null,
  height?: string | null,
  width?: string | null,
  length?: string | null,
  status?: ItemStatus | null,
  category?: ItemCategory | null,
  material?:  Array<ItemAMaterial | null > | null,
  condition?: ItemCondition | null,
  color?: string | null,
  areaOfUse?:  Array<ItemAreaOfUse | null > | null,
  images?:  Array<ItemImages | null > | null,
  quantity?: number | null,
  department?: string | null,
  instructions?: string | null,
  contactPerson?: string | null,
  email?: string | null,
  phoneNumber?: string | null,
  giver?: string | null,
  version?: number,
  climateImpact?: number | null,
  reservedBySub?: string | null,
  reservedByName?: string | null,
  revisions?: number | null,
  purchasePrice?: string | null,
  company?: string | null,
  aterbruketId?: string | null,
  createdAt?: string,
  updatedAt?: string,
};

export type ItemAMaterial = {
  __typename: "ItemAMaterial",
  wood?: boolean | null,
  plastic?: boolean | null,
  metal?: boolean | null,
  other?: boolean | null,
};

export type ItemAreaOfUse = {
  __typename: "ItemAreaOfUse",
  indoors?: boolean | null,
  outside?: boolean | null,
};

export type ItemImages = {
  __typename: "ItemImages",
  src?: string | null,
  alt?: string | null,
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
  company?: string | null,
  aterbruketId?: string | null,
};

export type DeleteAdvertInput = {
  id: string,
  version: number,
};

export type CreatePageInput = {
  id?: string | null,
  slug: string,
  title: string,
  content?: string | null,
};

export type ModelPageConditionInput = {
  title?: ModelStringInput | null,
  content?: ModelStringInput | null,
  and?: Array< ModelPageConditionInput | null > | null,
  or?: Array< ModelPageConditionInput | null > | null,
  not?: ModelPageConditionInput | null,
};

export type Page = {
  __typename: "Page",
  id?: string,
  slug?: string,
  title?: string,
  content?: string | null,
  createdAt?: string,
  updatedAt?: string,
};

export type UpdatePageInput = {
  id: string,
  slug: string,
  title?: string | null,
  content?: string | null,
};

export type DeletePageInput = {
  slug: string,
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
  company?: ModelStringInput | null,
  aterbruketId?: ModelStringInput | null,
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


export type ModelAdvertConnection = {
  __typename: "ModelAdvertConnection",
  items?:  Array<Advert | null > | null,
  nextToken?: string | null,
};

export type ModelPageFilterInput = {
  id?: ModelIDInput | null,
  slug?: ModelStringInput | null,
  title?: ModelStringInput | null,
  content?: ModelStringInput | null,
  and?: Array< ModelPageFilterInput | null > | null,
  or?: Array< ModelPageFilterInput | null > | null,
  not?: ModelPageFilterInput | null,
};

export type ModelPageConnection = {
  __typename: "ModelPageConnection",
  items?:  Array<Page | null > | null,
  nextToken?: string | null,
};

export type CreateAdvertMutationVariables = {
  input?: CreateAdvertInput,
  condition?: ModelAdvertConditionInput | null,
};

export type CreateAdvertMutation = {
  createAdvert?:  {
    __typename: "Advert",
    id: string,
    title: string,
    description?: string | null,
    location?: string | null,
    height?: string | null,
    width?: string | null,
    length?: string | null,
    status?: ItemStatus | null,
    category?: ItemCategory | null,
    material?:  Array< {
      __typename: "ItemAMaterial",
      wood?: boolean | null,
      plastic?: boolean | null,
      metal?: boolean | null,
      other?: boolean | null,
    } | null > | null,
    condition?: ItemCondition | null,
    color?: string | null,
    areaOfUse?:  Array< {
      __typename: "ItemAreaOfUse",
      indoors?: boolean | null,
      outside?: boolean | null,
    } | null > | null,
    images?:  Array< {
      __typename: "ItemImages",
      src?: string | null,
      alt?: string | null,
    } | null > | null,
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
    company?: string | null,
    aterbruketId?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateAdvertMutationVariables = {
  input?: UpdateAdvertInput,
  condition?: ModelAdvertConditionInput | null,
};

export type UpdateAdvertMutation = {
  updateAdvert?:  {
    __typename: "Advert",
    id: string,
    title: string,
    description?: string | null,
    location?: string | null,
    height?: string | null,
    width?: string | null,
    length?: string | null,
    status?: ItemStatus | null,
    category?: ItemCategory | null,
    material?:  Array< {
      __typename: "ItemAMaterial",
      wood?: boolean | null,
      plastic?: boolean | null,
      metal?: boolean | null,
      other?: boolean | null,
    } | null > | null,
    condition?: ItemCondition | null,
    color?: string | null,
    areaOfUse?:  Array< {
      __typename: "ItemAreaOfUse",
      indoors?: boolean | null,
      outside?: boolean | null,
    } | null > | null,
    images?:  Array< {
      __typename: "ItemImages",
      src?: string | null,
      alt?: string | null,
    } | null > | null,
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
    company?: string | null,
    aterbruketId?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteAdvertMutationVariables = {
  input?: DeleteAdvertInput,
  condition?: ModelAdvertConditionInput | null,
};

export type DeleteAdvertMutation = {
  deleteAdvert?:  {
    __typename: "Advert",
    id: string,
    title: string,
    description?: string | null,
    location?: string | null,
    height?: string | null,
    width?: string | null,
    length?: string | null,
    status?: ItemStatus | null,
    category?: ItemCategory | null,
    material?:  Array< {
      __typename: "ItemAMaterial",
      wood?: boolean | null,
      plastic?: boolean | null,
      metal?: boolean | null,
      other?: boolean | null,
    } | null > | null,
    condition?: ItemCondition | null,
    color?: string | null,
    areaOfUse?:  Array< {
      __typename: "ItemAreaOfUse",
      indoors?: boolean | null,
      outside?: boolean | null,
    } | null > | null,
    images?:  Array< {
      __typename: "ItemImages",
      src?: string | null,
      alt?: string | null,
    } | null > | null,
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
    company?: string | null,
    aterbruketId?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreatePageMutationVariables = {
  input?: CreatePageInput,
  condition?: ModelPageConditionInput | null,
};

export type CreatePageMutation = {
  createPage?:  {
    __typename: "Page",
    id: string,
    slug: string,
    title: string,
    content?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdatePageMutationVariables = {
  input?: UpdatePageInput,
  condition?: ModelPageConditionInput | null,
};

export type UpdatePageMutation = {
  updatePage?:  {
    __typename: "Page",
    id: string,
    slug: string,
    title: string,
    content?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeletePageMutationVariables = {
  input?: DeletePageInput,
  condition?: ModelPageConditionInput | null,
};

export type DeletePageMutation = {
  deletePage?:  {
    __typename: "Page",
    id: string,
    slug: string,
    title: string,
    content?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetAdvertQueryVariables = {
  id?: string,
  version?: number,
};

export type GetAdvertQuery = {
  getAdvert?:  {
    __typename: "Advert",
    id: string,
    title: string,
    description?: string | null,
    location?: string | null,
    height?: string | null,
    width?: string | null,
    length?: string | null,
    status?: ItemStatus | null,
    category?: ItemCategory | null,
    material?:  Array< {
      __typename: "ItemAMaterial",
      wood?: boolean | null,
      plastic?: boolean | null,
      metal?: boolean | null,
      other?: boolean | null,
    } | null > | null,
    condition?: ItemCondition | null,
    color?: string | null,
    areaOfUse?:  Array< {
      __typename: "ItemAreaOfUse",
      indoors?: boolean | null,
      outside?: boolean | null,
    } | null > | null,
    images?:  Array< {
      __typename: "ItemImages",
      src?: string | null,
      alt?: string | null,
    } | null > | null,
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
    company?: string | null,
    aterbruketId?: string | null,
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
  listAdverts?:  {
    __typename: "ModelAdvertConnection",
    items?:  Array< {
      __typename: "Advert",
      id: string,
      title: string,
      description?: string | null,
      location?: string | null,
      height?: string | null,
      width?: string | null,
      length?: string | null,
      status?: ItemStatus | null,
      category?: ItemCategory | null,
      material?:  Array< {
        __typename: "ItemAMaterial",
        wood?: boolean | null,
        plastic?: boolean | null,
        metal?: boolean | null,
        other?: boolean | null,
      } | null > | null,
      condition?: ItemCondition | null,
      color?: string | null,
      areaOfUse?:  Array< {
        __typename: "ItemAreaOfUse",
        indoors?: boolean | null,
        outside?: boolean | null,
      } | null > | null,
      images?:  Array< {
        __typename: "ItemImages",
        src?: string | null,
        alt?: string | null,
      } | null > | null,
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
      company?: string | null,
      aterbruketId?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetPageQueryVariables = {
  slug?: string,
};

export type GetPageQuery = {
  getPage?:  {
    __typename: "Page",
    id: string,
    slug: string,
    title: string,
    content?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListPagesQueryVariables = {
  slug?: string | null,
  filter?: ModelPageFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListPagesQuery = {
  listPages?:  {
    __typename: "ModelPageConnection",
    items?:  Array< {
      __typename: "Page",
      id: string,
      slug: string,
      title: string,
      content?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type OnCreateAdvertSubscription = {
  onCreateAdvert?:  {
    __typename: "Advert",
    id: string,
    title: string,
    description?: string | null,
    location?: string | null,
    height?: string | null,
    width?: string | null,
    length?: string | null,
    status?: ItemStatus | null,
    category?: ItemCategory | null,
    material?:  Array< {
      __typename: "ItemAMaterial",
      wood?: boolean | null,
      plastic?: boolean | null,
      metal?: boolean | null,
      other?: boolean | null,
    } | null > | null,
    condition?: ItemCondition | null,
    color?: string | null,
    areaOfUse?:  Array< {
      __typename: "ItemAreaOfUse",
      indoors?: boolean | null,
      outside?: boolean | null,
    } | null > | null,
    images?:  Array< {
      __typename: "ItemImages",
      src?: string | null,
      alt?: string | null,
    } | null > | null,
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
    company?: string | null,
    aterbruketId?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateAdvertSubscription = {
  onUpdateAdvert?:  {
    __typename: "Advert",
    id: string,
    title: string,
    description?: string | null,
    location?: string | null,
    height?: string | null,
    width?: string | null,
    length?: string | null,
    status?: ItemStatus | null,
    category?: ItemCategory | null,
    material?:  Array< {
      __typename: "ItemAMaterial",
      wood?: boolean | null,
      plastic?: boolean | null,
      metal?: boolean | null,
      other?: boolean | null,
    } | null > | null,
    condition?: ItemCondition | null,
    color?: string | null,
    areaOfUse?:  Array< {
      __typename: "ItemAreaOfUse",
      indoors?: boolean | null,
      outside?: boolean | null,
    } | null > | null,
    images?:  Array< {
      __typename: "ItemImages",
      src?: string | null,
      alt?: string | null,
    } | null > | null,
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
    company?: string | null,
    aterbruketId?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteAdvertSubscription = {
  onDeleteAdvert?:  {
    __typename: "Advert",
    id: string,
    title: string,
    description?: string | null,
    location?: string | null,
    height?: string | null,
    width?: string | null,
    length?: string | null,
    status?: ItemStatus | null,
    category?: ItemCategory | null,
    material?:  Array< {
      __typename: "ItemAMaterial",
      wood?: boolean | null,
      plastic?: boolean | null,
      metal?: boolean | null,
      other?: boolean | null,
    } | null > | null,
    condition?: ItemCondition | null,
    color?: string | null,
    areaOfUse?:  Array< {
      __typename: "ItemAreaOfUse",
      indoors?: boolean | null,
      outside?: boolean | null,
    } | null > | null,
    images?:  Array< {
      __typename: "ItemImages",
      src?: string | null,
      alt?: string | null,
    } | null > | null,
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
    company?: string | null,
    aterbruketId?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreatePageSubscription = {
  onCreatePage?:  {
    __typename: "Page",
    id: string,
    slug: string,
    title: string,
    content?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdatePageSubscription = {
  onUpdatePage?:  {
    __typename: "Page",
    id: string,
    slug: string,
    title: string,
    content?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeletePageSubscription = {
  onDeletePage?:  {
    __typename: "Page",
    id: string,
    slug: string,
    title: string,
    content?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};
