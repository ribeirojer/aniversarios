import { createMMKV } from 'react-native-mmkv';
    
const mmkv = createMMKV();

export const storage = {
	get<T>(key: string, defaultValue: T): T {
		try {
			const value = mmkv.getString(key);
			return value ? (JSON.parse(value) as T) : defaultValue;
		} catch (error) {
			console.error("Erro ao ler do MMKV:", error);
			return defaultValue;
		}
	},

	set<T>(key: string, value: T): void {
		try {
			mmkv.set(key, JSON.stringify(value));
		} catch (error) {
			console.error("Erro ao salvar no MMKV:", error);
		}
	},

	remove(key: string): void {
		try {
			mmkv.remove(key);
		} catch (error) {
			console.error("Erro ao remover do MMKV:", error);
		}
	},

	clear(): void {
		try {
			mmkv.clearAll();
		} catch (error) {
			console.error("Erro ao limpar o MMKV:", error);
		}
	},
};
