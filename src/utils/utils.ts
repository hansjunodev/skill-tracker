interface Time {
  hours: number;
  minutes: number;
  seconds: number;
}

export function toTimeObject(milliseconds: number): Time {
  const hours = parseInt(milliseconds / (1000 * 60 * 60), 10);
  milliseconds %= 3600000;
  const minutes = parseInt(milliseconds / (1000 * 60), 10);
  milliseconds %= 60000;
  const seconds = parseInt(milliseconds / 1000, 10);

  return {
    hours,
    minutes,
    seconds,
  };
}
