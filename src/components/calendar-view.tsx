import { Trash } from "lucide-react-native";
import {
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View
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
			const dateObj = new Date(b.date);
			const [m] = dateObj.getMonth() + 1 + "-" + dateObj.getDate().toString().split("-");
			return m === (index + 1).toString();
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
								const dateObj = new Date(birthday.date);
								const [, day] = dateObj.getMonth() + 1 + "-" + dateObj.getDate().toString().split("-");
								return (
									<View key={birthday.id} style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
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
			<Text>{JSON.stringify(birthdays)}</Text>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	monthTitle: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 8,
		fontFamily: "Montserrat-SemiBold",
	},
	emptyText: {
		fontSize: 14,
		color: "#6b7280",
		fontFamily: "Montserrat-Regular",
	},
	cardText: {
		fontSize: 16,
		fontFamily: "Montserrat-Regular",
		marginRight: 8,
	},
});
