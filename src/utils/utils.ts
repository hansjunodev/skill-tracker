interface Time {
  hours: number;
  minutes: number;
  seconds: number;
}

export function toTimeObject(milliseconds: number): Time {
  let hours, minutes, seconds;

  hours = parseInt(milliseconds / (1000 * 60 * 60));
  milliseconds = milliseconds % 3600000;

  minutes = parseInt(milliseconds / (1000 * 60));
  milliseconds = milliseconds % 6000;

  seconds = parseInt(milliseconds / 1000);

  return {
    hours,
    minutes,
    seconds,
  };
}
