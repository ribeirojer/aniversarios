import type React from "react"
import { useState } from "react"
import { GestureResponderEvent, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native"
import type { Birthday } from "../types/birthday"
import { ReminderConfig } from "./reminder-config"

interface BirthdayFormProps {
  birthday?: Birthday
  onSubmit: (data: Omit<Birthday, "id" | "createdAt">) => void
  onCancel: () => void
}

export function BirthdayForm({ birthday, onSubmit, onCancel }: BirthdayFormProps) {
  const [formData, setFormData] = useState({
    name: birthday?.name || "",
    date: birthday?.date || "",
    year: birthday?.year?.toString() || "",
    photo: birthday?.photo || "",
    notes: birthday?.notes || "",
    notifyDaysBefore: birthday?.notifyDaysBefore || [7, 1, 0],
  })

  const handleSubmit = (e: GestureResponderEvent) => {
    e.preventDefault()
    onSubmit({
      name: formData.name,
      date: formData.date,
      year: formData.year ? Number.parseInt(formData.year) : undefined,
      photo: formData.photo || undefined,
      notes: formData.notes || undefined,
      notifyDaysBefore: formData.notifyDaysBefore,
    })
  }

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <View>
        <Text style={{ fontWeight: "bold", marginBottom: 4 }}>Nome *</Text>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 4,
            padding: 8,
            marginBottom: 16,
          }}
          value={formData.name}
          onChangeText={(text) => setFormData({ ...formData, name: text })}
          placeholder="Ex: Maria Silva"
        />
      </View>

      <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 16 }}>
        <View style={{ flex: 1, marginRight: 8 }}>
          <Text style={{ fontWeight: "bold", marginBottom: 4 }}>Data (mês-dia) *</Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 4,
              padding: 8,
            }}
            value={formData.date}
            onChangeText={(text) => setFormData({ ...formData, date: text })}
            placeholder="MM-DD"
          />
          <Text style={{ fontSize: 12, color: "gray", marginTop: 4 }}>
            Formato: 03-15 (15 de março)
          </Text>
        </View>

        <View style={{ flex: 1, marginLeft: 8 }}>
          <Text style={{ fontWeight: "bold", marginBottom: 4 }}>Ano de nascimento</Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 4,
              padding: 8,
            }}
            keyboardType="numeric"
            value={formData.year}
            onChangeText={(text) => setFormData({ ...formData, year: text })}
            placeholder="1990"
          />
        </View>
      </View>

      <View style={{ marginBottom: 16 }}>
        <Text style={{ fontWeight: "bold", marginBottom: 4 }}>URL da foto</Text>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 4,
            padding: 8,
          }}
          value={formData.photo}
          onChangeText={(text) => setFormData({ ...formData, photo: text })}
          placeholder="https://exemplo.com/foto.jpg"
        />
      </View>

      <View style={{ marginBottom: 16 }}>
        <Text style={{ fontWeight: "bold", marginBottom: 4 }}>Notas</Text>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 4,
            padding: 8,
            textAlignVertical: "top",
          }}
          value={formData.notes}
          onChangeText={(text) => setFormData({ ...formData, notes: text })}
          placeholder="Ideias de presente, preferências, etc."
          multiline
          numberOfLines={3}
        />
      </View>

      <ReminderConfig
        reminders={formData.notifyDaysBefore}
        onChange={(reminders) => setFormData({ ...formData, notifyDaysBefore: reminders })}
      />

      <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 16 }}>
        <TouchableOpacity
          onPress={handleSubmit}
          style={{
            flex: 1,
            backgroundColor: "#007BFF",
            padding: 12,
            borderRadius: 4,
            alignItems: "center",
            marginRight: 8,
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "bold" }}>
            {birthday ? "Atualizar" : "Adicionar"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onCancel}
          style={{
            flex: 1,
            borderWidth: 1,
            borderColor: "#007BFF",
            padding: 12,
            borderRadius: 4,
            alignItems: "center",
            marginLeft: 8,
          }}
        >
          <Text style={{ color: "#007BFF", fontWeight: "bold" }}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}
