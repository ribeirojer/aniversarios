import { Globe } from "lucide-react-native";
import { Text } from "react-native";
import Card from "../Card";

export default function RegionSection({ timezone }: { timezone: string }) {
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
				<Globe width={20} height={20} /> Região
			</Text>
			<Text style={{ fontSize: 16, fontFamily: "Montserrat-SemiBold" }}>
				Fuso horário
			</Text>
			<Text
				style={{
					fontSize: 14,
					fontFamily: "Montserrat-Regular",
					color: "#6c757d",
				}}
			>
				Detectado automaticamente
			</Text>
			<Text
				style={{
					fontSize: 14,
					fontWeight: "500",
					marginTop: 8,
					fontFamily: "Montserrat-Medium",
				}}
			>
				{timezone}
			</Text>
		</Card>
	);
}
