import { router } from "expo-router";
import {
	Bell,
	Home,
	type LucideIcon,
	Settings
} from "lucide-react-native";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { PALETTE } from "../utils/constants"; // se já tiver uma paleta

type TabKey = "" | "lembretes" | "configuracoes";

const BottomTabNavigator = () => {
	const [activeTab, setActiveTab] = useState<TabKey>("");

	const tabs: { key: TabKey; icon: LucideIcon; label: string; href: string }[] =
		[
			{ key: "", icon: Home, label: "Início", href: "/inicio" },
			{
				key: "lembretes",
				icon: Bell,
				label: "Lembretes",
				href: "/lembretes",
			},
			{
				key: "configuracoes",
				icon: Settings,
				label: "Configurações",
				href: "/configuracoes",
			},
		];

	const handleTabPress = (
		key: "" | "lembretes" | "configuracoes",
	) => {
		setActiveTab(key);
		router.push(`/${key}`);
		// Aqui você pode adicionar a lógica de navegação, se necessário
	};

	return (
		<View style={styles.container}>
			<View style={styles.tabBar}>
				{tabs.map((tab) => {
					const Icon = tab.icon;
					const isActive = activeTab === tab.key;

					return (
						<TouchableOpacity
							key={tab.key}
							style={styles.tabItem}
							onPress={() => handleTabPress(tab.key)}
							activeOpacity={0.8}
						>
							<View style={styles.iconWrapper}>
								<Icon
									size={28}
									color={isActive ? PALETTE.primary : "#9ca3af"}
								/>
								{isActive && <View style={styles.activeDot} />}
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
};

export default BottomTabNavigator;

const styles = StyleSheet.create({
	container: {
		backgroundColor: "transparent",
		paddingBottom: 12,
	},
	tabBar: {
		flexDirection: "row",
		justifyContent: "space-around",
		backgroundColor: "#fff",
		marginHorizontal: 12,
		paddingVertical: 10,
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
	},
	iconWrapper: {
		alignItems: "center",
		justifyContent: "center",
		position: "relative",
	},
	activeDot: {
		position: "absolute",
		bottom: -4,
		width: 6,
		height: 6,
		borderRadius: 3,
		backgroundColor: "#10b981",
	},
	label: {
		fontSize: 12,
		marginTop: 4,
		fontWeight: "500",
	},
});
