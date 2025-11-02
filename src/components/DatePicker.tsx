import DateTimePicker from "@react-native-community/datetimepicker";
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

interface DatePickerProps {
	label?: string;
	value: Date | null;
	onChange: (date: Date | null) => void;
	mode?: "date" | "time";
}

export default function DatePicker({
	label,
	value,
	onChange,
	mode = "date",
}: DatePickerProps) {
	const [show, setShow] = useState(false);

	const onChangeDate = (_: unknown, selectedDate?: Date) => {
		if (Platform.OS === "android") setShow(false);
		if (selectedDate) onChange(selectedDate);
	};

	const formatDateBR = (date: Date) => {
		const d = date.getDate().toString().padStart(2, "0");
		const m = (date.getMonth() + 1).toString().padStart(2, "0");
		const y = date.getFullYear();
		return `${d}/${m}/${y}`;
	};

	return (
		<View style={styles.container}>
			{label && <Text style={styles.label}>{label}</Text>}

			<Pressable style={styles.input} onPress={() => setShow(true)}>
				<Text style={styles.inputText}>
					{value ? formatDateBR(value) : "Selecionar data"}
				</Text>
			</Pressable>

			{value && (
				<Pressable style={styles.clearButton} onPress={() => onChange(null)}>
					<Text style={styles.clearButtonText}>Remover</Text>
				</Pressable>
			)}

			{show && Platform.OS === "ios" && (
				<Modal transparent animationType="slide">
					<View style={styles.modalContainer}>
						<View style={styles.modalContent}>
							<DateTimePicker
								value={value || new Date()}
								mode={mode}
								display="spinner"
								onChange={(_, selectedDate) => {
									if (selectedDate) onChange(selectedDate);
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
					value={value || new Date()}
					mode={mode}
					display="default"
					onChange={onChangeDate}
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
	},
	input: {
		paddingVertical: 12,
		paddingHorizontal: 14,
		backgroundColor: "#f0f0f0",
		borderRadius: 10,
	},
	inputText: {
		fontSize: 16,
		color: "#333",
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
