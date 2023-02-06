import { toTimeObject } from "@/utils/utils";

test("convert milliseconds into a readable time duration", () => {
  expect(toTimeObject(3600000)).toStrictEqual({
    hours: 1,
    minutes: 0,
    seconds: 0,
  });
});
