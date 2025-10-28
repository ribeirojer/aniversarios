import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";

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

interface Birthday {
	date: string; // formato "YYYY-MM-DD"
	name: string;
}

interface Props {
	birthdays: Birthday[];
	onDayClick?: (date: string) => void;
}

export function MonthlyCalendar({ birthdays, onDayClick }: Props) {
	const [selected, setSelected] = useState("");

	const markedDates = birthdays.reduce(
		(acc, b) => {
			acc[b.date] = {
				marked: true,
				dotColor: "#f59e0b",
			};
			return acc;
		},
		{} as Record<
			string,
			{
				marked: boolean;
				dotColor: string;
				selected?: boolean;
				selectedColor?: string;
			}
		>,
	);

	if (selected) {
		markedDates[selected] = {
			...markedDates[selected],
			selected: true,
			selectedColor: "#2563eb",
		};
	}

	return (
		<View style={styles.container}>
			<Calendar
				markedDates={markedDates}
				onDayPress={(day) => {
					setSelected(day.dateString);
					onDayClick?.(day.dateString);
				}}
				theme={{
					selectedDayBackgroundColor: "#2563eb",
					todayTextColor: "#2563eb",
					dotColor: "#f59e0b",
					arrowColor: "#2563eb",
					monthTextColor: "#111827",
					textMonthFontWeight: "bold",
					textDayFontSize: 16,
				}}
			/>
			{selected && (
				<View style={styles.details}>
					<Text style={styles.detailsTitle}>Aniversários:</Text>
					{birthdays
						.filter((b) => b.date === selected)
						.map((b, _i) => (
							<Text key={`${b.date}-${b.name}`} style={styles.birthdayName}>
								🎉 {b.name}
							</Text>
						))}
				</View>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, padding: 16 },
	details: { marginTop: 16 },
	detailsTitle: { fontSize: 18, fontWeight: "bold" },
	birthdayName: { fontSize: 16, color: "#374151", marginTop: 4 },
});
