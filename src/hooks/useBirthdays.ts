import { useEffect, useState } from "react";
import { Alert } from "react-native";
import type { BirthdayWithAge } from "../types/birthday";
import {
	addBirthday,
	deleteBirthday,
	getBirthdaysWithDetails,
	updateBirthday,
} from "../utils/birthdays";

export function useBirthdays() {
	const [birthdays, setBirthdays] = useState<BirthdayWithAge[]>([]);
	const [editingId, setEditingId] = useState<string | null>(null);
	const [view, setView] = useState<"calendar" | "monthly">("monthly");

	const loadData = async () => {
		const birthdays = await getBirthdaysWithDetails();
		setBirthdays(birthdays);
	};

	useEffect(() => {
		loadData();
	}, []);

	const loadBirthdays = async () => {
		const birthdays = await getBirthdaysWithDetails();
		setBirthdays(birthdays);
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

	return {
		birthdays,
		view,
		setView,
		editingBirthday,
		handleAdd,
		handleUpdate,
		handleDelete,
		handleEdit,
	};
}
