import { Bell, Plus, X } from "lucide-react-native"
import { useState } from "react"
import { Text, TextInput, TouchableOpacity, View } from "react-native"

interface ReminderConfigProps {
  reminders: number[]
  onChange: (reminders: number[]) => void
}

export function ReminderConfig({ reminders, onChange }: ReminderConfigProps) {
  const [newReminder, setNewReminder] = useState("")

  const addReminder = () => {
    const days = Number.parseInt(newReminder)
    if (!isNaN(days) && days >= 0 && !reminders.includes(days)) {
      onChange([...reminders, days].sort((a, b) => b - a))
      setNewReminder("")
    }
  }

  const removeReminder = (days: number) => {
    onChange(reminders.filter((d) => d !== days))
  }

  const quickOptions = [
    { label: "No dia", value: 0 },
    { label: "1 dia antes", value: 1 },
    { label: "3 dias antes", value: 3 },
    { label: "7 dias antes", value: 7 },
    { label: "15 dias antes", value: 15 },
    { label: "30 dias antes", value: 30 },
  ]

  return (
    <View style={{ padding: 16 }}>
      <View>
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}>
          <Bell width={16} height={16} />
          <Text style={{ marginLeft: 8, fontWeight: "bold" }}>Lembretes</Text>
        </View>
        <Text style={{ fontSize: 12, color: "#6b7280", marginBottom: 12 }}>
          Configure quando você quer ser lembrado sobre este aniversário
        </Text>

        <View style={{ flexWrap: "wrap", flexDirection: "row", gap: 8, marginBottom: 16 }}>
          {reminders.length === 0 ? (
            <Text style={{ fontSize: 12, color: "#6b7280" }}>Nenhum lembrete configurado</Text>
          ) : (
            reminders.map((days) => (
              <View
                key={days}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: "#e5e7eb",
                  borderRadius: 16,
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                }}
              >
                <Text style={{ marginRight: 4 }}>
                  {days === 0 ? "No dia" : `${days} ${days === 1 ? "dia" : "dias"} antes`}
                </Text>
                <TouchableOpacity
                  onPress={() => removeReminder(days)}
                  style={{
                    backgroundColor: "rgba(239, 68, 68, 0.2)",
                    borderRadius: 16,
                    padding: 4,
                  }}
                >
                  <X width={12} height={12} />
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>

        <View style={{ padding: 16, backgroundColor: "rgba(156, 163, 175, 0.5)", borderRadius: 8 }}>
          <Text style={{ fontSize: 12, fontWeight: "bold", marginBottom: 12 }}>Opções rápidas</Text>
          <View style={{ flexWrap: "wrap", flexDirection: "row", gap: 8, marginBottom: 16 }}>
            {quickOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
                onPress={() => {
                  if (reminders.includes(option.value)) {
                    removeReminder(option.value)
                  } else {
                    onChange([...reminders, option.value].sort((a, b) => b - a))
                  }
                }}
                style={{
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                  borderRadius: 4,
                  backgroundColor: reminders.includes(option.value) ? "#1f2937" : "transparent",
                  borderWidth: 1,
                  borderColor: "#1f2937",
                }}
              >
                <Text
                  style={{
                    color: reminders.includes(option.value) ? "#ffffff" : "#1f2937",
                  }}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={{ flexDirection: "row", gap: 8 }}>
            <TextInput
              style={{
                flex: 1,
                borderWidth: 1,
                borderColor: "#d1d5db",
                borderRadius: 4,
                paddingHorizontal: 8,
                height: 40,
              }}
              keyboardType="numeric"
              placeholder="Dias antes"
              value={newReminder}
              onChangeText={setNewReminder}
              onSubmitEditing={addReminder}
            />
            <TouchableOpacity
              onPress={addReminder}
              style={{
                justifyContent: "center",
                alignItems: "center",
                paddingHorizontal: 12,
                backgroundColor: "#1f2937",
                borderRadius: 4,
              }}
            >
              <Plus width={16} height={16} color="#ffffff" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}
