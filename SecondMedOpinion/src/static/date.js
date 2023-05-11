function padLeft(chr) {
  return chr < 10 ? "0" + chr : chr;
}

export const dateSlices = (date) => {
  const d = new Date(date);

  const dd = padLeft(d.getDate());
  const MM = padLeft(d.getMonth() + 1);
  const yyyy = padLeft(d.getFullYear());
  const HH = padLeft(d.getHours());
  const mm = padLeft(d.getMinutes());
  const ddMMyy = dd + "/" + MM + "/" + yyyy;
  const HHmm = HH + ":" + mm;

  return {
    dd,
    MM,
    yyyy,
    HH,
    mm,
    ddMMyy,
    HHmm,
  };
};

export const formatDate = (date, { time } = {}) => {
  const { ddMMyy, HHmm } = dateSlices(date);
  return time ? ddMMyy + " " + HHmm : ddMMyy;
};

export const timeAgo = (time) => {
  const date = new Date(time || "");
  const { ddMMyy, HHmm } = dateSlices(date);
  const diff = (new Date().getTime() - date.getTime()) / 1000;
  const day_diff = Math.floor(diff / 86400);

  if (isNaN(day_diff) || day_diff < 0) return;

  if (day_diff === 0) {
    return (
      (diff < 60 && "Just now") ||
      (diff < 120 && "1 minute ago") ||
      (diff < 3600 && Math.floor(diff / 60) + " minutes ago") ||
      (diff < 7200 && "1 hour ago") ||
      (diff >= 7200 && HHmm)
    );
  } else if (day_diff === 1) {
    return "Yesterday " + HHmm;
  } else {
    return ddMMyy + " " + HHmm;
  }
};

export const convertDate = (date, { time } = {}) => {
  const d = new Date(date);
  const { dd, MM, yyyy, HH, mm } = dateSlices(d);
  return time ? `${yyyy}-${MM}-${dd}T${HH}:${mm}` : `${yyyy}-${MM}-${dd}`;
};
