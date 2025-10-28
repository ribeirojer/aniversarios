import { useRouter } from "expo-router";
import { useState } from "react";
import { getBirthdays, saveBirthdays } from "../lib/birthdays";
import { storage } from "../utils/storageAsync";

export function useSettings() {
	const router = useRouter();
	const [notificationsEnabled, setNotificationsEnabled] = useState(false);

	const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

	const handleExportJSON = async () => {
		const birthdays = await getBirthdays();
		const dataStr = JSON.stringify(birthdays, null, 2);
		const blob = new Blob([dataStr], { type: "application/json" });
		const url = URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.href = url;
		link.download = `aniversarios-${new Date().toISOString().split("T")[0]}.json`;
		link.click();
		URL.revokeObjectURL(url);
	};

	const handleExportCSV = async () => {
		const birthdays = await getBirthdays();
		const headers = ["Nome", "Data", "Ano", "Notas", "Lembretes"];
		const rows = birthdays.map((b) => [
			b.name,
			b.date,
			b.year || "",
			b.notes || "",
			b.notifyDaysBefore.join(";"),
		]);

		const csv = [headers, ...rows]
			.map((r) => r.map((c) => `"${c}"`).join(","))
			.join("\n");
		const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
		const url = URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.href = url;
		link.download = `aniversarios-${new Date().toISOString().split("T")[0]}.csv`;
		link.click();
		URL.revokeObjectURL(url);
	};

	const handleImport = () => {
		const input = document.createElement("input");
		input.type = "file";
		input.accept = ".json";
		input.onchange = async (e) => {
			const file = (e.target as HTMLInputElement).files?.[0];
			if (!file) return;
			const reader = new FileReader();
			reader.onload = async (event) => {
				try {
					const data = JSON.parse(event.target?.result as string);
					if (Array.isArray(data)) {
						const merged = [...(await getBirthdays()), ...data];
						await saveBirthdays(merged);
						alert(`${data.length} aniversários importados com sucesso!`);
						router.push("/");
					} else alert("Formato de arquivo inválido");
				} catch {
					alert("Erro ao importar arquivo");
				}
			};
			reader.readAsText(file);
		};
		input.click();
	};

	const handleClearAll = () => {
		if (
			confirm(
				"Tem certeza que deseja excluir TODOS os aniversários? Esta ação não pode ser desfeita.",
			)
		) {
			if (
				confirm(
					"Última confirmação: todos os dados serão perdidos permanentemente!",
				)
			) {
				saveBirthdays([]);
				alert("Todos os dados foram excluídos");
				router.push("/");
			}
		}
	};

	const handleNotificationToggle = (enabled: boolean) => {
		setNotificationsEnabled(enabled);
		storage.set("notifications_enabled", enabled.toString());

		if (
			enabled &&
			"Notification" in window &&
			Notification.permission === "default"
		) {
			Notification.requestPermission();
		}
	};

	return {
		router,
		notificationsEnabled,
		timezone,
		handleNotificationToggle,
		handleExportJSON,
		handleExportCSV,
		handleImport,
		handleClearAll,
	};
}
