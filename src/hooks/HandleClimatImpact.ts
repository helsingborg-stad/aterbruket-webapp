const HandleClimatImpact = (values: any) => {
  if (values.category === "raiseAndLowerableDesk") {
    return 112;
  }
  if (values.category === "desk") {
    return 50;
  }
  if (values.category === "chair") {
    return 15;
  }
  if (values.category === "officeChair") {
    if (values.height > 100) {
      return 160;
    }
    return 77;
  }
  if (values.category === "table") {
    if (values.width > 360 || values.length > 360) {
      return 159;
    }
    return 80;
  }
  if (values.category === "other") {
    return 1;
  }
};

export default HandleClimatImpact;
