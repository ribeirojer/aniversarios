import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import type { Birthday } from "../types/birthday";

// Configuração do idioma PT-BR
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

	// Data atual
	const currentYear = new Date().getFullYear();

	// Converte datas no formato "MM-DD" para "YYYY-MM-DD"
	const markedDates = birthdays.reduce(
		(acc, b) => {
			const formattedDate = `${currentYear}-${b.date}`;
			acc[formattedDate] = {
				marked: true,
				dotColor: b.isSoon ? "#fbbf24" : "#f59e0b", // amarelo se está chegando
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

	// Filtra aniversários do dia selecionado
	const selectedBirthdays = birthdays.filter(
		(b) => `${currentYear}-${b.date}` === selected,
	);

	return (
		<View style={styles.container}>
			<Text>{JSON.stringify(birthdays)}</Text>
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

			{selectedBirthdays.length > 0 && (
				<View style={styles.details}>
					<Text style={styles.detailsTitle}>🎂 Aniversariantes do dia</Text>
					{selectedBirthdays.map((b) => (
						<View key={b.id} style={styles.birthdayCard}>
							<Text style={styles.birthdayName}>{b.name}</Text>
							<Text style={styles.birthdayInfo}>
								Idade: <Text style={styles.highlight}>{b.year} anos</Text>
							</Text>
							<Text style={styles.birthdayInfo}>
								Faltam{" "}
								<Text style={styles.highlight}>{b.notifyDaysBefore}</Text> dias
							</Text>
							{b.notes && <Text style={styles.notes}>📝 {b.notes}</Text>}
						</View>
					))}
				</View>
			)}

			{selectedBirthdays.length === 0 && selected && (
				<Text style={styles.noBirthday}>Nenhum aniversário neste dia 🎈</Text>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, padding: 16 },
	details: { marginTop: 24 },
	detailsTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 12 },
	birthdayCard: {
		backgroundColor: "#f9fafb",
		borderRadius: 12,
		padding: 12,
		marginBottom: 10,
		borderWidth: 1,
		borderColor: "#e5e7eb",
	},
	birthdayName: { fontSize: 18, fontWeight: "600", color: "#111827" },
	birthdayInfo: { fontSize: 15, color: "#374151", marginTop: 4 },
	highlight: { color: "#2563eb", fontWeight: "600" },
	notes: { marginTop: 6, color: "#6b7280", fontStyle: "italic" },
	noBirthday: {
		marginTop: 24,
		fontSize: 16,
		color: "#6b7280",
		textAlign: "center",
	},
});
