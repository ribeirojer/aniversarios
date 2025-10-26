import { Upload } from "lucide-react-native"
import { Text, View } from "react-native"
import { Button } from "../ui/Button"

export default function ImportSection({ onImport }: { onImport: () => void }) {
  return (
    <View style={{ marginBottom: 24 }}>
      <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 8 }}>
        <Upload width={20} height={20} />  Importar dados
      </Text>
      <Text style={{ fontSize: 14, color: "#6c757d", marginBottom: 8 }}>
        Importe aniversários de um arquivo JSON exportado anteriormente
      </Text>
      <Button onPress={onImport} style={{ backgroundColor: "#e9ecef" }} icon={<Upload width={16} height={16} />} title="Importar JSON">
          
      </Button>
    </View>
  )
}
