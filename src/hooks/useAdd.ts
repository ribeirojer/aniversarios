import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import type { GestureResponderEvent, TextInput } from "react-native";

type Props = {
	birthday:
		| {
				name?: string;
				date?: string;
				year?: number;
				notes?: string;
				notifyDaysBefore?: number[];
		  }
		| undefined;
	handleAdd: (data: {
		name: string;
		date: string;
		year?: number;
		notes?: string;
		notifyDaysBefore: number[];
	}) => void;
};

export const useAdd = ({ birthday, handleAdd }: Props) => {
	const router = useRouter();
	const [date, setDate] = useState(new Date(1598051730000));
	const [formData, setFormData] = useState({
		name: birthday?.name || "",
		date: birthday?.date || "",
		year: birthday?.year?.toString() || "",
		notes: birthday?.notes || "",
		notifyDaysBefore: birthday?.notifyDaysBefore || [7, 1, 0],
	});
	const [errors, setErrors] = useState({
		name: "",
		date: "",
		year: "",
		notes: "",
		notifyDaysBefore: "",
	});

	const nameRef = useRef<TextInput>(null);
	const dateRef = useRef<TextInput>(null);
	const yearRef = useRef<TextInput>(null);

	const refs = {
		name: nameRef,
		date: dateRef,
		year: yearRef,
	};

	const handleSubmit = (e: GestureResponderEvent) => {
		e.preventDefault();

		setErrors((_prev) => ({
			name: "",
			date: "",
			year: "",
			notes: "",
			notifyDaysBefore: "",
		}));

		if (!formData.name) {
			setErrors((prev) => ({ ...prev, name: "Nome é obrigatório." }));
			nameRef.current?.focus();
			return;
		}

		if (!formData.date) {
			setErrors((prev) => ({ ...prev, date: "Data é obrigatória." }));
			dateRef.current?.focus();
			return;
		}

		if (!/^(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/.test(formData.date)) {
			setErrors((prev) => ({
				...prev,
				date: "Data deve estar no formato MM-DD.",
			}));
			dateRef.current?.focus();
			return;
		}

		if (!formData.year) {
			setErrors((prev) => ({ ...prev, year: "Ano é obrigatório." }));
			yearRef.current?.focus();
			return;
		}

		if (!formData.notifyDaysBefore.length) {
			setErrors((prev) => ({
				...prev,
				notifyDaysBefore: "Pelo menos um lembrete é obrigatório.",
			}));
			return;
		}

		handleAdd({
			name: formData.name,
			date: formData.date,
			year: formData.year ? Number.parseInt(formData.year, 10) : undefined,
			notes: formData.notes || undefined,
			notifyDaysBefore: formData.notifyDaysBefore,
		});

		router.push("/");
	};

	return {
		date,
		setDate,
		formData,
		setFormData,
		errors,
		setErrors,
		refs,
		handleSubmit,
	};
};
