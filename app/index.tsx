import { CalendarView } from "@/src/components/calendar-view";
import { EmptyState } from "@/src/components/EmptyState";
import Layout from "@/src/components/Layout";
import { MonthlyCalendar } from "@/src/components/MonthlyCalendar";
import { ViewSelector } from "@/src/components/ViewSelector";
import { useBirthdays } from "@/src/hooks/useBirthdays";
import { useRouter } from "expo-router";

export default function Index() {
	const router = useRouter();
	const { birthdays, view, setView } = useBirthdays();

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
			<ViewSelector view={view} setView={setView} />
			{view === "monthly" ? (
				<MonthlyCalendar birthdays={birthdays} />
			) : (
				<CalendarView birthdays={birthdays} />
			)}
		</Layout>
	);
}
