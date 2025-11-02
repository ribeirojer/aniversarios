import { ScrollView, StyleSheet, Text, View } from "react-native";
import DatePicker from "@/src/components/DatePicker";
import Layout from "@/src/components/Layout";
import { ReminderConfig } from "@/src/components/reminder-config";
import { Button } from "@/src/components/ui/Button";
import TextInputField from "@/src/components/ui/TextInputField";
import { useAdd } from "@/src/hooks/useAdd";
import { useBirthdays } from "@/src/hooks/useBirthdays";

const Adicionar = () => {
	const { editingBirthday, handleAdd } = useBirthdays();
	const birthday = editingBirthday;
	const { formData, setFormData, handleSubmit, errors, refs, date, setDate } =
		useAdd({ birthday, handleAdd });

	return (
		<Layout>
			<Text style={styles.title}>Adicionar</Text>

			<ScrollView contentContainerStyle={{ padding: 16 }}>
				<TextInputField
					label="Nome"
					value={formData.name}
					onChangeText={(text) => setFormData({ ...formData, name: text })}
					placeholder="Ex: Maria Silva"
					errorMessage={errors.name}
					ref={refs.name}
				/>

				<DatePicker
					label="Data de nascimento"
					value={date}
					onChange={(selectedDate) => {
						if (selectedDate) {
							setDate(selectedDate);
						}
					}}
				/>

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
					<Text style={{ color: "red", fontFamily: "Montserrat-Normal" }}>
						{errors.notifyDaysBefore}
					</Text>
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

const styles = StyleSheet.create({
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginTop: 16,
		textAlign: "center",
		fontFamily: "Montserrat-Bold",
	},
});
