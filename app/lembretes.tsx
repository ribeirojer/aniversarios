import Layout from "@/src/components/Layout";
import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { ScrollView, Text, View } from "react-native";
import EmptyReminders from "../src/components/reminders/EmptyReminders";
import ReminderList from "../src/components/reminders/ReminderList";
import { Button } from "../src/components/ui/Button";
import { useReminders } from "../src/hooks/useReminders";

export default function RemindersPage() {
  const { reminders } = useReminders();
  const router = useRouter();

  return (
    <Layout>
    <View style={{ flex: 1, backgroundColor: "#f9fafb" }}>
      {/* Cabeçalho */}
      <View
        style={{
          borderBottomWidth: 1,
          borderBottomColor: "#e5e7eb",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <View style={{ padding: 16, flexDirection: "row", alignItems: "center" }}>
          <Button onPress={() => router.push("/")} icon={<ArrowLeft width={20} height={20} />} title="Voltar" variant="outline" />
          <View style={{ marginLeft: 16 }}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>Lembretes ativos</Text>
            <Text style={{ fontSize: 14, color: "#6b7280" }}>Próximos 7 dias</Text>
          </View>
        </View>
      </View>

      {/* Lista de lembretes */}
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {reminders.length === 0 ? <EmptyReminders /> : <ReminderList reminders={reminders} />}
      </ScrollView>
    </View>
    </Layout>
  );
}
