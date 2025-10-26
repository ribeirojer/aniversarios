import type { Birthday, BirthdayWithAge } from "../types/birthday"

const STORAGE_KEY = "birthdays"

export function getBirthdays(): Birthday[] {
  if (typeof window === "undefined") return []
  const data = localStorage.getItem(STORAGE_KEY)
  return data ? JSON.parse(data) : []
}

export function saveBirthdays(birthdays: Birthday[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(birthdays))
}

export function addBirthday(birthday: Omit<Birthday, "id" | "createdAt">): Birthday {
  const birthdays = getBirthdays()
  const newBirthday: Birthday = {
    ...birthday,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    notifyDaysBefore: birthday.notifyDaysBefore || [7, 1, 0],
  }
  birthdays.push(newBirthday)
  saveBirthdays(birthdays)
  return newBirthday
}

export function updateBirthday(id: string, updates: Partial<Birthday>): void {
  const birthdays = getBirthdays()
  const index = birthdays.findIndex((b) => b.id === id)
  if (index !== -1) {
    birthdays[index] = { ...birthdays[index], ...updates }
    saveBirthdays(birthdays)
  }
}

export function deleteBirthday(id: string): void {
  const birthdays = getBirthdays().filter((b) => b.id !== id)
  saveBirthdays(birthdays)
}

export function calculateDaysUntil(dateStr: string): number {
  const today = new Date()
  const [month, day] = dateStr.split("-").map(Number)

  const thisYear = new Date(today.getFullYear(), month - 1, day)
  const nextYear = new Date(today.getFullYear() + 1, month - 1, day)

  const targetDate = thisYear >= today ? thisYear : nextYear

  const diffTime = targetDate.getTime() - today.getTime()
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

export function calculateAge(dateStr: string, year?: number): number | undefined {
  if (!year) return undefined
  const today = new Date()
  const [month, day] = dateStr.split("-").map(Number)

  let age = today.getFullYear() - year

  if (today.getMonth() + 1 < month || (today.getMonth() + 1 === month && today.getDate() < day)) {
    age--
  }

  return age
}

export function getBirthdaysWithDetails(): BirthdayWithAge[] {
  const birthdays = getBirthdays()

  return birthdays
    .map((birthday) => {
      const daysUntil = calculateDaysUntil(birthday.date)
      const age = calculateAge(birthday.date, birthday.year)

      return {
        ...birthday,
        age,
        daysUntil,
        isToday: daysUntil === 0,
        isSoon: daysUntil <= 7 && daysUntil >= 0,
      }
    })
    .sort((a, b) => a.daysUntil - b.daysUntil)
}

export function getBirthdaysByMonth(month: number): BirthdayWithAge[] {
  return getBirthdaysWithDetails().filter((b) => {
    const [m] = b.date.split("-").map(Number)
    return m === month
  })
}
