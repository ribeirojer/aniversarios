import { Bell } from "lucide-react-native";
import { Text, View } from "react-native";

export default function EmptyReminders() {
	return (
		<View
			style={{
				padding: 24,
				alignItems: "center",
				justifyContent: "center",
				backgroundColor: "#ffffff",
				borderRadius: 8,
				elevation: 2,
			}}
		>
			<View
				style={{
					width: 64,
					height: 64,
					borderRadius: 32,
					backgroundColor: "#e0f2fe",
					alignItems: "center",
					justifyContent: "center",
					marginBottom: 16,
				}}
			>
				<Bell width={32} height={32} color="#3b82f6" />
			</View>
			<Text style={{ color: "#6b7280" }}>
				Nenhum lembrete ativo nos próximos 7 dias
			</Text>
		</View>
	);
}
