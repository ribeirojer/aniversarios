import { useRouter } from "expo-router";
import { Plus } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";
import type { Birthday } from "../types/birthday";
import { normalizeDateString } from "../utils/utils";
import { Button } from "./ui/Button";

interface Props {
	birthdays: Birthday[];
	selectedDate: string;
}

export function BirthdayList({ birthdays, selectedDate }: Props) {
	const router = useRouter();
	console.log("Selected Date in BirthdayList:", selectedDate);
	console.log("Birthdays in BirthdayList:", birthdays);
  
  const selectedNormalized = selectedDate ? normalizeDateString(selectedDate) : null;
  
  const selectedBirthdays = birthdays.filter((b) => {
	if (!selectedNormalized) return false;
  
	const birthdayNormalized = normalizeDateString(b.date); // pode ser "YYYY-MM-DD" ou "MM-DD"
	console.log(`Comparing birthday ${birthdayNormalized} with selected ${selectedNormalized}`);
  
	// Se birthdayNormalized tem ano (length 10) comparamos full YYYY-MM-DD
	if (birthdayNormalized.length === 10) {
	  // selectedNormalized também deve ter ano (caso venha do Calendar ele tem)
	  // Permitimos ambos: comparar full YYYY-MM-DD ou apenas MM-DD
	  return (
		birthdayNormalized === selectedNormalized ||
		birthdayNormalized.slice(5) === selectedNormalized.slice(-5)
	  );
	}
  
	// Se birthdayNormalized é "MM-DD", comparamos só month-day
	return birthdayNormalized === selectedNormalized.slice(-5);
  });
  
	if (selectedBirthdays.length === 0) {
		return (
			<View style={styles.details}>
			<Text style={styles.noBirthday}>Nenhum aniversário neste dia 🎈</Text>
			<Button title="Adicionar aniversário" onPress={() => {
				router.push({
					pathname: "/adicionar",
					params: {
						date: selectedDate,
					},
				});
			}} icon={<Plus style={{ width: 16, height: 16 }} />} />
			</View>
		);
	}

	return (
		<View style={styles.details}>
			<Text style={styles.detailsTitle}>🎂 Aniversariantes do dia</Text>
			{birthdays.map((b) => {
				const daysUntil = 100;
				return (
					<View key={b.id} style={styles.birthdayCard}>
						<Text style={styles.birthdayName}>{b.name}</Text>
						<Text style={styles.birthdayInfo}>
							Idade: <Text style={styles.highlight}>0 anos hoje!</Text>
						</Text>
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
		marginBottom: 12,
		fontSize: 16,
		color: "#6b7280",
		textAlign: "center",
		fontFamily: "Montserrat-Regular",
	},
	selectedDate: {
		fontSize: 16,
		fontFamily: "Montserrat-Regular",
		marginBottom: 16,
		textAlign: "center",
	},
});
