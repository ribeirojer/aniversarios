import { Bell, Plus, X } from "lucide-react-native";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { PALETTE } from "../utils/constants";
import Card from "./Card";
import { Button } from "./ui/Button";
import TextInputField from "./ui/TextInputField";

interface ReminderConfigProps {
	reminders: number[];
	onChange: (reminders: number[]) => void;
}

export function ReminderConfig({ reminders, onChange }: ReminderConfigProps) {
	const [newReminder, setNewReminder] = useState("");

	const addReminder = () => {
		const days = Number.parseInt(newReminder, 10);
		if (!Number.isNaN(days) && days >= 0 && !reminders.includes(days)) {
			onChange([...reminders, days].sort((a, b) => b - a));
			setNewReminder("");
		}
	};

	const removeReminder = (days: number) => {
		onChange(reminders.filter((d) => d !== days));
	};

	const quickOptions = [
		{ label: "No dia", value: 0 },
		{ label: "1 dia antes", value: 1 },
		{ label: "3 dias antes", value: 3 },
		{ label: "7 dias antes", value: 7 },
		{ label: "15 dias antes", value: 15 },
		{ label: "30 dias antes", value: 30 },
	];

	return (
		<Card>
			<View>
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						marginBottom: 12,
					}}
				>
					<Bell width={24} height={24} />
					<Text
						style={{
							marginLeft: 8,
							fontWeight: "bold",
							fontSize: 16,
							fontFamily: "Montserrat-Bold",
						}}
					>
						Lembretes
					</Text>
				</View>
				<Text
					style={{
						fontSize: 12,
						color: "#6b7280",
						marginBottom: 12,
						fontFamily: "Montserrat-Normal",
					}}
				>
					Configure quando você quer ser lembrado sobre este aniversário
				</Text>

				<View
					style={{
						flexWrap: "wrap",
						flexDirection: "row",
						gap: 8,
						marginBottom: 16,
					}}
				>
					{reminders.length === 0 ? (
						<Text
							style={{
								fontSize: 12,
								color: "#6b7280",
								fontFamily: "Montserrat-Normal",
							}}
						>
							Nenhum lembrete configurado
						</Text>
					) : (
						reminders.map((days) => (
							<View
								key={days}
								style={{
									flexDirection: "row",
									alignItems: "center",
									backgroundColor: "#e5e7eb",
									borderRadius: 16,
									paddingHorizontal: 12,
									paddingVertical: 6,
								}}
							>
								<Text
									style={{ marginRight: 4, fontFamily: "Montserrat-Normal" }}
								>
									{days === 0
										? "No dia"
										: `${days} ${days === 1 ? "dia" : "dias"} antes`}
								</Text>
								<TouchableOpacity
									onPress={() => removeReminder(days)}
									style={{
										backgroundColor: "rgba(239, 68, 68, 0.2)",
										borderRadius: 16,
										padding: 4,
									}}
								>
									<X width={12} height={12} color={PALETTE.primary} />
								</TouchableOpacity>
							</View>
						))
					)}
				</View>

				<View
					style={{
						padding: 16,
						backgroundColor: PALETTE.background,
						borderRadius: 8,
					}}
				>
					<Text
						style={{
							fontSize: 16,
							fontWeight: "bold",
							marginBottom: 12,
							fontFamily: "Montserrat-Bold",
						}}
					>
						Opções rápidas
					</Text>
					<View
						style={{
							flexWrap: "wrap",
							flexDirection: "row",
							gap: 8,
							marginBottom: 16,
						}}
					>
						{quickOptions.map((option) => (
							<Button
								key={option.value}
								onPress={() => {
									if (reminders.includes(option.value)) {
										removeReminder(option.value);
									} else {
										onChange(
											[...reminders, option.value].sort((a, b) => b - a),
										);
									}
								}}
								title={option.label}
								variant={
									reminders.includes(option.value) ? "secondary" : "outline"
								}
							></Button>
						))}
					</View>

					<View style={{ flexDirection: "row", gap: 8 }}>
						<TextInputField
							keyboardType="numeric"
							placeholder="Dias antes"
							value={newReminder}
							onChangeText={setNewReminder}
							style={{ flex: 1 }}
						/>
						<Button
							title=""
							onPress={addReminder}
							icon={<Plus width={16} height={16} color="#ffffff" />}
						></Button>
					</View>
				</View>
			</View>
		</Card>
	);
}
