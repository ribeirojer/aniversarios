import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import { useRouter } from "expo-router";
import * as Sharing from "expo-sharing";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { getBirthdays, saveBirthdays } from "../utils/birthdays";
import { storage } from "../utils/storageAsync";

export function useSettings() {
	const router = useRouter();
	const [notificationsEnabled, setNotificationsEnabled] = useState(false);
	const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

	// Carrega estado salvo
	useEffect(() => {
		(async () => {
			const saved = await storage.get("notifications_enabled");
			if (saved) setNotificationsEnabled(saved === "true");
		})();
	}, []);

	// Exportar JSON
	const handleExportJSON = async () => {
		const birthdays = await getBirthdays();
		const _dataStr = JSON.stringify(birthdays, null, 2);
		const filename = `aniversarios-${new Date().toISOString().split("T")[0]}.json`;
		const fileUri = FileSystem.Directory + filename;

		// await FileSystem.writeAsStringAsync(fileUri, dataStr, {
		//  encoding: FileSystem.File,
		//});

		if (await Sharing.isAvailableAsync()) {
			await Sharing.shareAsync(fileUri);
		} else {
			Alert.alert("Exportação", `Arquivo salvo em: ${fileUri}`);
		}
	};

	// Exportar CSV
	const handleExportCSV = async () => {
		const birthdays = await getBirthdays();
		const headers = ["Nome", "Data", "Ano", "Notas", "Lembretes"];
		const rows = birthdays.map((b) => [
			b.name,
			b.date,
			b.year || "",
			b.notes || "",
			(b.notifyDaysBefore || []).join(";"),
		]);

		const _csv = [headers, ...rows]
			.map((r) => r.map((c) => `"${c}"`).join(","))
			.join("\n");

		const filename = `aniversarios-${new Date().toISOString().split("T")[0]}.csv`;
		const fileUri = FileSystem.Directory + filename;

		//await FileSystem.writeAsStringAsync(fileUri, csv, {
		//  encoding: FileSystem.EncodingType.UTF8,
		//});

		if (await Sharing.isAvailableAsync()) {
			await Sharing.shareAsync(fileUri);
		} else {
			Alert.alert("Exportação", `Arquivo salvo em: ${fileUri}`);
		}
	};

	// Importar JSON
	const handleImport = async () => {
		const result = await DocumentPicker.getDocumentAsync({
			type: "application/json",
			copyToCacheDirectory: true,
		});

		if (result.canceled) return;

		try {
			const content = await FileSystem.readAsStringAsync(result.assets[0].uri);
			const data = JSON.parse(content);

			if (Array.isArray(data)) {
				const merged = [...(await getBirthdays()), ...data];
				await saveBirthdays(merged);
				Alert.alert(
					"Sucesso",
					`${data.length} aniversários importados com sucesso!`,
				);
				router.push("/");
			} else {
				Alert.alert("Erro", "Formato de arquivo inválido");
			}
		} catch (_err) {
			Alert.alert("Erro", "Erro ao importar arquivo");
		}
	};

	// Apagar tudo
	const handleClearAll = () => {
		Alert.alert(
			"Confirmação",
			"Tem certeza que deseja excluir TODOS os aniversários?",
			[
				{ text: "Cancelar", style: "cancel" },
				{
					text: "Excluir",
					style: "destructive",
					onPress: () => {
						Alert.alert(
							"Última confirmação",
							"Todos os dados serão perdidos permanentemente!",
							[
								{ text: "Cancelar", style: "cancel" },
								{
									text: "Sim, apagar tudo",
									style: "destructive",
									onPress: async () => {
										await saveBirthdays([]);
										Alert.alert(
											"Pronto",
											"Todos os aniversários foram apagados",
										);
										router.push("/");
									},
								},
							],
						);
					},
				},
			],
		);
	};

	// Alternar notificações
	const handleNotificationToggle = async (enabled: boolean) => {
		setNotificationsEnabled(enabled);
		await storage.set("notifications_enabled", enabled.toString());
		// Aqui você pode integrar com expo-notifications futuramente
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
