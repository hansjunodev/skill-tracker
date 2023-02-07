interface Time {
  hours: number;
  minutes: number;
  seconds: number;
}

export function toTimeObject(milliseconds: number): Time {
  const hours = parseInt(milliseconds / (1000 * 60 * 60));
  milliseconds = milliseconds % 3600000;
  const minutes = parseInt(milliseconds / (1000 * 60));
  milliseconds = milliseconds % 6000;
  const seconds = parseInt(milliseconds / 1000);

  return {
    hours,
    minutes,
    seconds,
  };
}
