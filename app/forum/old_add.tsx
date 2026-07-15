import { Picker } from "@react-native-picker/picker";
import * as DocumentPicker from "expo-document-picker";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

enum TipoEvidencia {
  CapturaDePantalla,
  EnlaceMalicioso,
  NumeroDeTelefono,
  ComprobanteFinanciero,
  DocumentoFalso,
}

type Evidence = {
  id: number;
  tipo: TipoEvidencia;
  valor: string;
  notas: string;
  archivo?: DocumentPicker.DocumentPickerAsset;
  reporteIncidenteId: number;
};

const evidenceOptions = [
  { value: TipoEvidencia.CapturaDePantalla, label: "Captura de pantalla" },
  { value: TipoEvidencia.EnlaceMalicioso, label: "Enlace malicioso" },
  { value: TipoEvidencia.NumeroDeTelefono, label: "Número de teléfono" },
  { value: TipoEvidencia.ComprobanteFinanciero, label: "Comprobante financiero" },
  { value: TipoEvidencia.DocumentoFalso, label: "Documento falso" },
];

const TipoEvidenciaToString = (tipo: TipoEvidencia) => {
  switch (tipo) {
    case TipoEvidencia.CapturaDePantalla:
      return "Captura de pantalla";
    case TipoEvidencia.EnlaceMalicioso:
      return "Enlace malicioso";
    case TipoEvidencia.NumeroDeTelefono:
      return "Número de teléfono";
    case TipoEvidencia.ComprobanteFinanciero:
      return "Comprobante financiero";
    case TipoEvidencia.DocumentoFalso:
      return "Documento falso";
    default:
      return "";
  }
};

