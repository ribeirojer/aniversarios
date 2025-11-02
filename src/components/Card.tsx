// components/Card.tsx
import type { ReactNode } from "react";
import { StyleSheet, View } from "react-native";

type Props = {
	children: ReactNode;
	style?: object;
};

export default function Card({ children, style }: Props) {
	const combinedStyle = style ? style : styles.card;
	return (
		<View style={combinedStyle}>
			<View>{children}</View>
		</View>
	);
}

const styles = StyleSheet.create({
	card: {
		backgroundColor: "#fff",
		padding: 16,
		borderRadius: 20,
		marginVertical: 8,
		shadowColor: "#000",
		shadowOpacity: 0.05,
		shadowRadius: 5,
		elevation: 3,
	},
});
