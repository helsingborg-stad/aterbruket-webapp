import CountingCategorys from "./CountingCategorys";
/// Ska öven hantera overTime
const filterStatus = (advertItems: any, Categorys: any) => {
  const newStatusGroup = [
    {
      option: "available",
      sweOp: "Inlaggda annonser",
      expandCard: true,
      items: [] as any,
    },
    {
      option: "reserved",
      sweOp: "Saker att hämta",
      expandCard: true,
      items: [] as any,
    },
    {
      option: "pickedUp",
      sweOp: "Haffade objekt",
      expandCard: true,
      items: [] as any,
    },
  ];
  advertItems.forEach((i: any) => {
    const index = newStatusGroup.findIndex(
      (group) => group.option === i.status
    );
    newStatusGroup[index].items.push(i);
  });

  const groups = CountingCategorys(newStatusGroup, Categorys);
  return groups;
};

export default filterStatus;
