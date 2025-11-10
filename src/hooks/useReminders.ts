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

		};

		fetchReminders();
	}, []);

	return { reminders };
}
