export const handlerDate = (dataDate) => {
  const date = new Date(dataDate);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString();
  const formattedDate = `${day}.${month}.${year}`;
  return formattedDate;
};

export const markColor = (mark) => {
  if (mark === 0) {
    return {
      backgroundColor: `gray`,
    };
  }
  if (mark < 4) {
    return {
      backgroundColor: `red`,
    };
  }
  if (mark < 7) {
    return {
      backgroundColor: `orange`,
    };
  }
  if (mark <= 30) {
    return {
      backgroundColor: `green`,
    };
  }
};

export const typeLesson = (type) => {
  if (type === "default") return "ФО";
  if (type === "sor") return "СОР";
  if (type === "soch") return "СОЧ";
};
