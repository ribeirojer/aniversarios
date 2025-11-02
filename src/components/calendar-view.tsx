import { Cake, Trash } from "lucide-react-native";
import {
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { useBirthdays } from "../hooks/useBirthdays";
import type { BirthdayWithAge } from "../types/birthday";
import Card from "./Card";

interface CalendarViewProps {
	birthdays: BirthdayWithAge[];
}

export function CalendarView({ birthdays }: CalendarViewProps) {
	const { handleDelete } = useBirthdays();
	const months = [
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
	];

	const birthdaysByMonth = months.map((month, index) => {
		const monthBirthdays = birthdays.filter((b) => {
			const [m] = b.date.split("-").map(Number);
			return m === index + 1;
		});
		return { month, birthdays: monthBirthdays };
	});

	return (
		<ScrollView contentContainerStyle={{ padding: 16 }}>
			{birthdaysByMonth.map(({ month, birthdays: monthBirthdays }) => (
				<Card key={month}>
					<Text style={styles.monthTitle}>{month}</Text>
					{monthBirthdays.length === 0 ? (
						<Text style={styles.emptyText}>Nenhum aniversário</Text>
					) : (
						<View>
							{monthBirthdays.map((birthday) => {
								const [, day] = birthday.date.split("-");
								return (
									<View
										key={birthday.id}
										style={{
											flexDirection: "row",
											alignItems: "center",
											marginBottom: 8,
										}}
									>
										<Cake
											width={16}
											height={16}
											color="#007AFF"
											style={{ marginRight: 8 }}
										/>
										<Text style={styles.cardText}>{day}</Text>
										<Text
											style={{
												flexShrink: 1,
												fontFamily: "Montserrat-Regular",
											}}
										>
											{birthday.name}
										</Text>
										<TouchableOpacity onPress={() => handleDelete(birthday.id)}>
											<Trash
												width={16}
												height={16}
												color="#FF3B30"
												style={{ marginLeft: 8 }}
											/>
										</TouchableOpacity>
									</View>
								);
							})}
						</View>
					)}
				</Card>
			))}
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	monthTitle: {
		fontWeight: "bold",
		fontSize: 16,
		marginBottom: 8,
		fontFamily: "Montserrat-Bold",
	},
	emptyText: {
		fontSize: 14,
		color: "#888",
		fontFamily: "Montserrat-Regular",
	},
	cardText: {
		fontSize: 16,
		fontFamily: "Montserrat-Regular",
		marginRight: 8,
		fontWeight: "500",
	},
});
