import { useMemo } from "react";
import type { Birthday } from "../types/birthday";

/**
 * Gera o objeto de datas marcadas no calendário, de acordo com o ano visível.
 */
export function useCalendarMarks(
	birthdays: Birthday[],
	selected: string,
	visibleYear: number,
) {
	const markedDates = useMemo(() => {
		const marks: Record<
			string,
			{
				marked: boolean;
				dotColor: string;
				selected?: boolean;
				selectedColor?: string;
			}
		> = {};

		birthdays.forEach((b) => {
			const date = `${visibleYear}-${b.date}`; // Ex: "2026-05-12"
			marks[date] = {
				marked: true,
				dotColor: b.isSoon ? "#fbbf24" : "#f59e0b",
			};
		});

		if (selected) {
			marks[selected] = {
				...marks[selected],
				selected: true,
				selectedColor: "#2563eb",
			};
		}

		return marks;
	}, [birthdays, selected, visibleYear]);

	return markedDates;
}
