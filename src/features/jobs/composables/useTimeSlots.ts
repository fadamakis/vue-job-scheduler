export function useTimeSlots(
  factoryOpenTime: number,
  factoryCloseTime: number
) {
  function generateTimeSlots(openTime: number, closingTime: number): string[] {
    const timeSlots: string[] = [];

    for (let hour = openTime; hour < closingTime; hour++) {
      const formattedHour = hour.toString().padStart(2, "0");
      timeSlots.push(`${formattedHour}:00`);
    }

    return timeSlots;
  }

  const timeSlots = generateTimeSlots(factoryOpenTime, factoryCloseTime);

  return {
    timeSlots,
  };
}
