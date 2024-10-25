import { describe, it, expect } from "vitest";
import { useTimeSlots } from "./useTimeSlots";

describe("useTimeSlots", () => {
  it("should generate correct time slots between 8:00 and 16:00", () => {
    const { timeSlots } = useTimeSlots(8, 16);

    expect(timeSlots).toEqual([
      "08:00",
      "09:00",
      "10:00",
      "11:00",
      "12:00",
      "13:00",
      "14:00",
      "15:00",
    ]);
  });

  it("should generate correct time slots between 9:00 and 12:00", () => {
    const { timeSlots } = useTimeSlots(9, 12);

    expect(timeSlots).toEqual(["09:00", "10:00", "11:00"]);
  });

  it("should return an empty array when open time equals close time", () => {
    const { timeSlots } = useTimeSlots(8, 8);

    expect(timeSlots).toEqual([]);
  });

  it("should return an empty array when open time is greater than close time", () => {
    const { timeSlots } = useTimeSlots(12, 8);

    expect(timeSlots).toEqual([]);
  });
});
