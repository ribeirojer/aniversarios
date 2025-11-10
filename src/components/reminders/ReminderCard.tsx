import { Bell } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";
import type { BirthdayWithAge } from "../../types/birthday";
import Card from "../Card";

interface ReminderCardProps {
	birthday: BirthdayWithAge;
	days: number;
}

export default function ReminderCard({ birthday, days }: ReminderCardProps) {
	// Cria a data de forma "local" (sem timezone)
	const [year, month, day] = birthday.date.split("-").map(Number);
	const date = new Date(year, month - 1, day); // <-- local, não UTC

	const dateFormatted = date.toLocaleDateString("pt-BR", {
		day: "2-digit",
		month: "long",
		year: "numeric",
	});

	const isToday = days === 0;

	return (
		<Card style={styles.card}>
			<View style={styles.row}>
				<View style={styles.iconContainer}>
					<Bell width={24} height={24} color="#3b82f6" />
				</View>

				<View style={styles.infoContainer}>
					<View>
						<Text style={styles.name}>{birthday.name}</Text>
						<Text style={styles.date}>{dateFormatted}</Text>
					</View>

					<View
						style={[
							styles.badge,
							isToday ? styles.badgeToday : styles.badgeDefault,
						]}
					>
						<Text
							style={[styles.badgeText, isToday ? styles.badgeTextToday : null]}
						>
							{isToday
								? "🎉 Hoje"
								: `em ${days} ${days === 1 ? "dia" : "dias"}`}
						</Text>
					</View>
				</View>
			</View>
		</Card>
	);
}

const styles = StyleSheet.create({
	card: {
		paddingVertical: 10,
		paddingHorizontal: 12,
		borderRadius: 12,
		backgroundColor: "#fff",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.05,
		shadowRadius: 4,
		elevation: 2,
	},
	row: {
		flexDirection: "row",
		alignItems: "center",
		gap: 12,
	},
	iconContainer: {
		width: 48,
		height: 48,
		borderRadius: 24,
		backgroundColor: "#e0f2fe",
		alignItems: "center",
		justifyContent: "center",
	},
	infoContainer: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	name: {
		fontSize: 16,
		fontWeight: "600",
		color: "#111827",
	},
	date: {
		fontSize: 13,
		color: "#6b7280",
		textTransform: "capitalize",
	},
	badge: {
		paddingHorizontal: 10,
		paddingVertical: 4,
		borderRadius: 6,
		backgroundColor: "#f3f4f6",
	},
	badgeDefault: {
		backgroundColor: "#f3f4f6",
	},
	badgeToday: {
		backgroundColor: "#2563eb",
	},
	badgeText: {
		fontSize: 12,
		fontWeight: "500",
		color: "#374151",
	},
	badgeTextToday: {
		color: "#fff",
	},
});
