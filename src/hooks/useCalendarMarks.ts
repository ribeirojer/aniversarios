import { useMemo } from "react";
import type { Birthday } from "../types/birthday";
import { parseLocalDate } from "../utils/utils";

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
			const dateObj = parseLocalDate(b.date);
		  		  
			const monthStr = (dateObj.getMonth() + 1).toString().padStart(2, "0");
			const dayStr = dateObj.getDate().toString().padStart(2, "0");
			const date = `${visibleYear}-${monthStr}-${dayStr}`;
		  
			marks[date] = {
			  marked: true,
			  dotColor: "#f59e0b",
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
