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
	birthday: Omit<Birthday, "id" | "createdAt"> & { date: Date | string },
): Promise<Birthday> {
	const birthdays = await getBirthdays();
	const newBirthday: Birthday = {
		...birthday,
		date: birthday.date,
		id: uuidv4(),
		createdAt: new Date().toISOString(),
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

export function calculateDaysUntil(dateISO: string): number {
	const today = new Date();
	const date = new Date(dateISO);
	const month = date.getMonth() + 1;
	const day = date.getDate();

	const thisYear = new Date(today.getFullYear(), month - 1, day);
	const nextYear = new Date(today.getFullYear() + 1, month - 1, day);

	const targetDate = thisYear >= today ? thisYear : nextYear;

	const diffTime = targetDate.getTime() - today.getTime();
	return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

export function calculateAge(
	dateISO: string,
): number | undefined {
	const today = new Date();
	const date = new Date(dateISO);
	const birthYear = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();

	let age = today.getFullYear() - birthYear;

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
			const age = calculateAge(birthday.date);

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
		const date = new Date(b.date);
		return date.getMonth() + 1 === month;
	});
}

function uuidv4(): string {
	return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
		const r = (Math.random() * 16) | 0;
		const v = c === "x" ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
}
