import { useRouter } from "expo-router";
import { CalendarView } from "@/src/components/calendar-view";
import { EmptyState } from "@/src/components/EmptyState";
import Layout from "@/src/components/Layout";
import { MonthlyCalendar } from "@/src/components/monthly-calendar";
import { ViewSelector } from "@/src/components/ViewSelector";
import { useBirthdays } from "@/src/hooks/useBirthdays";

export default function Index() {
	const router = useRouter();
	const { birthdays, view, setView, daysFilter, setDaysFilter } =
		useBirthdays();

	const handleAddBirthday = () => {
		router.push("/adicionar");
	};

	if (birthdays.length === 0) {
		return (
			<Layout>
				<EmptyState onAdd={handleAddBirthday} />
			</Layout>
		);
	}

	return (
		<Layout>
			<ViewSelector
				view={view}
				setView={setView}
				daysFilter={daysFilter}
				setDaysFilter={setDaysFilter}
			/>

			{view === "monthly" ? (
				<MonthlyCalendar birthdays={birthdays} />
			) : (
				<CalendarView birthdays={birthdays} />
			)}
		</Layout>
	);
}
