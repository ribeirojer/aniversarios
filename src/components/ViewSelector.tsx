import { Calendar as CalendarIcon } from "lucide-react-native";
import { Text, View } from "react-native";
import { PALETTE } from "../utils/constants";
import { Button } from "./ui/Button";

interface Props {
	view: "calendar" | "monthly";
	setView: (v: "calendar" | "monthly") => void;
}

export function ViewSelector({ view, setView }: Props) {
	return (
		<View
			style={{
				justifyContent: "space-between",
				alignItems: "center",
				marginBottom: 24,
				marginTop: 16,
			}}
		>
			<View>
				<Text style={{ fontSize: 20, fontWeight: "600", marginBottom: 8 }}>
					{view === "monthly" ? "Calendário do mês" : "Calendário anual"}
				</Text>
			</View>

			<View style={{ flexDirection: "row", gap: 8 }}>
				<Button
					title="Mês"
					icon={
						<CalendarIcon
							color={view === "monthly" ? PALETTE.background : PALETTE.primary}
						/>
					}
					onPress={() => setView("monthly")}
					variant={view === "monthly" ? "primary" : "outline"}
				/>
				<Button
					title="Ano"
					icon={
						<CalendarIcon
							color={view === "calendar" ? PALETTE.background : PALETTE.primary}
						/>
					}
					onPress={() => setView("calendar")}
					variant={view === "calendar" ? "primary" : "outline"}
				/>
			</View>
		</View>
	);
}
