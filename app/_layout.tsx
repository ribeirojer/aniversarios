import { BirthdaysProvider } from "@/src/contexts/BirthdaysContext";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <BirthdaysProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </BirthdaysProvider>
  );
}
