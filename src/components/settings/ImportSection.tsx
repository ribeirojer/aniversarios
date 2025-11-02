import { Upload } from "lucide-react-native";
import { Text } from "react-native";
import Card from "../Card";
import { Button } from "../ui/Button";

export default function ImportSection({ onImport }: { onImport: () => void }) {
	return (
		<Card>
			<Text
				style={{
					fontSize: 18,
					fontWeight: "600",
					marginBottom: 8,
					fontFamily: "Montserrat-SemiBold",
				}}
			>
				<Upload width={20} height={20} /> Importar dados
			</Text>
			<Text
				style={{
					fontSize: 14,
					color: "#6c757d",
					marginBottom: 8,
					fontFamily: "Montserrat-Regular",
				}}
			>
				Importe aniversários de um arquivo JSON exportado anteriormente
			</Text>
			<Button
				onPress={onImport}
				icon={<Upload width={16} height={16} />}
				title="Importar JSON"
				variant="secondary"
			/>
		</Card>
	);
}
