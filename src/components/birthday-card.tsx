import { Image } from "expo-image"
import { Cake, Pencil, Trash2, View } from "lucide-react-native"
import { StyleSheet, Text, TouchableOpacity } from "react-native"
import type { BirthdayWithAge } from "../types/birthday"

interface BirthdayCardProps {
  birthday: BirthdayWithAge
  onEdit: (id: string) => void
  onDelete: (id: string) => void
}

export function BirthdayCard({ birthday, onEdit, onDelete }: BirthdayCardProps) {
  const [month, day] = birthday.date.split("-")
  const dateFormatted = new Date(2000, Number.parseInt(month) - 1, Number.parseInt(day)).toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
  })

  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={() => console.log(`Navigate to /contato/${birthday.id}`)}>
        <View style={styles.container}>
          <View style={styles.photoContainer}>
            {birthday.photo ? (
              <Image
                source={{ uri: birthday.photo || "/placeholder.svg" }}
                style={styles.photo}
              />
            ) : (
              <View style={styles.placeholder}>
                <Cake width={28} height={28} color="#6B7280" />
              </View>
            )}
          </View>

          <View style={styles.content}>
            <View style={styles.header}>
              <View>
                <Text style={styles.name}>{birthday.name}</Text>
                <Text style={styles.date}>{dateFormatted}</Text>
                {birthday.age !== undefined && (
                  <Text style={styles.age}>
                    {birthday.isToday ? `${birthday.age} anos hoje!` : `Fará ${birthday.age + 1} anos`}
                  </Text>
                )}
              </View>

              <View style={styles.actions}>
                <TouchableOpacity onPress={() => onEdit(birthday.id)} style={styles.actionButton}>
                  <Pencil width={16} height={16} color="#6B7280" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onDelete(birthday.id)} style={[styles.actionButton, styles.deleteButton]}>
                  <Trash2 width={16} height={16} color="#EF4444" />
                </TouchableOpacity>
              </View>
            </View>

            {birthday.isToday && (
              <View style={styles.todayBadge}>
                <Cake width={14} height={14} color="#FFFFFF" />
                <Text style={styles.todayText}>Aniversário hoje!</Text>
              </View>
            )}

            {!birthday.isToday && birthday.isSoon && (
              <View style={styles.soonBadge}>
                <Text style={styles.soonText}>
                  Em {birthday.daysUntil} {birthday.daysUntil === 1 ? "dia" : "dias"}
                </Text>
              </View>
            )}

            {!birthday.isToday && !birthday.isSoon && (
              <Text style={styles.daysText}>Em {birthday.daysUntil} dias</Text>
            )}

            {birthday.notes && (
              <Text style={styles.notes} numberOfLines={2}>
                {birthday.notes}
              </Text>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  link: {
    textDecorationLine: "none",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  photoContainer: {
    marginRight: 16,
  },
  photo: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  placeholder: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  date: {
    fontSize: 14,
    color: "#6B7280",
  },
  age: {
    fontSize: 14,
    color: "#6B7280",
  },
  actions: {
    flexDirection: "row",
  },
  actionButton: {
    padding: 8,
    marginLeft: 8,
  },
  deleteButton: {
    backgroundColor: "#FEE2E2",
    borderRadius: 4,
  },
  todayBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#10B981",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    alignSelf: "flex-start",
    marginBottom: 8,
  },
  todayText: {
    color: "#FFFFFF",
    marginLeft: 4,
    fontSize: 12,
  },
  soonBadge: {
    backgroundColor: "#FBBF24",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    alignSelf: "flex-start",
    marginBottom: 8,
  },
  soonText: {
    color: "#FFFFFF",
    fontSize: 12,
  },
  daysText: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 8,
  },
  notes: {
    fontSize: 14,
    color: "#374151",
  },
})
