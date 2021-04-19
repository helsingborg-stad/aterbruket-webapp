/* eslint-disable import/prefer-default-export */
export const sortValues = [
  {
    id: "climateImpactLow",
    value: "Klimatavtryck",
    first: "climateImpact",
    second: "-createdAt",
  },
  // {
  //   id: "climateImpactHighest",
  //   value: "Klimatavtryck högst till lägst",
  //   first: "-climateImpact",
  //   second: "-createdAt",
  // },
  {
    id: "titleAÖ",
    value: "Titel",
    first: "title^",
    second: "-createdAt",
  },
  // {
  //   id: "titleÖA",
  //   value: "Titel Ö-A",
  //   first: "-title^",
  //   second: "-createdAt",
  // },
  {
    id: "new",
    value: "Annonsens ålder",
    first: "-createdAt",
    second: "title^",
  },
  // {
  //   id: "old",
  //   value: "Äldst till nyast",
  //   first: "createdAt",
  //   second: "title^",
  // },
  {
    id: "conditionBäst",
    value: "Skick bäst",
    first: "condition",
    second: "-createdAt",
  },
  {
    id: "conditionSämst",
    value: "Skick sämst",
    first: "-condition",
    second: "-createdAt",
  },
];
