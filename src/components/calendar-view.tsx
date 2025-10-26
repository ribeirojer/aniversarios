import { Cake } from "lucide-react-native"
import { ScrollView, Text, View } from "react-native"
import type { BirthdayWithAge } from "../types/birthday"

interface CalendarViewProps {
  birthdays: BirthdayWithAge[]
}

export function CalendarView({ birthdays }: CalendarViewProps) {
  const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ]

  const birthdaysByMonth = months.map((month, index) => {
    const monthBirthdays = birthdays.filter((b) => {
      const [m] = b.date.split("-").map(Number)
      return m === index + 1
    })
    return { month, birthdays: monthBirthdays }
  })

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      {birthdaysByMonth.map(({ month, birthdays: monthBirthdays }) => (
        <View key={month} style={{ marginBottom: 16, padding: 16, borderWidth: 1, borderColor: '#ddd', borderRadius: 8 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 8 }}>{month}</Text>
          {monthBirthdays.length === 0 ? (
            <Text style={{ fontSize: 14, color: '#888' }}>Nenhum aniversário</Text>
          ) : (
            <View>
              {monthBirthdays.map((birthday) => {
                const [, day] = birthday.date.split("-")
                return (
                  <View key={birthday.id} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                    <Cake width={16} height={16} color="#007AFF" style={{ marginRight: 8 }} />
                    <Text style={{ fontWeight: '500', marginRight: 8 }}>{day}</Text>
                    <Text style={{ flexShrink: 1 }}>{birthday.name}</Text>
                  </View>
                )
              })}
            </View>
          )}
        </View>
      ))}
    </ScrollView>
  )
}
