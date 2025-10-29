import { ScrollView } from "react-native";
import Layout from "@/src/components/Layout";
import EmptyReminders from "../src/components/reminders/EmptyReminders";
import ReminderList from "../src/components/reminders/ReminderList";
import { useReminders } from "../src/hooks/useReminders";

export default function RemindersPage() {
	const { reminders } = useReminders();

	return (
		<Layout>
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
