import { useEffect, useState } from "react";
import {
	addBirthday,
	deleteBirthday,
	getBirthdaysWithDetails,
	updateBirthday,
} from "../lib/birthdays";
import type { BirthdayWithAge } from "../types/birthday";
import { storage } from "../utils/storageAsync";

export function useBirthdays() {
	const [birthdays, setBirthdays] = useState<BirthdayWithAge[]>([]);
	const [editingId, setEditingId] = useState<string | null>(null);
	const [daysFilter, setDaysFilter] = useState<7 | 30>(7);
	const [showOnboarding, setShowOnboarding] = useState(false);
	const [view, setView] = useState<"calendar" | "monthly">("monthly");

	useEffect(() => {
		const loadData = async () => {
			const birthdays = await getBirthdaysWithDetails();
			setBirthdays(birthdays);
			const onboardingCompleted = await storage.get("onboarding_completed");
			if (!onboardingCompleted) setShowOnboarding(true);
		};

		loadData();
	}, []);

	const loadBirthdays = async () => {
		setBirthdays(await getBirthdaysWithDetails());
	};

	const handleAdd = (data: Parameters<typeof addBirthday>[0]) => {
		addBirthday(data);
		loadBirthdays();
	};

	const handleUpdate = (data: Parameters<typeof addBirthday>[0]) => {
		if (editingId) {
			updateBirthday(editingId, data);
			loadBirthdays();
			setEditingId(null);
		}
	};

	const handleDelete = (id: string) => {
		if (confirm("Tem certeza que deseja excluir este aniversário?")) {
			deleteBirthday(id);
			loadBirthdays();
		}
	};

	const handleEdit = (id: string) => {
		setEditingId(id);
	};

	const editingBirthday = editingId
		? birthdays.find((b) => b.id === editingId)
		: undefined;

	const upcomingBirthdays = birthdays.filter((b) => b.daysUntil <= daysFilter);

	return {
		birthdays,
		view,
		setView,
		editingBirthday,
		handleAdd,
		handleUpdate,
		handleDelete,
		handleEdit,
		daysFilter,
		setDaysFilter,
		upcomingBirthdays,
		showOnboarding,
		setShowOnboarding,
	};
}
