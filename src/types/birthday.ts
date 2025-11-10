export interface Birthday {
	id: string;
	name: string;
	date: string; // formato ISO: "2025-11-04T03:46:12.386Z"
	notes?: string;
	createdAt: string;
}

export interface BirthdayWithAge extends Birthday {
	age?: number;
	daysUntil: number;
	isToday: boolean;
	isSoon?: boolean; // próximos 7 dias
}
