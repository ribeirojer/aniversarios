import DateTimePicker from "@react-native-community/datetimepicker";
import { Trash2 } from "lucide-react-native";
import { useState } from "react";
import {
	Button,
	Modal,
	Platform,
	Pressable,
	StyleSheet,
	Text,
	View,
} from "react-native";
import { PALETTE } from "../utils/constants";
import { parseLocalDate } from "../utils/utils";

interface DatePickerProps {
	label?: string;
	value: string;
	onChange: (date: string | null) => void;
	mode?: "date" | "time";
}

export default function DatePicker({
	label,
	value,
	onChange,
	mode = "date",
}: DatePickerProps) {
	const [show, setShow] = useState(false);

	const _onChangeDate = (_: unknown, selectedDate?: Date) => {
		if (Platform.OS === "android") setShow(false);
		if (selectedDate) onChange(selectedDate.toISOString());
	};

	const date = value.includes("T")
		? parseLocalDate(value.split("T")[0])
		: parseLocalDate(value);

	return (
		<View style={styles.container}>
			{label && <Text style={styles.label}>{label}</Text>}

			<View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
				<Pressable style={styles.input} onPress={() => setShow(true)}>
					<Text style={styles.inputText}>
						{date.toLocaleDateString("pt-BR")}
					</Text>
				</Pressable>

				{value && (
					<Pressable style={styles.clearButton} onPress={() => onChange(null)}>
						<Text style={styles.clearButtonText}>
							<Trash2 />
						</Text>
					</Pressable>
				)}
			</View>

			{show && Platform.OS === "ios" && (
				<Modal transparent animationType="slide">
					<View style={styles.modalContainer}>
						<View style={styles.modalContent}>
							<DateTimePicker
								value={value ? new Date(value) : new Date()}
								mode={mode}
								display="spinner"
								onChange={(_, selectedDate) => {
									if (selectedDate) onChange(selectedDate.toISOString());
								}}
							/>
							<View style={styles.modalButtons}>
								<Button title="Cancelar" onPress={() => setShow(false)} />
								<Button
									title="Confirmar"
									onPress={() => setShow(false)}
									color="#007AFF"
								/>
							</View>
						</View>
					</View>
				</Modal>
			)}

			{show && Platform.OS === "android" && (
				<DateTimePicker
					value={value ? new Date(value) : new Date()}
					mode={mode}
					display="default"
					onChange={(_, selectedDate) => {
						if (selectedDate) onChange(selectedDate.toISOString());
					}}
				/>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginVertical: 8,
	},
	label: {
		marginBottom: 6,
		fontSize: 16,
		fontWeight: "500",
		fontFamily: "Montserrat-Medium",
		color: PALETTE.textPrimary,
	},
	input: {
		paddingVertical: 12,
		paddingHorizontal: 14,
		backgroundColor: PALETTE.surface, //"#f0f0f0",
		borderRadius: 10,
		flex: 1,
		borderColor: PALETTE.border,
		borderWidth: 1,
	},
	inputText: {
		fontSize: 16,
		color: PALETTE.placeholder,
		fontFamily: "Montserrat-Regular",
	},
	clearButton: {
		marginTop: 8,
		alignSelf: "flex-start",
	},
	clearButtonText: {
		color: "#d9534f",
		fontSize: 14,
		fontWeight: "500",
	},
	modalContainer: {
		flex: 1,
		justifyContent: "flex-end",
		backgroundColor: "rgba(0,0,0,0.4)",
	},
	modalContent: {
		backgroundColor: "white",
		padding: 20,
		borderTopLeftRadius: 16,
		borderTopRightRadius: 16,
	},
	modalButtons: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: 10,
	},
});
