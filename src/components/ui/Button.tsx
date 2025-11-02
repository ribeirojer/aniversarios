import type React from "react";
import {
	ActivityIndicator,
	type GestureResponderEvent,
	StyleSheet,
	Text,
	type TextStyle,
	TouchableOpacity,
	View,
	type ViewStyle,
} from "react-native";
import { PALETTE } from "@/src/utils/constants";

interface ButtonProps {
	title: string;
	onPress: (event: GestureResponderEvent) => void;
	disabled?: boolean;
	loading?: boolean;
	variant?: "primary" | "secondary" | "outline";
	icon?: React.ReactNode;
	style?: ViewStyle;
	textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
	title,
	onPress,
	disabled = false,
	loading = false,
	variant = "primary",
	icon,
	style,
	textStyle,
}) => {
	const isOutline = variant === "outline";

	const backgroundColor =
		variant === "primary"
			? PALETTE.primary
			: variant === "secondary"
				? PALETTE.secondary
				: "transparent";

	const textColor = isOutline ? PALETTE.primary : "#FFFFFF";
	const borderColor = isOutline ? PALETTE.primary : "transparent";

	return (
		<TouchableOpacity
			style={[
				styles.button,
				{ backgroundColor, borderColor },
				disabled && styles.disabled,
				style,
			]}
			onPress={onPress}
			activeOpacity={0.8}
			disabled={disabled || loading}
		>
			{loading ? (
				<ActivityIndicator color={textColor} />
			) : (
				<View style={styles.content}>
					{icon && <View style={styles.icon}>{icon}</View>}
					{title && (
						<Text style={[styles.text, { color: textColor }, textStyle]}>
							{title}
						</Text>
					)}
					{!title && <Text style={{ marginLeft: -8 }}></Text>}
				</View>
			)}
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	button: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 12,
		paddingHorizontal: 20,
		borderRadius: 10,
		borderWidth: 2,
	},
	text: {
		fontSize: 16,
		fontWeight: "600",
		fontFamily: "Montserrat-SemiBold",
	},
	content: {
		flexDirection: "row",
		alignItems: "center",
	},
	icon: {
		color: "#FFFFFF",
		marginRight: 8,
	},
	disabled: {
		opacity: 0.6,
	},
});
