export const textTelegram = (predmetName, mark, typeLesson) => {
  if (typeLesson === "soch") {
    if (mark === 0) {
      return `СОЧ: Вы получили Н по дисциплине ${predmetName}`;
    } else {
      return `СОЧ: Вы получили ${mark} по дисциплине ${predmetName}`;
    }
  }
  if (typeLesson === "sor") {
    if (mark === 0) {
      return `СОР: Вы получили Н по дисциплине ${predmetName}`;
    } else {
      return `СОР: Вы получили ${mark} по дисциплине ${predmetName}`;
    }
  }
  if (typeLesson === "default") {
    if (mark === 0) {
      return `Вы получили Н по дисциплине ${predmetName}`;
    } else {
      return `Вы получили ${mark} по дисциплине ${predmetName}`;
    }
  }
};

export const textDeleteTelegram = (predmetName) => {
  return `Оценка удаленна по дисциплине ${predmetName}`;
};
