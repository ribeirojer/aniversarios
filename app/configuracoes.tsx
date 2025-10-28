import { ScrollView } from "react-native";
import Layout from "@/src/components/Layout";
import DangerZoneSection from "../src/components/settings/DangerZoneSection";
import ExportSection from "../src/components/settings/ExportSection";
import ImportSection from "../src/components/settings/ImportSection";
import NotificationsSection from "../src/components/settings/NotificationsSection";
import RegionSection from "../src/components/settings/RegionSection";
import SettingsHeader from "../src/components/settings/SettingsHeader";
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
			<SettingsHeader />

			<ScrollView contentContainerStyle={{ padding: 16 }}>
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
			</ScrollView>
		</Layout>
	);
}
