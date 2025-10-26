import React from "react";
import {
    ActivityIndicator,
    GestureResponderEvent,
    StyleSheet,
    Text,
    TextStyle,
    TouchableOpacity,
    View,
    ViewStyle,
} from "react-native";

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
      ? "#007BFF"
      : variant === "secondary"
      ? "#6C757D"
      : "transparent";

  const textColor = isOutline ? "#007BFF" : "#FFFFFF";
  const borderColor = isOutline ? "#007BFF" : "transparent";

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
          <Text style={[styles.text, { color: textColor }, textStyle]}>
            {title}
          </Text>
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
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 8,
  },
  disabled: {
    opacity: 0.6,
  },
});
