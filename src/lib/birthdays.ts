import type { Birthday, BirthdayWithAge } from "../types/birthday";
import { storage } from "../utils/storageAsync";

const STORAGE_KEY = "birthdays";

export async function getBirthdays(): Promise<Birthday[]> {
	if (typeof window === "undefined") return [];
	const data = await storage.get(STORAGE_KEY);
	return typeof data === "string" ? JSON.parse(data) : [];
}

export async function saveBirthdays(birthdays: Birthday[]): Promise<void> {
	await storage.set(STORAGE_KEY, JSON.stringify(birthdays));
}

export async function addBirthday(
	birthday: Omit<Birthday, "id" | "createdAt">,
): Promise<Birthday> {
	const birthdays = await getBirthdays();
	const newBirthday: Birthday = {
		...birthday,
		id: crypto.randomUUID(),
		createdAt: new Date().toISOString(),
		notifyDaysBefore: birthday.notifyDaysBefore || [7, 1, 0],
	};
	birthdays.push(newBirthday);
	await saveBirthdays(birthdays);
	return newBirthday;
}

export async function updateBirthday(
	id: string,
	updates: Partial<Birthday>,
): Promise<void> {
	const birthdays = await getBirthdays();
	const index = birthdays.findIndex((b) => b.id === id);
	if (index !== -1) {
		birthdays[index] = { ...birthdays[index], ...updates };
		await saveBirthdays(birthdays);
	}
}

export async function deleteBirthday(id: string): Promise<void> {
	const birthdays = await getBirthdays();
	const updatedBirthdays = birthdays.filter((b) => b.id !== id);
	await saveBirthdays(updatedBirthdays);
}

export function calculateDaysUntil(dateStr: string): number {
	const today = new Date();
	const [month, day] = dateStr.split("-").map(Number);

	const thisYear = new Date(today.getFullYear(), month - 1, day);
	const nextYear = new Date(today.getFullYear() + 1, month - 1, day);

	const targetDate = thisYear >= today ? thisYear : nextYear;

	const diffTime = targetDate.getTime() - today.getTime();
	return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

export function calculateAge(
	dateStr: string,
	year?: number,
): number | undefined {
	if (!year) return undefined;
	const today = new Date();
	const [month, day] = dateStr.split("-").map(Number);

	let age = today.getFullYear() - year;

	if (
		today.getMonth() + 1 < month ||
		(today.getMonth() + 1 === month && today.getDate() < day)
	) {
		age--;
	}

	return age;
}

export async function getBirthdaysWithDetails(): Promise<BirthdayWithAge[]> {
	const birthdays = await getBirthdays();

	return birthdays
		.map((birthday) => {
			const daysUntil = calculateDaysUntil(birthday.date);
			const age = calculateAge(birthday.date, birthday.year);

			return {
				...birthday,
				age,
				daysUntil,
				isToday: daysUntil === 0,
				isSoon: daysUntil <= 7 && daysUntil >= 0,
			};
		})
		.sort((a, b) => a.daysUntil - b.daysUntil);
}

export async function getBirthdaysByMonth(
	month: number,
): Promise<BirthdayWithAge[]> {
	return (await getBirthdaysWithDetails()).filter((b) => {
		const [m] = b.date.split("-").map(Number);
		return m === month;
	});
}
