import React, { FC, useState } from "react";

const DatePicker: FC = () => {
  const [startDate, setStartDate] = useState(new Date());
  // const [endDate, setEndDate] = useState<Date | null>(new Date());

  console.log(startDate);

  return (
    <form>
      <input
        type="date"
        id="from"
        name="from"
        value={"2018-07-22"}
        onChange={(e) => console.log(e)}
      />
      <input type="date" id="to" name="to" value="2018-07-22" />
      <button>View items between dates</button>
    </form>
  );
};

export default DatePicker;