export default function AddCaseScreen() {
  const [localidad, setLocalidad] = useState("");
  const [plataforma, setPlataforma] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const [presion, setPresion] = useState(false);
  const [urgencia, setUrgencia] = useState(false);

  // Current evidence being edited
  const [currentTipo, setCurrentTipo] = useState(
    TipoEvidencia.CapturaDePantalla
  );
  const [currentValor, setCurrentValor] = useState("");
  const [currentNotas, setCurrentNotas] = useState("");
  const [currentArchivo, setCurrentArchivo] =
    useState<DocumentPicker.DocumentPickerAsset | null>(null);

  // List of evidences
  const [evidencias, setEvidencias] = useState<Evidence[]>([]);

  const pickFile = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      multiple: false,
    });

    if (!result.canceled) {
      setCurrentArchivo(result.assets[0]);
    }
  };

  const handleAddEvidence = () => {
    if (!currentValor.trim()) {
      Alert.alert(
        "Información incompleta",
        "Ingresá el valor de la evidencia."
      );
      return;
    }

    const newEvidence: Evidence = {
      id: Date.now(),
      tipo: currentTipo,
      valor: currentValor,
      notas: currentNotas,
      archivo: currentArchivo ?? undefined,
      reporteIncidenteId: 0,
    };

    setEvidencias((prev) => [...prev, newEvidence]);

    // Reset evidence form
    setCurrentTipo(TipoEvidencia.CapturaDePantalla);
    setCurrentValor("");
    setCurrentNotas("");
    setCurrentArchivo(null);
  };

  const handleSubmit = () => {
    const caseData = {
      id: 0,
      dateTime: new Date(),
      localidad,
      plataformaDeContacto: plataforma,
      ejercePresionPsicologica: presion,
      generaSentidoDeUrgencia: urgencia,
      descripcionDelEngaño: descripcion,
      evidencia: evidencias,
      estado: "Pendiente",
    };

    console.log(caseData);

    Alert.alert(
      "Caso enviado",
      "Tu caso fue cargado correctamente y se encuentra bajo revisión. Una vez validado, será publicado en la plataforma.",
      [
        {
          text: "Aceptar",
          onPress: () => router.replace("/"),
        },
      ]
    );
  };

  return (
    <SafeAreaView>
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Reportar un caso</Text>

      <Text style={styles.label}>Localidad</Text>
      <TextInput
        style={styles.input}
        value={localidad}
        onChangeText={setLocalidad}
      />

      <Text style={styles.label}>Plataforma de contacto</Text>
      <TextInput
        style={styles.input}
        value={plataforma}
        onChangeText={setPlataforma}
      />

      <Text style={styles.label}>Descripción del engaño</Text>
      <TextInput
        style={[styles.input, styles.multiline]}
        multiline
        value={descripcion}
        onChangeText={setDescripcion}
      />

      <View style={styles.switchRow}>
        <Text style={styles.switchLabel}>
          ¿Ejercía presión psicológica?
        </Text>
        <Switch value={presion} onValueChange={setPresion} />
      </View>

      <View style={styles.switchRow}>
        <Text style={styles.switchLabel}>
          ¿Generaba sentido de urgencia?
        </Text>
        <Switch value={urgencia} onValueChange={setUrgencia} />
      </View>

      {/* ------------------ Evidences ------------------ */}

      <Text style={styles.sectionTitle}>Evidencias</Text>

      <Text style={styles.label}>Tipo</Text>

      <Picker
        selectedValue={currentTipo}
        onValueChange={(value) => setCurrentTipo(value)}
      >
        {evidenceOptions.map((option) => (
          <Picker.Item
            key={option.value}
            label={option.label}
            value={option.value}
          />
        ))}
      </Picker>

      <Text style={styles.label}>Valor</Text>

      <TextInput
        style={styles.input}
        placeholder="URL, teléfono, descripción, etc."
        value={currentValor}
        onChangeText={setCurrentValor}
      />

      <Text style={styles.label}>Notas</Text>

      <TextInput
        style={[styles.input, styles.multilineSmall]}
        multiline
        value={currentNotas}
        onChangeText={setCurrentNotas}
      />

      <Pressable style={styles.uploadButton} onPress={pickFile}>
        <Text style={styles.uploadButtonText}>
          {currentArchivo
            ? currentArchivo.name
            : "Subir archivo (opcional)"}
        </Text>
      </Pressable>

      <Pressable
        style={styles.addEvidenceButton}
        onPress={handleAddEvidence}
      >
        <Text style={styles.buttonText}>Agregar evidencia</Text>
      </Pressable>

      {evidencias.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>Evidencias agregadas</Text>

          {evidencias.map((evidence) => (
            <View key={evidence.id} style={styles.evidenceCard}>
              <Text style={styles.evidenceTitle}>
                {TipoEvidenciaToString(evidence.tipo)}
              </Text>

              <Text>{evidence.valor}</Text>

              {evidence.notas ? (
                <Text style={styles.notes}>
                  {evidence.notas}
                </Text>
              ) : null}

              {evidence.archivo && (
                <Text style={styles.file}>
                  📎 {evidence.archivo.name}
                </Text>
              )}
            </View>
          ))}
        </>
      )}

      <Pressable style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Enviar caso</Text>
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
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 20,
  },
  label: {
    fontWeight: "600",
    marginTop: 14,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 8,
    padding: 12,
  },
  multiline: {
    minHeight: 120,
    textAlignVertical: "top",
  },
  multilineSmall: {
    minHeight: 80,
    textAlignVertical: "top",
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 18,
  },
  switchLabel: {
    flex: 1,
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginTop: 30,
    marginBottom: 10,
  },
  uploadButton: {
    backgroundColor: "#F3F4F6",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 12,
  },
  uploadButtonText: {
    fontWeight: "600",
  },
  addEvidenceButton: {
    backgroundColor: "#16A34A",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "700",
  },
  evidenceCard: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 8,
    padding: 12,
    marginTop: 12,
  },
  evidenceTitle: {
    fontWeight: "700",
    marginBottom: 4,
  },
  notes: {
    marginTop: 6,
    color: "#666",
    fontStyle: "italic",
  },
  file: {
    marginTop: 8,
    color: "#2563EB",
  },
  submitButton: {
    backgroundColor: "#2563EB",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 30,
  },
  submitButtonText: {
    color: "#FFF",
    fontWeight: "700",
    fontSize: 16,
  },
});