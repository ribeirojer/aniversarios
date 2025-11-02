import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { useCalendarMarks } from "../hooks/useCalendarMarks";
import type { Birthday } from "../types/birthday";
import { BirthdayList } from "./BirthdayList";

// Configuração do idioma (pode ser extraída para utils/calendarLocale.ts)
LocaleConfig.locales["pt-br"] = {
	monthNames: [
		"Janeiro",
		"Fevereiro",
		"Março",
		"Abril",
		"Maio",
		"Junho",
		"Julho",
		"Agosto",
		"Setembro",
		"Outubro",
		"Novembro",
		"Dezembro",
	],
	monthNamesShort: [
		"Jan",
		"Fev",
		"Mar",
		"Abr",
		"Mai",
		"Jun",
		"Jul",
		"Ago",
		"Set",
		"Out",
		"Nov",
		"Dez",
	],
	dayNames: [
		"Domingo",
		"Segunda",
		"Terça",
		"Quarta",
		"Quinta",
		"Sexta",
		"Sábado",
	],
	dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
	today: "Hoje",
};
LocaleConfig.defaultLocale = "pt-br";

interface Props {
	birthdays: Birthday[];
	onDayClick?: (date: string) => void;
}

export function MonthlyCalendar({ birthdays, onDayClick }: Props) {
	const [selected, setSelected] = useState("");
	const [visibleYear, setVisibleYear] = useState(new Date().getFullYear());

	const markedDates = useCalendarMarks(birthdays, selected, visibleYear);

	const selectedBirthdays = birthdays.filter((b) => {
		const formattedDate = selected.split("-").slice(1).join("-");
		return b.date === formattedDate;
	});

	return (
		<View style={styles.container}>
			<Calendar
				markedDates={markedDates}
				onDayPress={(day) => {
					setSelected(day.dateString);
					onDayClick?.(day.dateString);
				}}
				onMonthChange={(month) => {
					setVisibleYear(month.year);
				}}
				theme={{
					selectedDayBackgroundColor: "#2563eb",
					todayTextColor: "#2563eb",
					dotColor: "#f59e0b",
					arrowColor: "#2563eb",
					monthTextColor: "#111827",
					textMonthFontWeight: "bold",
					textDayFontSize: 16,
					textMonthFontFamily: "Montserrat-Bold",
					textDayFontFamily: "Montserrat-Regular",
					textDayHeaderFontFamily: "Montserrat-SemiBold",
				}}
			/>

			<BirthdayList
				birthdays={selectedBirthdays}
				selectedDate={selected}
				visibleYear={visibleYear}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, padding: 16 },
});
