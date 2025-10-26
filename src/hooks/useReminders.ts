import { useEffect, useState } from "react";
import { getBirthdaysWithDetails } from "../lib/birthdays";
import type { BirthdayWithAge } from "../types/birthday";

interface Reminder {
  birthday: BirthdayWithAge;
  days: number;
  reminderDate: number;
  isActive: boolean;
}

export function useReminders() {
  const [reminders, setReminders] = useState<Reminder[]>([]);

  useEffect(() => {
    const birthdays = getBirthdaysWithDetails();

    const upcoming = birthdays
      .flatMap((birthday) =>
        birthday.notifyDaysBefore.map((days) => {
          const reminderDate = birthday.daysUntil - days;
          return {
            birthday,
            days,
            reminderDate,
            isActive: reminderDate >= 0 && reminderDate <= 7,
          };
        })
      )
      .filter((r) => r.isActive)
      .sort((a, b) => a.reminderDate - b.reminderDate);

    setReminders(upcoming);
  }, []);

  return { reminders };
}
