export function getAgeAndNextBirthday(birthYear: number, monthDay: string) {
	const [month, day] = monthDay.split("-").map(Number);
	const today = new Date();

	// Define o próximo aniversário (pode ser este ano ou o próximo)
	const thisYearBirthday = new Date(today.getFullYear(), month - 1, day);
	const nextBirthday =
		thisYearBirthday < today
			? new Date(today.getFullYear() + 1, month - 1, day)
			: thisYearBirthday;

	const age =
		today.getFullYear() - birthYear - (thisYearBirthday > today ? 1 : 0);

	// Calcula quantos dias faltam
	const diffMs = nextBirthday.getTime() - today.getTime();
	const daysUntil = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

	return { age, nextBirthday, daysUntil };
}
