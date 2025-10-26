import { Bell, Cake, Upload } from "lucide-react-native"
import { useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import { saveBirthdays } from "../lib/birthdays"
import { Button } from "./ui/Button"

interface OnboardingProps {
  onComplete: () => void
}

export function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(0)

  const handleNotificationPermission = async () => {
    if ("Notification" in window) {
      const permission = await Notification.requestPermission()
      if (permission === "granted") {
        localStorage.setItem("notifications_enabled", "true")
      }
    }
    setStep(2)
  }

  const handleImport = () => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = ".json"
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (!file) return

      const reader = new FileReader()
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target?.result as string)
          if (Array.isArray(data)) {
            saveBirthdays(data)
            alert(`${data.length} aniversários importados com sucesso!`)
            handleComplete()
          } else {
            alert("Formato de arquivo inválido")
          }
        } catch (error) {
          alert("Erro ao importar arquivo")
        }
      }
      reader.readAsText(file)
    }
    input.click()
  }

  const handleComplete = () => {
    localStorage.setItem("onboarding_completed", "true")
    onComplete()
  }

  const steps = [
    {
      icon: Cake,
      title: "Bem-vindo ao Aniversários",
      description: "Nunca mais esqueça uma data especial. Organize todos os aniversários em um só lugar.",
      action: (
        <Button onPress={() => setStep(1)} title="Começar">
        </Button>
      ),
    },
    {
      icon: Bell,
      title: "Ative as notificações",
      description:
        "Receba lembretes automáticos sobre aniversários próximos. Você pode configurar quando quer ser notificado.",
      action: (
        <div className="space-y-3 w-full">
          <Button onPress={handleNotificationPermission} title="Ativar notificações">
            
          </Button>
          <Button onPress={() => setStep(2)} title="Pular por enquanto">
          </Button>
        </div>
      ),
    },
    {
      icon: Upload,
      title: "Importar dados",
      description: "Já tem uma lista de aniversários? Importe um arquivo JSON para começar rapidamente.",
      action: (
        <div className="space-y-3 w-full">
          <Button onPress={handleImport} icon={<Upload className="w-5 h-5 mr-2" />} title="Importar arquivo">
          </Button>
          <Button onPress={handleComplete} icon={<Upload className="w-5 h-5 mr-2" />} title="Começar do zero">
          </Button>
        </div>
      ),
    },
  ]

  const currentStep = steps[step]
  const Icon = currentStep.icon

  return (
    <View style={styles.overlay}>
      <View style={styles.card}>
        <View style={styles.iconContainer}>
          <Icon style={styles.icon} />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.title}>{currentStep.title}</Text>
          <Text style={styles.description}>{currentStep.description}</Text>
        </View>

        <View style={styles.actionContainer}>{currentStep.action}</View>

        <View style={styles.indicatorContainer}>
          {steps.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                index === step ? styles.activeIndicator : styles.inactiveIndicator,
              ]}
            />
          ))}
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 24,
    width: "100%",
    maxWidth: 400,
    alignItems: "center",
  },
  iconContainer: {
    backgroundColor: "#f0f0f0",
    borderRadius: 50,
    padding: 16,
    marginBottom: 16,
  },
  icon: {
    width: 32,
    height: 32,
    color: "#333",
  },
  textContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  actionContainer: {
    width: "100%",
    marginBottom: 16,
  },
  indicatorContainer: {
    flexDirection: "row",
    gap: 8,
  },
  indicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  activeIndicator: {
    backgroundColor: "#333",
  },
  inactiveIndicator: {
    backgroundColor: "#ccc",
  },
})  