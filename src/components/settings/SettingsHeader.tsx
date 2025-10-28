import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { Text, View } from "react-native";
import { Button } from "../ui/Button";

export default function SettingsHeader() {
	const router = useRouter();

	return (
		<View
			style={{
				borderBottomWidth: 1,
				borderBottomColor: "#e9ecef",
				backgroundColor: "#ffffff",
				padding: 16,
			}}
		>
			<View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
				<Button
					onPress={() => router.push("/")}
					icon={<ArrowLeft width={20} height={20} />}
					title="Voltar"
				></Button>
				<Text style={{ fontSize: 20, fontWeight: "bold" }}>Configurações</Text>
			</View>
		</View>
	);
}
