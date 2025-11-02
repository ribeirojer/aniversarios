export interface Birthday {
	id: string;
	name: string;
	date: string; // formato: MM-DD
	year?: number; // ano de nascimento (opcional)
	notes?: string;
	notifyDaysBefore: number[]; // ex: [7, 1, 0] = 7 dias antes, 1 dia antes, no dia
	createdAt: string;
	isSoon?: boolean; // próximos 7 dias
}

export interface BirthdayWithAge extends Birthday {
	age?: number;
	daysUntil: number;
	isToday: boolean;
	isSoon?: boolean; // próximos 7 dias
}
