import { StyleSheet, Text, View } from "react-native";
import Layout from "@/src/components/Layout";
import DangerZoneSection from "../src/components/settings/DangerZoneSection";
import ExportSection from "../src/components/settings/ExportSection";
import ImportSection from "../src/components/settings/ImportSection";
import NotificationsSection from "../src/components/settings/NotificationsSection";
import RegionSection from "../src/components/settings/RegionSection";
import { useSettings } from "../src/hooks/useSettings";

export default function SettingsPage() {
	const {
		notificationsEnabled,
		timezone,
		handleNotificationToggle,
		handleExportJSON,
		handleExportCSV,
		handleImport,
		handleClearAll,
	} = useSettings();

	return (
		<Layout>
			<View style={{ flex: 1, paddingHorizontal: 16 }}>
				<Text style={styles.title}>Configurações</Text>

				<NotificationsSection
					enabled={notificationsEnabled}
					onToggle={handleNotificationToggle}
				/>
				<RegionSection timezone={timezone} />
				<ExportSection
					onExportJSON={handleExportJSON}
					onExportCSV={handleExportCSV}
				/>
				<ImportSection onImport={handleImport} />
				<DangerZoneSection onClear={handleClearAll} />
			</View>
		</Layout>
	);
}

const styles = StyleSheet.create({
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginVertical: 16,
		textAlign: "center",
		fontFamily: "Montserrat-Bold",
	},
});
