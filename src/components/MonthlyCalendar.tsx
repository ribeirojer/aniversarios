import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Calendar, type DateData, LocaleConfig } from "react-native-calendars";
import type { Theme } from "react-native-calendars/src/types";
import { LocaleConfig as LocaleConfigUtils } from "@/src/utils/LocaleConfig";
import { useCalendarMarks } from "../hooks/useCalendarMarks";
import type { Birthday } from "../types/birthday";
import { BirthdayList } from "./BirthdayList";

LocaleConfig.locales["pt-br"] = LocaleConfigUtils;
LocaleConfig.defaultLocale = "pt-br";

interface Props {
	birthdays: Birthday[];
}

export function MonthlyCalendar({ birthdays }: Props) {
	const [selected, setSelected] = useState("");
	const [visibleYear, setVisibleYear] = useState(new Date().getFullYear());
	const markedDates = useCalendarMarks(birthdays, selected, visibleYear);

	const handleMonthChange = (month: { year: number; month: number }) => {
		setVisibleYear(month.year);
	};

	const handleDayPress = (day: DateData) => {
		setSelected(`${day.year}-${day.month}-${day.day}`);
	};

	return (
		<View style={styles.container}>
			<View style={styles.calendarCard}>
				<Calendar
					markedDates={markedDates}
					onDayPress={handleDayPress}
					onMonthChange={handleMonthChange}
					enableSwipeMonths
					style={styles.calendar}
					theme={
						{
							backgroundColor: "transparent",
							calendarBackground: "transparent",
							selectedDayBackgroundColor: "#2563eb",
							selectedDayTextColor: "#ffffff",
							todayTextColor: "#2563eb",
							dayTextColor: "#111827",
							textDisabledColor: "#9ca3af",
							dotColor: "#f59e0b",
							selectedDotColor: "#ffffff",
							arrowColor: "#2563eb",
							monthTextColor: "#111827",
							textMonthFontWeight: "700",
							textDayFontSize: 16,
							textMonthFontFamily: "Montserrat-Bold",
							textDayFontFamily: "Montserrat-Regular",
							textDayHeaderFontFamily: "Montserrat-SemiBold",
							textSectionTitleColor: "#6b7280",
							dotStyle: { width: 6, height: 6, borderRadius: 3 },
						} as Theme
					}
				/>
			</View>
			<BirthdayList birthdays={birthdays} selectedDate={selected} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
	},
	calendarCard: {
		backgroundColor: "#ffffff",
		borderRadius: 16,
		padding: 12,
		shadowColor: "#000",
		shadowOpacity: 0.1,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 6,
		elevation: 3,
		marginBottom: 16,
	},
	calendar: {
		borderRadius: 12,
	},
});
