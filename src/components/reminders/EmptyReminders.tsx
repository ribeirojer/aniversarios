import { Bell } from "lucide-react-native";
import { Text, View } from "react-native";
import { PALETTE } from "@/src/utils/constants";
import Card from "../Card";

export default function EmptyReminders() {
	return (
		<Card>
			<View style={{ alignItems: "center", marginBottom: 8 }}>
				<View
					style={{
						width: 64,
						height: 64,
						borderRadius: 32,
						backgroundColor: PALETTE.background,
						alignItems: "center",
						justifyContent: "center",
						marginBottom: 16,
					}}
				>
					<Bell width={32} height={32} color={PALETTE.primary} />
				</View>
				<Text style={{ color: "#6b7280" }}>
					Nenhum lembrete ativo nos próximos 7 dias
				</Text>
			</View>
		</Card>
	);
}
