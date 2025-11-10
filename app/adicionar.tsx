import DatePicker from "@/src/components/DatePicker";
import Layout from "@/src/components/Layout";
import { Button } from "@/src/components/ui/Button";
import TextInputField from "@/src/components/ui/TextInputField";
import { useAdd } from "@/src/hooks/useAdd";
import { useBirthdays } from "@/src/hooks/useBirthdays";
import { useRouter } from "expo-router";
import { Check } from "lucide-react-native";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const Adicionar = () => {
	const router = useRouter();
	const { editingBirthday, handleAdd } = useBirthdays();
	const birthday = editingBirthday;
	const { formData, setFormData, handleSubmit, errors, refs } =
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
					value={formData.date}
					onChange={(selectedDate) => {
						if (selectedDate) {
							setFormData({ ...formData, date: selectedDate });
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
								date: new Date().toISOString(),
								notes: "",
							});
							router.back();
						}}
						title="Cancelar"
						variant="outline"
					/>
					<Button
						onPress={handleSubmit}
						title={birthday ? "Atualizar" : "Adicionar"}
						icon={<Check style={{ width: 16, height: 16 }} />}
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
