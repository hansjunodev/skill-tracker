import { toTimeObject } from "@/utils/utils";

test("convert milliseconds into a readable time duration", () => {
  expect(toTimeObject(3600000)).toStrictEqual({
    hours: 1,
    minutes: 0,
    seconds: 0,
  });
  expect(toTimeObject(3637000)).toStrictEqual({
    hours: 1,
    minutes: 0,
    seconds: 37,
  });
  expect(toTimeObject(4417000)).toStrictEqual({
    hours: 1,
    minutes: 13,
    seconds: 37,
  });
  expect(toTimeObject(3.312e+8)).toStrictEqual({
    hours: 92,
    minutes: 0,
    seconds: 0,
  });
});
