import { Bell } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";
import { PALETTE } from "@/src/utils/constants";
import Card from "../Card";

export default function EmptyReminders() {
	return (
		<Card>
			<View style={style.container}>
				<View style={style.iconContainer}>
					<Bell width={32} height={32} color={PALETTE.primary} />
				</View>
				<Text style={style.text}>
					Nenhum lembrete ativo nos próximos 7 dias
				</Text>
			</View>
		</Card>
	);
}

const style = StyleSheet.create({
	container: {
		alignItems: "center",
		marginBottom: 8,
	},
	iconContainer: {
		width: 64,
		height: 64,
		borderRadius: 32,
		backgroundColor: PALETTE.background,
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 16,
	},
	text: {
		color: "#6b7280",
		fontFamily: "Montserrat_500Medium",
		textAlign: "center",
	},
});
