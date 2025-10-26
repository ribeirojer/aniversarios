import { ChevronLeft, ChevronRight } from "lucide-react-native"
import { useState } from "react"
import { Text, View } from "react-native"
import { cn } from "../lib/utils"
import type { BirthdayWithAge } from "../types/birthday"
import { Button } from "./ui/Button"

interface MonthlyCalendarProps {
  birthdays: BirthdayWithAge[]
  onDayClick?: (day: number, month: number) => void
}

export function MonthlyCalendar({ birthdays, onDayClick }: MonthlyCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const monthNames = [
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

  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const firstDayOfMonth = new Date(year, month, 1).getDay()

  const previousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1))
  }

  const getBirthdaysForDay = (day: number) => {
    return birthdays.filter((b) => {
      const [m, d] = b.date.split("-").map(Number)
      return m === month + 1 && d === day
    })
  }

  const days = []
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(<div key={`empty-${i}`} className="aspect-square" />)
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dayBirthdays = getBirthdaysForDay(day)
    const isToday = new Date().getDate() === day && new Date().getMonth() === month && new Date().getFullYear() === year
    const hasBirthdays = dayBirthdays.length > 0

    days.push(
      <button
        key={day}
        onClick={() => onDayClick?.(day, month + 1)}
        className={cn(
          "aspect-square rounded-lg flex flex-col items-center justify-center relative transition-all hover:bg-accent/50",
          isToday && "bg-primary/10 ring-2 ring-primary",
          hasBirthdays && "font-semibold",
        )}
      >
        <span className={cn("text-sm", isToday && "text-primary")}>{day}</span>
        {hasBirthdays && (
          <div className="flex gap-0.5 mt-1">
            {dayBirthdays.slice(0, 3).map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-primary to-secondary" />
            ))}
          </div>
        )}
      </button>,
    )
  }

  return (
    <View style={{ padding: 24 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <Text style={{ fontSize: 18, fontWeight: "600" }}>
          {monthNames[month]} {year}
        </Text>
        <View style={{ flexDirection: "row", gap: 8 }}>
          <Button onPress={previousMonth} icon={<ChevronLeft width={16} height={16} />} title="Mês anterior">
            
          </Button>
          <Button onPress={nextMonth} icon={<ChevronRight width={16} height={16} />} title="Próximo mês">
          </Button>
        </View>
      </View>

      <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 8 }}>
        {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((day) => (
          <Text
            key={day}
            style={{
              textAlign: "center",
              fontSize: 12,
              fontWeight: "500",
              color: "#6b7280", // muted-foreground equivalent
              paddingVertical: 8,
            }}
          >
            {day}
          </Text>
        ))}
      </View>

      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
        {days}
      </View>
    </View>
  )
}
