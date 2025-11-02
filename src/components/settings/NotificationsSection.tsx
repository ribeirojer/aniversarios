import { Bell } from "lucide-react-native";
import { Switch, Text, View } from "react-native";
import Card from "../Card";

export default function NotificationsSection({
	enabled,
	onToggle,
}: {
	enabled: boolean;
	onToggle: (val: boolean) => void;
}) {
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
				<Bell width={20} height={20} /> Notificações
			</Text>
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<View>
					<Text style={{ fontSize: 16, fontFamily: "Montserrat-SemiBold" }}>
						Ativar notificações
					</Text>
					<Text
						style={{
							fontSize: 14,
							fontFamily: "Montserrat-Regular",
							color: "#6c757d",
						}}
					>
						Receba lembretes sobre aniversários próximos
					</Text>
				</View>
				<Switch value={enabled} onValueChange={onToggle} />
			</View>
		</Card>
	);
}
