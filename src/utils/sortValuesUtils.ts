/* eslint-disable import/prefer-default-export */
export const sortValues = [
  {
    title: "Klimatavtryck",
    id: "climateImpactLow",
    low: "climateImpact",
    lowText: "Lägst",
    high: "-climateImpact",
    highText: "Högst",
    second: "-createdAt",
  },
  {
    title: "Namn",
    id: "titleAÖ",
    low: "title^",
    lowText: "A - Ö",
    high: "-title^",
    highText: "Ö - A",
    second: "-createdAt",
  },
  {
    title: "Skapad",
    id: "age",
    low: "-createdAt",
    lowText: "Senast",
    high: "createdAt",
    highText: "Äldst",
    second: "",
  },
  {
    title: "Skick",
    id: "condition",
    low: "condition",
    lowText: "Bäst",
    high: "-condition",
    highText: "Sämst",
    second: "-createdAt",
  },
];

export const DEFAULTSORTVALUE = {
  sortTitle: "Klimatavtryck",
  first: "climateImpact",
  second: "-createdAt",
  secText: "Lägst",
};
