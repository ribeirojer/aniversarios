import { View } from "react-native";
import type { BirthdayWithAge } from "../../types/birthday";
import ReminderCard from "./ReminderCard";

interface ReminderListProps {
	reminders: {
		birthday: BirthdayWithAge;
		days: number;
	}[];
}

export default function ReminderList({ reminders }: ReminderListProps) {
	return (
		<View style={{ gap: 16 }}>
			{reminders.map((reminder, index) => (
				<ReminderCard
					key={`${reminder.birthday.id}-${reminder.days}-${index}`}
					birthday={reminder.birthday}
					days={reminder.days}
				/>
			))}
		</View>
	);
}
