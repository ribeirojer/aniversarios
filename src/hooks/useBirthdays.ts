import { useEffect, useState } from "react";
import {
  addBirthday,
  deleteBirthday,
  getBirthdaysWithDetails,
  updateBirthday,
} from "../lib/birthdays";
import type { BirthdayWithAge } from "../types/birthday";

export function useBirthdays() {
  const [birthdays, setBirthdays] = useState<BirthdayWithAge[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [daysFilter, setDaysFilter] = useState<7 | 30>(7);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [view, setView] = useState<"calendar" | "monthly">("monthly");

  useEffect(() => {
    loadBirthdays();
    const onboardingCompleted = localStorage.getItem("onboarding_completed");
    if (!onboardingCompleted) setShowOnboarding(true);
  }, []);

  const loadBirthdays = () => {
    setBirthdays(getBirthdaysWithDetails());
  };

  const handleAdd = (data: Parameters<typeof addBirthday>[0]) => {
    addBirthday(data);
    loadBirthdays();
    setShowForm(false);
  };

  const handleUpdate = (data: Parameters<typeof addBirthday>[0]) => {
    if (editingId) {
      updateBirthday(editingId, data);
      loadBirthdays();
      setEditingId(null);
      setShowForm(false);
    }
  };

  const handleDelete = (id: string) => {
    if (confirm("Tem certeza que deseja excluir este aniversário?")) {
      deleteBirthday(id);
      loadBirthdays();
    }
  };

  const handleEdit = (id: string) => {
    setEditingId(id);
    setShowForm(true);
  };

  const editingBirthday = editingId
    ? birthdays.find((b) => b.id === editingId)
    : undefined;

  const upcomingBirthdays = birthdays.filter(
    (b) => b.daysUntil <= daysFilter
  );

  return {
    birthdays,
    view,
    setView,
    showForm,
    setShowForm,
    editingBirthday,
    handleAdd,
    handleUpdate,
    handleDelete,
    handleEdit,
    daysFilter,
    setDaysFilter,
    upcomingBirthdays,
    showOnboarding,
    setShowOnboarding,
  };
}
