import { Stack } from "expo-router";
import { BirthdaysProvider } from "@/src/contexts/BirthdaysContext";

export default function RootLayout() {
	return (
		<BirthdaysProvider>
			<Stack screenOptions={{ headerShown: false }} />
		</BirthdaysProvider>
	);
}
