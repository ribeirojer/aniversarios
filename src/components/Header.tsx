import { LinearGradient } from "expo-linear-gradient";
import { Cake } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";
import { PALETTE } from "../utils/constants";

export function Header() {
	return (
		<LinearGradient
			colors={[PALETTE.primary, PALETTE.secondary]}
			start={{ x: 0, y: 0 }}
			end={{ x: 1, y: 1 }}
			style={styles.container}
		>
			<View style={styles.inner}>
				<View style={styles.iconWrapper}>
					<Cake color="#fff" size={30} />
				</View>
				<View style={styles.textWrapper}>
					<Text style={styles.title}>Aniversários</Text>
					<Text style={styles.subtitle}>
						Nunca mais esqueça uma data especial 🎉
					</Text>
				</View>
			</View>
		</LinearGradient>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingVertical: 16,
		paddingHorizontal: 12,
		elevation: 4,
		shadowColor: "#000",
		shadowOpacity: 0.15,
		shadowOffset: { width: 0, height: 3 },
		shadowRadius: 6,
	},
	inner: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
	iconWrapper: {
		width: 64,
		height: 64,
		borderRadius: 20,
		backgroundColor: "rgba(255,255,255,0.25)",
		justifyContent: "center",
		alignItems: "center",
		marginRight: 16,
	},

	textWrapper: {
		alignItems: "flex-start",
	},

	title: {
		fontSize: 28,
		fontWeight: "bold",
		color: "#fff",
		fontFamily: "Montserrat_500Medium"	},

	subtitle: {
		fontSize: 14,
		color: "rgba(255,255,255,0.9)",
		fontFamily: "Montserrat_400Regular",
	},
});
