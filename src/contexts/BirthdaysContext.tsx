import { storage } from "@/src/utils/storage"; // ajuste o caminho conforme seu projeto
import type React from "react";
import { createContext, useEffect, useState } from "react";

export type Birthday = {
	id: string;
	name: string;
	date: string; // formato: "YYYY-MM-DD"
	notes?: string;
	notify?: boolean; // para controle de notificações
};

type BirthdaysContextType = {
	birthdays: Birthday[];
	addBirthday: (birthday: Omit<Birthday, "id">) => void;
	removeBirthday: (id: string) => void;
	updateBirthday: (id: string, updated: Partial<Birthday>) => void;
	setBirthdays: React.Dispatch<React.SetStateAction<Birthday[]>>;
};

export const BirthdaysContext = createContext<
	BirthdaysContextType | undefined
>(undefined);

export const BirthdaysProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [birthdays, setBirthdays] = useState<Birthday[]>([]);
	const STORAGE_KEY = "user-birthdays";

	// 🔹 Carregar aniversários do AsyncStorage ao montar
	useEffect(() => {
		const loadBirthdays = async () => {
			const saved = await storage.get<Birthday[]>(STORAGE_KEY, []);
			setBirthdays(saved);
		};
		loadBirthdays();
	}, []);

	// 🔹 Salvar no AsyncStorage sempre que mudar
	useEffect(() => {
		storage.set(STORAGE_KEY, birthdays);
	}, [birthdays]);

	const addBirthday = (birthday: Omit<Birthday, "id">) => {
		if (!birthday.name || !birthday.date) return;
		const newBirthday: Birthday = {
			...birthday,
			id: Date.now().toString(),
		};
		setBirthdays((prev) => [newBirthday, ...prev]);
	};

	const removeBirthday = (id: string) => {
		setBirthdays((prev) => prev.filter((b) => b.id !== id));
	};

	const updateBirthday = (id: string, updated: Partial<Birthday>) => {
		setBirthdays((prev) =>
			prev.map((b) => (b.id === id ? { ...b, ...updated } : b)),
		);
	};

	return (
		<BirthdaysContext.Provider
			value={{
				birthdays,
				addBirthday,
				removeBirthday,
				updateBirthday,
				setBirthdays,
			}}
		>
			{children}
		</BirthdaysContext.Provider>
	);
};
