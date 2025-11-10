export function cn(...inputs: string[]) {
	return inputs.join(" ");
}

export const parseLocalDate = (str: string) => {
	const [y, m, d] = str.split("-").map(Number);
	return new Date(y, m - 1, d);
  };

export function normalizeDateString(input: string) {
	const parts = input.split("-");
	if (parts.length === 3) {
	  const [y, m, d] = parts.map(Number);
	  return `${String(y).padStart(4, "0")}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
	}
	if (parts.length === 2) {
	  const [m, d] = parts.map(Number);
	  return `${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
	}
	return input;
  }