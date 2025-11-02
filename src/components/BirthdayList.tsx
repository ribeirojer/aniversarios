import { StyleSheet, Text, View } from "react-native";
import type { Birthday } from "../types/birthday";
import { getAgeAndNextBirthday } from "../utils/getAgeAndNextBirthday";

interface Props {
	birthdays: Birthday[];
	selectedDate: string;
	visibleYear: number;
}

export function BirthdayList({ birthdays, visibleYear }: Props) {
	if (birthdays.length === 0) {
		return (
			<Text style={styles.noBirthday}>Nenhum aniversário neste dia 🎈</Text>
		);
	}

	return (
		<View style={styles.details}>
			<Text style={styles.detailsTitle}>🎂 Aniversariantes do dia</Text>
			{birthdays.map((b) => {
				const { age, daysUntil } = getAgeAndNextBirthday(
					b.year ?? visibleYear,
					b.date,
				);
				return (
					<View key={b.id} style={styles.birthdayCard}>
						<Text style={styles.birthdayName}>{b.name}</Text>
						{b.year && (
							<Text style={styles.birthdayInfo}>
								Idade em {visibleYear}:{" "}
								<Text style={styles.highlight}>
									{age + (visibleYear - new Date().getFullYear())} anos
								</Text>
							</Text>
						)}
						<Text style={styles.birthdayInfo}>
							Faltam <Text style={styles.highlight}>{daysUntil}</Text> dias
						</Text>
						{b.notes && <Text style={styles.notes}>📝 {b.notes}</Text>}
					</View>
				);
			})}
		</View>
	);
}

const styles = StyleSheet.create({
	details: { marginTop: 24 },
	detailsTitle: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 12,
		fontFamily: "Montserrat-Bold",
	},
	birthdayCard: {
		backgroundColor: "#f9fafb",
		borderRadius: 12,
		padding: 12,
		marginBottom: 10,
		borderWidth: 1,
		borderColor: "#e5e7eb",
	},
	birthdayName: {
		fontSize: 18,
		fontWeight: "600",
		color: "#111827",
		fontFamily: "Montserrat-SemiBold",
	},
	birthdayInfo: { fontSize: 15, color: "#374151", marginTop: 4 },
	highlight: { color: "#2563eb", fontWeight: "600" },
	notes: { marginTop: 6, color: "#6b7280", fontStyle: "italic" },
	noBirthday: {
		marginTop: 24,
		fontSize: 16,
		color: "#6b7280",
		textAlign: "center",
		fontFamily: "Montserrat-Regular",
	},
});
