import { Text, View } from "react-native";
import { Button } from "./ui/Button";

interface Props {
  view: "calendar" | "monthly";
  setView: (v: "calendar" | "monthly") => void;
  daysFilter: 7 | 30;
  setDaysFilter: (v: 7 | 30) => void;
}

export function ViewSelector({ view, setView, daysFilter, setDaysFilter }: Props) {
  return (
    <View
      style={{
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 24,
      }}
    >
      <View>
        <Text style={{ fontSize: 20, fontWeight: "600", marginBottom: 8 }}>
          {view === "monthly"
            ? "Calendário do mês"
            : "Calendário anual"}
        </Text>
      </View>

      <View style={{ flexDirection: "row", gap: 8 }}>
        <Button title="Mês" onPress={() => setView("monthly")} />
        <Button title="Ano" onPress={() => setView("calendar")} />
      </View>
    </View>
  );
}
