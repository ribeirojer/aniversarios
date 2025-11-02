import { router, usePathname } from "expo-router";
import {
	Bell,
	Home,
	type LucideIcon,
	Plus,
	Settings,
} from "lucide-react-native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { PALETTE } from "../utils/constants";

type Tab = {
	key: string;
	icon: LucideIcon;
	label: string;
	href: "/" | "/adicionar" | "/lembretes" | "/configuracoes";
};

const tabs: Tab[] = [
	{ key: "inicio", icon: Home, label: "Início", href: "/" },
	{ key: "adicionar", icon: Plus, label: "Adicionar", href: "/adicionar" },
	{ key: "lembretes", icon: Bell, label: "Lembretes", href: "/lembretes" },
	{
		key: "configuracoes",
		icon: Settings,
		label: "Configurações",
		href: "/configuracoes",
	},
];

export default function BottomTabNavigator() {
	const pathname = usePathname();

	const handlePress = (
		href: "/" | "/adicionar" | "/lembretes" | "/configuracoes",
	) => {
		router.push(href);
	};

	return (
		<View style={styles.container}>
			<View style={styles.tabBar}>
				{tabs.map((tab) => {
					const Icon = tab.icon;
					const isActive = pathname === tab.href;

					return (
						<TouchableOpacity
							key={tab.key}
							style={styles.tabItem}
							onPress={() => handlePress(tab.href)}
							activeOpacity={0.8}
						>
							<View style={styles.iconWrapper}>
								<Icon
									size={28}
									color={isActive ? PALETTE.primary : "#9ca3af"}
									strokeWidth={isActive ? 2.5 : 1.5}
								/>
							</View>
							<Text
								style={[
									styles.label,
									{ color: isActive ? PALETTE.primary : "#6b7280" },
								]}
							>
								{tab.label}
							</Text>
						</TouchableOpacity>
					);
				})}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: PALETTE.background,
		paddingBottom: 12,
	},
	tabBar: {
		flexDirection: "row",
		justifyContent: "space-around",
		backgroundColor: "#fff",
		marginHorizontal: 16,
		paddingVertical: 12,
		borderRadius: 20,
		shadowColor: "#000",
		shadowOpacity: 0.1,
		shadowOffset: { width: 0, height: 3 },
		shadowRadius: 6,
		elevation: 4,
	},
	tabItem: {
		alignItems: "center",
		flex: 1,
		position: "relative",
	},
	iconWrapper: {
		alignItems: "center",
		justifyContent: "center",
	},
	label: {
		fontSize: 12,
		marginTop: 4,
		fontWeight: "500",
		fontFamily: "Montserrat-Medium",
	},
});
