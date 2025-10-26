import { Cake, Plus } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";

export function EmptyState({ onAdd }: { onAdd: () => void }) {
  return (
    <View style={{ alignItems: "center", paddingVertical: 64 }}>
      <View
        style={{
          width: 80,
          height: 80,
          borderRadius: 40,
          backgroundColor: "#ff7f5020",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <Cake style={{ width: 40, height: 40 }} />
      </View>
      <Text style={{ color: "#888", fontSize: 16, marginBottom: 24 }}>
        Nenhum aniversário cadastrado ainda
      </Text>
      <TouchableOpacity
        style={{
          padding: 12,
          borderRadius: 8,
          backgroundColor: "#ff7f50",
        }}
        onPress={onAdd}
      >
        <Plus style={{ width: 20, height: 20, marginRight: 8 }} />
        <Text style={{ fontSize: 14, color: "#fff" }}>
          Adicionar primeiro aniversário
        </Text>
      </TouchableOpacity>
    </View>
  );
}
