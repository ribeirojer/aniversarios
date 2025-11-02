import { ScrollView, StyleSheet, Text } from "react-native";
import Layout from "@/src/components/Layout";
import EmptyReminders from "../src/components/reminders/EmptyReminders";
import ReminderList from "../src/components/reminders/ReminderList";
import { useReminders } from "../src/hooks/useReminders";

export default function RemindersPage() {
	const { reminders } = useReminders();

	return (
		<Layout>
			<Text style={styles.title}>Lembretes</Text>
			<ScrollView contentContainerStyle={{ padding: 16 }}>
				{reminders.length === 0 ? (
					<EmptyReminders />
				) : (
					<ReminderList reminders={reminders} />
				)}
			</ScrollView>
		</Layout>
	);
}

const styles = StyleSheet.create({
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginTop: 16,
		textAlign: "center",
		fontFamily: "Montserrat-Bold",
	},
});
