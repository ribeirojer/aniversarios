import { Trash2 } from "lucide-react-native";
import { Text } from "react-native";
import Card from "../Card";
import { Button } from "../ui/Button";

export default function DangerZoneSection({
	onClear,
}: {
	onClear: () => void;
}) {
	return (
		<Card>
			<Text
				style={{
					fontSize: 18,
					fontWeight: "600",
					color: "#dc3545",
					marginBottom: 8,
					fontFamily: "Montserrat-SemiBold",
				}}
			>
				<Trash2 width={20} height={20} /> Zona de perigo
			</Text>
			<Text
				style={{
					fontSize: 14,
					color: "#6c757d",
					marginBottom: 8,
					fontFamily: "Montserrat-Regular",
				}}
			>
				Ações irreversíveis. Tenha certeza antes de prosseguir.
			</Text>
			<Button
				onPress={onClear}
				style={{ backgroundColor: "#dc3545" }}
				icon={<Trash2 width={16} height={16} />}
				title="Excluir todos os dados"
			/>
		</Card>
	);
}
