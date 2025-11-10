import { useLocalSearchParams, useRouter } from "expo-router";
import { useRef, useState } from "react";
import type { GestureResponderEvent, TextInput } from "react-native";

type Props = {
	birthday:
		| {
				name?: string;
				date?: string;
				notes?: string;
		  }
		| undefined;
	handleAdd: (data: {
		name: string;
		date: string;
		notes?: string;
	}) => void;
};

export const useAdd = ({ birthday, handleAdd }: Props) => {
	const router = useRouter();
	const params = useLocalSearchParams();
	const date = params.date as string;
	const [formData, setFormData] = useState({
		name: birthday?.name || "",
		date: date ? date : new Date().toISOString(),
		notes: birthday?.notes || "",
	});
	const [errors, setErrors] = useState({
		name: "",
		date: "",
		notes: "",
	});

	const nameRef = useRef<TextInput>(null);
	const dateRef = useRef<TextInput>(null);

	const refs = {
		name: nameRef,
		date: dateRef,
	};

	const handleSubmit = (e: GestureResponderEvent) => {
		e.preventDefault();

		setErrors((_prev) => ({
			name: "",
			date: "",
			year: "",
			notes: "",
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

		handleAdd({
			name: formData.name,
			date: formData.date,
			notes: formData.notes || undefined,
		});

		router.push("/");
	};

	return {
		formData,
		setFormData,
		errors,
		setErrors,
		refs,
		handleSubmit,
	};
};
