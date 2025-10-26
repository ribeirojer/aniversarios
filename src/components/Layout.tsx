import type { ReactNode } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { PALETTE } from "../utils/constants";
import BottomTabNavigator from "./BottomTabNavigator";
import { Header } from "./Header";

type LayoutProps = {
	children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<ScrollView style={styles.container}>
				<Header />
				{children}
			</ScrollView>
			<BottomTabNavigator />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: PALETTE.background,
		paddingBottom: 72,
		fontFamily: "Montserrat_400Regular",
	},
});
