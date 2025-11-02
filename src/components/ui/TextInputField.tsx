import { useState } from "react";
import {
	StyleSheet,
	Text,
	TextInput,
	type TextInputProps,
	type TextStyle,
	View,
	type ViewStyle,
} from "react-native";
import { PALETTE } from "@/src/utils/constants";

type Props = {
	label?: string;
	value: string;
	onChangeText: (text: string) => void;
	placeholder?: string;
	multiline?: boolean;
	disabled?: boolean;
	secureTextEntry?: boolean;
	keyboardType?: TextInputProps["keyboardType"];
	errorMessage?: string;
	style?: ViewStyle;
	inputStyle?: TextStyle;
	accessibilityLabel?: string;
	testID?: string;
	onFocus?: () => void;
	onBlur?: () => void;
	ref?: React.Ref<TextInput>;
};

export default function TextInputField({
	value,
	onChangeText,
	placeholder,
	multiline = false,
	disabled = false,
	secureTextEntry = false,
	keyboardType = "default",
	errorMessage,
	style,
	inputStyle,
	accessibilityLabel,
	testID,
	label,
	onFocus,
	onBlur,
	ref,
}: Props) {
	const [isFocused, setIsFocused] = useState(false);

	return (
		<View style={[style]}>
			{label && <Text style={styles.label}>{label}</Text>}
			<TextInput
				ref={ref}
				style={[
					styles.input,
					multiline && styles.multiline,
					isFocused && styles.focused,
					errorMessage && styles.error,
					disabled && styles.disabled,
					inputStyle,
				]}
				value={value}
				onChangeText={onChangeText}
				placeholder={placeholder}
				placeholderTextColor={PALETTE.placeholder}
				multiline={multiline}
				editable={!disabled}
				secureTextEntry={secureTextEntry}
				keyboardType={keyboardType}
				accessibilityLabel={accessibilityLabel}
				testID={testID}
				onFocus={() => {
					setIsFocused(true);
					onFocus?.();
				}}
				onBlur={() => {
					setIsFocused(false);
					onBlur?.();
				}}
			/>
			{errorMessage ? (
				<Text style={styles.errorText}>{errorMessage}</Text>
			) : null}
		</View>
	);
}

const styles = StyleSheet.create({
	label: {
		fontSize: 16,
		fontWeight: "500",
		color: PALETTE.textPrimary,
		marginBottom: 4,
		marginLeft: 4,
		fontFamily: "Montserrat_500Medium",
	},
	input: {
		backgroundColor: "#fefcfc",
		borderWidth: 1,
		borderColor: PALETTE.border,
		borderRadius: 16,
		padding: 14,
		fontSize: 16,
		color: "#111827",
		marginVertical: 8,
		fontFamily: "Montserrat_400Regular",
	},
	multiline: {
		minHeight: 120,
		textAlignVertical: "top",
	},
	focused: {
		borderColor: PALETTE.accent, // azul para indicar foco
	},
	error: {
		borderColor: "#dc2626",
	},
	errorText: {
		color: "#dc2626",
		fontSize: 12,
		marginLeft: 4,
		marginTop: -4,
	},
	disabled: {
		opacity: 0.5,
	},
});
