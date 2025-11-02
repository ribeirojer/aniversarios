import { useEffect, useState } from "react";
import { Alert } from "react-native";
import type { BirthdayWithAge } from "../types/birthday";
import {
	addBirthday,
	deleteBirthday,
	getBirthdaysWithDetails,
	updateBirthday,
} from "../utils/birthdays";
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

	const handleAdd = async (data: Parameters<typeof addBirthday>[0]) => {
		await addBirthday(data);
		await loadBirthdays();
	};

	const handleUpdate = async (data: Parameters<typeof addBirthday>[0]) => {
		if (editingId) {
			await updateBirthday(editingId, data);
			await loadBirthdays();
			setEditingId(null);
		}
	};

	const handleDelete = (id: string) => {
		Alert.alert(
			"Confirmação",
			"Tem certeza que deseja excluir este aniversário?",
			[
				{ text: "Cancelar", style: "cancel" },
				{
					text: "Excluir",
					style: "destructive",
					onPress: async () => {
						await deleteBirthday(id);
						await loadBirthdays();
					},
				},
			],
		);
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
