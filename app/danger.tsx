import * as DocumentPicker from "expo-document-picker";
import { SafeAreaView } from "react-native-safe-area-context";

import { router } from "expo-router";
import React, { useState } from "react";
import { Alert } from "react-native";

import BackHeader from "@/components/BackHeader";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";

type Option = {
  id: string;
  label: string;
};

const infoOptions: Option[] = [
  { id: "bank", label: "Datos de tarjeta bancaria" },
  { id: "whatsapp", label: "Últimos 6 dígitos de WhatsApp" },
  { id: "password", label: "Hice click y puse una contraseña" },
];

const strangeBehaviorOptions: Option[] = [
  { id: "battery", label: "La batería se descarga mucho más rápido de lo normal" },
  { id: "heat", label: "El dispositivo se calienta sin motivo aparente" },
  { id: "slow", label: "Está mucho más lento que antes" },
  { id: "apps", label: "Aparecieron aplicaciones que no instalé" },
  { id: "popups", label: "Aparecen ventanas o anuncios inesperados" },
  { id: "calls", label: "Se realizan llamadas o mensajes que no hice" },
  { id: "camera", label: "La cámara o el micrófono se activan solos" },
  { id: "other", label: "Otro comportamiento extraño" },
];

function Checkbox({
  label,
  checked,
  onPress,
}: {
  label: string;
  checked: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable style={styles.checkboxRow} onPress={onPress}>
      <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
        {checked && <Text style={styles.checkmark}>✓</Text>}
      </View>
      <Text style={styles.checkboxLabel}>{label}</Text>
    </Pressable>
  );
}

export default function IncidentFormScreen() {
  const [sharedInfo, setSharedInfo] = useState<string[]>([]);
  const [deviceIssues, setDeviceIssues] = useState<string[]>([]);
  const [screenshots, setScreenshots] = useState<any>(null);

  const toggleSelection = (
    value: string,
    selected: string[],
    setSelected: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    if (selected.includes(value)) {
      setSelected(selected.filter((item) => item !== value));
    } else {
      setSelected([...selected, value]);
    }
  };



  const handlePickFile = async () => {
  const result = await DocumentPicker.getDocumentAsync({
    type: "*/*",
  });

  if (!result.canceled) {
    setScreenshots(result.assets[0]);
  }
};



const handleSubmit = () => {
    console.log("submitted!")
  Alert.alert(
    "Recomendaciones",
    `Gracias por completar el formulario.

Como medida preventiva te recomendamos:

• Cambiar las contraseñas de las cuentas afectadas desde un dispositivo seguro.
• Activar la verificación en dos pasos cuando sea posible.
• Contactar a tu banco si compartiste información de tarjetas.
• Revisar los dispositivos por posibles aplicaciones o actividades sospechosas.
• Mantener el sistema operativo y las aplicaciones actualizadas.

Si detectás movimientos no autorizados o necesitás ayuda, comunicate con las entidades correspondientes lo antes posible.`,
    [
      {
        text: "Volver al inicio",
        onPress: () => router.replace("/"),
      },
    ]
  );
};


  return (
    <SafeAreaView>
      <BackHeader
      name="Estoy en PELIGRO"
      ></BackHeader>
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Información del incidente</Text>

      <Text style={styles.sectionTitle}>
        ¿Qué información llegaste a dar?
      </Text>

      {infoOptions.map((option) => (
        <Checkbox
          key={option.id}
          label={option.label}
          checked={sharedInfo.includes(option.id)}
          onPress={() =>
            toggleSelection(option.id, sharedInfo, setSharedInfo)
          }
        />
      ))}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          ¿Tenés capturas de pantalla?
        </Text>

        <Pressable style={styles.fileButton} onPress={handlePickFile}>
          <Text style={styles.fileButtonText}>
            {screenshots ? "Cambiar archivo" : "Seleccionar archivo"}
          </Text>
        </Pressable>

        {screenshots && (
          <Text style={styles.fileName}>
            {screenshots.name}
          </Text>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          ¿Notaste que tu celular/computadora actúa de forma extraña?
        </Text>

        <Text style={styles.helperText}>
          Seleccioná todos los comportamientos que hayas observado.
        </Text>

        {strangeBehaviorOptions.map((option) => (
          <Checkbox
            key={option.id}
            label={option.label}
            checked={deviceIssues.includes(option.id)}
            onPress={() =>
              toggleSelection(option.id, deviceIssues, setDeviceIssues)
            }
          />
        ))}
      </View>

      <Pressable style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Continuar</Text>
      </Pressable>
    </ScrollView>
</SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 24,
  },
  section: {
    marginTop: 28,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  },
  helperText: {
    color: "#666",
    marginBottom: 12,
    lineHeight: 20,
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 1.5,
    borderColor: "#555",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  checkboxChecked: {
    backgroundColor: "#2563EB",
    borderColor: "#2563EB",
  },
  checkmark: {
    color: "#fff",
    fontWeight: "bold",
  },
  checkboxLabel: {
    flex: 1,
    fontSize: 16,
    lineHeight: 22,
  },
  fileButton: {
    backgroundColor: "#2563EB",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  fileButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  fileName: {
    marginTop: 10,
    color: "#666",
  },
  submitButton: {
    marginTop: 36,
    backgroundColor: "#111827",
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});