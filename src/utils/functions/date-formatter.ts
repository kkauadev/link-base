export const dateFormatter = (date: Date): string => {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
};
export const relativeDateFormatter = (date: Date): string => {
  const diffMillis = date.getTime() - Date.now();

  if (Math.abs(diffMillis) < 1000) {
    const seconds = Math.round(diffMillis / 1000);
    return new Intl.RelativeTimeFormat("pt-BR", {
      numeric: "auto",
    }).format(seconds, "second");
  }

  if (Math.abs(diffMillis) < 1000 * 60) {
    const minutes = Math.round(diffMillis / 1000 / 60);
    return new Intl.RelativeTimeFormat("pt-BR", {
      numeric: "auto",
    }).format(minutes, "minute");
  }

  if (Math.abs(diffMillis) < 1000 * 60 * 60) {
    const hours = Math.round(diffMillis / 1000 / 60 / 60);
    return new Intl.RelativeTimeFormat("pt-BR", {
      numeric: "auto",
    }).format(hours, "hour");
  }

  if (Math.abs(diffMillis) < 1000 * 60 * 60 * 24) {
    const days = Math.round(diffMillis / 1000 / 60 / 60 / 24);
    return new Intl.RelativeTimeFormat("pt-BR", {
      numeric: "auto",
    }).format(days, "day");
  }

  const months = Math.round(diffMillis / 1000 / 60 / 60 / 24 / 30);
  return new Intl.RelativeTimeFormat("pt-BR", {
    numeric: "auto",
  }).format(months, "month");
};
