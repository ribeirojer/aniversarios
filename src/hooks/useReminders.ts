import { useEffect, useState } from "react";
import type { BirthdayWithAge } from "../types/birthday";
import { getBirthdaysWithDetails } from "../utils/birthdays";

type Reminder = {
	birthday: BirthdayWithAge;
	days: number;
};

export function useReminders() {
	const [reminders, setReminders] = useState<Reminder[]>([]);

	useEffect(() => {
		const fetchReminders = async () => {
			const birthdays = await getBirthdaysWithDetails();
			const today = new Date();
			const nextSevenDays = new Date();
			nextSevenDays.setDate(today.getDate() + 7);

			const remindersList = birthdays
				.map((birthday) => {
					//filtrar aniversários entre hoje e daqui a 7 dias
					const birthdayDate = new Date(birthday.date);
					birthdayDate.setFullYear(today.getFullYear());

					if (birthdayDate < today) {
						birthdayDate.setFullYear(today.getFullYear() + 1);
					}

					const timeDiff = birthdayDate.getTime() - today.getTime();
					const daysUntilBirthday = Math.ceil(timeDiff / (1000 * 3600 * 24));

					if (daysUntilBirthday < 0 || daysUntilBirthday > 7) {
						return null;
					}
					return {
						birthday,
						days: daysUntilBirthday,
					};
				})
				.filter((reminder) => reminder !== null) as Reminder[];

			setReminders(remindersList);
		};

		fetchReminders();
	}, []);

	return { reminders };
}
