const centisecondsToClockFormat = centiseconds => {
  const date = new Date(null);
  date.setMilliseconds(centiseconds * 10);
  return date
    .toISOString()
    .substr(11, 11)
    .replace(/^[0:]*(?!\.)/g, "");
};

const resultToString = (result, eventId, format) => {
  if (eventId === "333fm") {
    switch (format) {
      case "single":
        return result;
      case "average":
        return (result / 100).toFixed(2);
    }
  } else if (eventId === "333mbf") {
    const missed = result % 100;
    result = Math.floor(result / 100);
    const timeSeconds = result % 100000;
    result = Math.floor(result / 100000);
    const difference = 99 - (result % 100);
    const solved = difference + missed;
    const attempted = solved + missed;
    const formattedTime = centisecondsToClockFormat(timeSeconds * 100).replace(
      /\.00$/,
      ""
    );
    return `${solved}/${attempted} ${formattedTime}`;
  } else {
    return centisecondsToClockFormat(result);
  }
};

module.exports = { resultToString };
