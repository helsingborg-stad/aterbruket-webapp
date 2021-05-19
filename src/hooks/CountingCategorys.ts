import { fieldsForm } from "../utils/formUtils";

const minCommonCategory = (obj: any) => {
  let maxValue = Infinity as any;
  let maxKey = "";

  Object.entries(obj).forEach((entry) => {
    const [key, value] = entry;

    if (obj[key] < maxValue) {
      maxValue = value;
      maxKey = key;
    }
  });
  return { min: maxKey, minNum: maxValue };
};

const mostCommonCategory = (obj: any) => {
  let maxValue = 0 as any;
  let maxKey = "";

  Object.entries(obj).forEach((entry) => {
    const [key, value] = entry;

    if (obj[key] > maxValue) {
      maxValue = value;
      maxKey = key;
    }
  });
  return { most: maxKey, mostNum: maxValue };
};

const translate = (word: any) => {
  let translatedGroup = {};
  const found = fieldsForm.find((element) => {
    return element.name === "category";
  });

  if (found && found.swe) {
    found.eng.find((x: any, idx: number) => {
      Object.entries(word).forEach((entry: any) => {
        const [key, value] = entry;

        if (x === key) {
          const sweKey = found.swe[idx];
          translatedGroup = { ...translatedGroup, [sweKey]: value };
        }
      });
    });
  }
  return translatedGroup;
};

const CountingCategorys = (groups: any, Categorys: any) => {
  groups.forEach((group: any) => {
    const cateAmount = {
      ...Categorys,
    } as any;

    const eachGroup = group;
    const itemsInGroup = eachGroup.items;

    itemsInGroup.forEach((i: any) => {
      if (i.category in cateAmount) {
        cateAmount[i.category] += 1;
      } else {
        cateAmount[i.category] = 1;
      }
    });
    eachGroup.categoryAmount = translate(cateAmount);

    const mostComon = mostCommonCategory(cateAmount);
    const minComon = minCommonCategory(cateAmount);

    eachGroup.min = minComon.min;
    eachGroup.minNum = minComon.minNum;
    eachGroup.most = mostComon.most;
    eachGroup.mostNum = mostComon.mostNum;
  });

  return groups;
};

export default CountingCategorys;
