import CountingCategorys from "./CountingCategorys";
/// Ska öven hantera overTime
const filterStatus = (advertItems: any, Categorys: any) => {
  const newStatusGroup = [
    { option: "available", sweOp: "Inlaggda annonser", items: [] as any },
    { option: "reserved", sweOp: "Saker att hämta", items: [] as any },
    { option: "pickedUp", sweOp: "Haffade objekt", items: [] as any },
  ];
  advertItems.forEach((i: any) => {
    const index = newStatusGroup.findIndex(
      (group) => group.option === i.status
    );
    newStatusGroup[index].items.push(i);
  });

  const groups = CountingCategorys(newStatusGroup, Categorys);
  console.log("*************", groups);
  return groups;
};

export default filterStatus;
