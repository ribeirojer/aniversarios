import { Cake, Plus } from "lucide-react-native";
import { Text, View } from "react-native";
import { Button } from "./ui/Button";

export function EmptyState({ onAdd }: { onAdd: () => void }) {
	return (
		<View style={{ alignItems: "center", paddingVertical: 64 }}>
			<View
				style={{
					width: 80,
					height: 80,
					borderRadius: 40,
					backgroundColor: "#ff7f5020",
					justifyContent: "center",
					alignItems: "center",
					marginBottom: 16,
				}}
			>
				<Cake style={{ width: 40, height: 40 }} />
			</View>
			<Text style={{ color: "#888", fontSize: 16, marginBottom: 24 }}>
				Nenhum aniversário cadastrado ainda
			</Text>
			<Button
				onPress={onAdd}
				icon={<Plus style={{ width: 16, height: 16 }} />}
				title="Adicionar primeiro aniversário"
			></Button>
		</View>
	);
}
