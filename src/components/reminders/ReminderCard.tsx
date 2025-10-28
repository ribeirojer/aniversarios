import { Bell, Calendar } from "lucide-react-native";
import { Text, View } from "react-native";
import type { BirthdayWithAge } from "../../types/birthday";

interface ReminderCardProps {
	birthday: BirthdayWithAge;
	days: number;
	reminderDate: number;
}

export default function ReminderCard({
	birthday,
	days,
	reminderDate,
}: ReminderCardProps) {
	const [month, day] = birthday.date.split("-");
	const dateFormatted = new Date(
		2000,
		Number(month) - 1,
		Number(day),
	).toLocaleDateString("pt-BR", {
		day: "numeric",
		month: "long",
	});

	return (
		<View
			style={{
				padding: 16,
				backgroundColor: "#ffffff",
				borderRadius: 8,
				elevation: 2,
				flexDirection: "row",
				gap: 16,
			}}
		>
			<View
				style={{
					width: 48,
					height: 48,
					borderRadius: 24,
					backgroundColor: "#e0f2fe",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<Bell width={24} height={24} color="#3b82f6" />
			</View>

			<View style={{ flex: 1 }}>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						marginBottom: 8,
					}}
				>
					<View>
						<Text style={{ fontSize: 16, fontWeight: "bold" }}>
							{birthday.name}
						</Text>
						<Text style={{ fontSize: 12, color: "#6b7280" }}>
							{dateFormatted}
						</Text>
					</View>

					<View
						style={{
							paddingHorizontal: 8,
							paddingVertical: 4,
							borderRadius: 4,
							backgroundColor: reminderDate === 0 ? "#3b82f6" : "#e5e7eb",
						}}
					>
						<Text
							style={{
								fontSize: 12,
								color: reminderDate === 0 ? "#ffffff" : "#6b7280",
							}}
						>
							{days === 0
								? "Hoje"
								: `${days} ${days === 1 ? "dia" : "dias"} antes`}
						</Text>
					</View>
				</View>

				<View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
					<Calendar width={16} height={16} color="#6b7280" />
					<Text style={{ fontSize: 12, color: "#6b7280" }}>
						{reminderDate === 0
							? "Lembrete hoje"
							: `Lembrete em ${reminderDate} ${reminderDate === 1 ? "dia" : "dias"}`}
					</Text>
				</View>
			</View>
		</View>
	);
}
