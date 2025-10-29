import { Download } from "lucide-react-native";
import { Text, View } from "react-native";
import Card from "../Card";
import { Button } from "../ui/Button";

export default function ExportSection({
	onExportJSON,
	onExportCSV,
}: {
	onExportJSON: () => void;
	onExportCSV: () => void;
}) {
	return (
		<Card>
			<Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 8 }}>
				<Download width={20} height={20} /> Exportar dados
			</Text>
			<Text style={{ fontSize: 14, color: "#6c757d", marginBottom: 8 }}>
				Faça backup dos seus aniversários
			</Text>
			<View style={{ flexDirection: "row", gap: 8 }}>
				<Button
					onPress={onExportJSON}
					style={{ flex: 1 }}
					icon={<Download width={16} height={16} />}
					variant="secondary"
					title="Exportar JSON"
				></Button>
				<Button
					onPress={onExportCSV}
					style={{ flex: 1 }}
					icon={<Download width={16} height={16} />}
					variant="secondary"
					title="Exportar CSV"
				></Button>
			</View>
		</Card>
	);
}
