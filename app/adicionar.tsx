import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
	type GestureResponderEvent,
	ScrollView,
	Text,
	type TextInput,
	View,
} from "react-native";
import Layout from "@/src/components/Layout";
import { ReminderConfig } from "@/src/components/reminder-config";
import { Button } from "@/src/components/ui/Button";
import TextInputField from "@/src/components/ui/TextInputField";
import { useBirthdays } from "@/src/hooks/useBirthdays";

const Adicionar = () => {
	const { editingBirthday, handleAdd } = useBirthdays();
	const router = useRouter();
	const birthday = editingBirthday;
	const [formData, setFormData] = useState({
		name: birthday?.name || "",
		date: birthday?.date || "",
		year: birthday?.year?.toString() || "",
		notes: birthday?.notes || "",
		notifyDaysBefore: birthday?.notifyDaysBefore || [7, 1, 0],
	});
	const [errors, setErrors] = useState({
		name: "",
		date: "",
		year: "",
		notes: "",
		notifyDaysBefore: "",
	});

	const nameRef = useRef<TextInput>(null);
	const dateRef = useRef<TextInput>(null);
	const yearRef = useRef<TextInput>(null);

	const handleSubmit = (e: GestureResponderEvent) => {
		e.preventDefault();

		setErrors((_prev) => ({
			name: "",
			date: "",
			year: "",
			notes: "",
			notifyDaysBefore: "",
		}));

		if (!formData.name) {
			setErrors((prev) => ({ ...prev, name: "Nome é obrigatório." }));
			nameRef.current?.focus();
			return;
		}

		if (!formData.date) {
			setErrors((prev) => ({ ...prev, date: "Data é obrigatória." }));
			dateRef.current?.focus();
			return;
		}

		if (!/^(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/.test(formData.date)) {
			setErrors((prev) => ({
				...prev,
				date: "Data deve estar no formato MM-DD.",
			}));
			dateRef.current?.focus();
			return;
		}

		if (!formData.year) {
			setErrors((prev) => ({ ...prev, year: "Ano é obrigatório." }));
			yearRef.current?.focus();
			return;
		}

		if (!formData.notifyDaysBefore.length) {
			setErrors((prev) => ({
				...prev,
				notifyDaysBefore: "Pelo menos um lembrete é obrigatório.",
			}));
			return;
		}

		handleAdd({
			name: formData.name,
			date: formData.date,
			year: formData.year ? Number.parseInt(formData.year, 10) : undefined,
			notes: formData.notes || undefined,
			notifyDaysBefore: formData.notifyDaysBefore,
		});

		router.push("/");
	};
	return (
		<Layout>
			<ScrollView contentContainerStyle={{ padding: 16 }}>
				<TextInputField
					label="Nome"
					value={formData.name}
					onChangeText={(text) => setFormData({ ...formData, name: text })}
					placeholder="Ex: Maria Silva"
					errorMessage={errors.name}
					ref={nameRef}
				/>

				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						marginVertical: 16,
					}}
				>
					<TextInputField
						label="Data (Mês-Dia)"
						value={formData.date}
						onChangeText={(text) => setFormData({ ...formData, date: text })}
						placeholder="MM-DD"
						style={{ flex: 1, marginRight: 8 }}
						errorMessage={errors.date}
						ref={dateRef}
					/>
					<TextInputField
						label="Ano de nascimento"
						keyboardType="numeric"
						value={formData.year}
						onChangeText={(text) => setFormData({ ...formData, year: text })}
						placeholder="1990"
						style={{ flex: 1, marginLeft: 8 }}
						errorMessage={errors.year}
						ref={yearRef}
					/>
				</View>

				<TextInputField
					label="Notas"
					value={formData.notes}
					onChangeText={(text) => setFormData({ ...formData, notes: text })}
					placeholder="Ideias de presente, preferências, etc."
					multiline
				/>

				<ReminderConfig
					reminders={formData.notifyDaysBefore}
					onChange={(reminders) =>
						setFormData({ ...formData, notifyDaysBefore: reminders })
					}
				/>
				{errors.notifyDaysBefore ? (
					<Text style={{ color: "red" }}>{errors.notifyDaysBefore}</Text>
				) : null}

				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						marginTop: 16,
					}}
				>
					<Button
						onPress={() => {
							setFormData({
								name: "",
								date: "",
								year: "",
								notes: "",
								notifyDaysBefore: [7, 1, 0],
							});
						}}
						title="Cancelar"
						variant="outline"
					/>
					<Button
						onPress={handleSubmit}
						title={birthday ? "Atualizar" : "Adicionar"}
					/>
				</View>
			</ScrollView>
		</Layout>
	);
};

export default Adicionar;
