import { useEffect, useState } from "react";
import type { BirthdayWithAge } from "../types/birthday";
import { getBirthdaysWithDetails } from "../utils/birthdays";

interface Reminder {
	birthday: BirthdayWithAge;
	days: number;
	reminderDate: number;
	isActive: boolean;
}

export function useReminders() {
	const [reminders, setReminders] = useState<Reminder[]>([]);

	useEffect(() => {
		const fetchReminders = async () => {
			const birthdays = await getBirthdaysWithDetails();

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
					}),
				)
				.filter((r) => r.isActive)
				.sort((a, b) => a.reminderDate - b.reminderDate);

			setReminders(upcoming);
		};

		fetchReminders();
	}, []);

	return { reminders };
}
