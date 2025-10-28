import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Wrapper utilitário para AsyncStorage com conversão automática de JSON.
 */
export const storage = {
	/**
	 * Salva um valor no storage (objeto ou primitivo)
	 */
	async set<T>(key: string, value: T): Promise<void> {
		try {
			const jsonValue = JSON.stringify(value);
			await AsyncStorage.setItem(key, jsonValue);
		} catch (error) {
			console.error(`[storage.set] Erro ao salvar ${key}:`, error);
		}
	},

	/**
	 * Obtém um valor (objeto ou primitivo)
	 */
	async get<T>(key: string): Promise<T | null> {
		try {
			const jsonValue = await AsyncStorage.getItem(key);
			return jsonValue ? (JSON.parse(jsonValue) as T) : null;
		} catch (error) {
			console.error(`[storage.get] Erro ao ler ${key}:`, error);
			return null;
		}
	},

	/**
	 * Remove um item do storage
	 */
	async remove(key: string): Promise<void> {
		try {
			await AsyncStorage.removeItem(key);
		} catch (error) {
			console.error(`[storage.remove] Erro ao remover ${key}:`, error);
		}
	},

	/**
	 * Limpa todo o storage
	 */
	async clear(): Promise<void> {
		try {
			await AsyncStorage.clear();
		} catch (error) {
			console.error("[storage.clear] Erro ao limpar storage:", error);
		}
	},
};
