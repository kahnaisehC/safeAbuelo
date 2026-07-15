import { Evidencia } from "@/api/getReporteUser";
import { createReporte } from "@/api/postReporte";
import BackHeader from "@/components/BackHeader";
import { useAuth } from "@/context/AuthContext";
import { Picker } from "@react-native-picker/picker";
import { Redirect } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Button,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const PROVINCIAS = ["Chaco", "Corrientes"] as const;

const LOCALIDADES = ["Resistencia", "Corrientes"] as const;

const PLATAFORMAS = [
  "WhatsApp",
  "Facebook",
  "Instagram",
  "Llamada Telefonica",
  "SMS",
  "Correo Electronico",
  "Otro",
] as const;

const TIPOS_EVIDENCIA = [
  "CapturaPantalla",
  "ComprobanteBancario",
  "EnlaceWeb",
  "Texto",
] as const;

export default function ReporteForm() {
  const { user, token, isAuthenticated } = useAuth();




  const [provincia, setProvincia] = useState("");
  const [localidad, setLocalidad] = useState("");
  const [plataformaDeContacto, setPlataformaDeContacto] = useState("");
  const [plataformaOtra, setPlataformaOtra] = useState("");
  const [descripcionDelEngaño, setDescripcionDelEngaño] = useState("");

  const [evidencias, setEvidencias] = useState<Evidencia[]>([
  ]);

  const handleEvidenceChange = (
    index: number,
    field: "tipo" | "valor" | "notas" | "linkEvidencia",
    value: string
  ) => {
    const updated = [...evidencias];
    updated[index][field] = value;
    setEvidencias(updated);
  };

  const addEvidence = () => {
    setEvidencias([
      ...evidencias,
      {
        id: -1,
        tipo: "",
        valor: "",
        notas: "",
        linkEvidencia: "",
      },
    ]);
  };

  const removeEvidence = (index: number) => {
    setEvidencias(evidencias.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!user) return;

    if (descripcionDelEngaño.length < 20) {
      Alert.alert(
        "Error",
        "La descripción debe tener al menos 20 caracteres."
      );
      return;
    }

    try {
        if(token === null){
            throw Error("invalid token")
        }


      await createReporte(
        {
          authorId: user.uid,
          provincia,
          localidad,
          plataformaDeContacto,
          plataformaOtra,
          descripcionDelEngaño,
          evidencias: evidencias.filter(item => item.tipo !== "")
        },
        token
      );

      Alert.alert("Éxito", "Reporte enviado correctamente.");

      setProvincia("");
      setLocalidad("");
      setPlataformaDeContacto("");
      setPlataformaOtra("");
      setDescripcionDelEngaño("");
      setEvidencias([]);
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "No se pudo enviar el reporte.");
    }
  };

  if(!isAuthenticated || token === null)return (
    <Redirect href={"/"}></Redirect>
  )


  return (
    <SafeAreaView>
      <BackHeader
      name="Añadir caso"
      ></BackHeader>
    <ScrollView
      contentContainerStyle={{
        padding: 20,
        gap: 16,
      }}
    >
      <Text>Provincia</Text>
      <Picker
        selectedValue={provincia}
        onValueChange={setProvincia}
      >
        <Picker.Item label="Seleccione una provincia" value="" />
        {PROVINCIAS.map((p) => (
          <Picker.Item key={p} label={p} value={p} />
        ))}
      </Picker>

      <Text>Localidad</Text>
      <Picker
        selectedValue={localidad}
        onValueChange={setLocalidad}
      >
        <Picker.Item label="Seleccione una localidad" value="" />
        {LOCALIDADES.map((l) => (
          <Picker.Item key={l} label={l} value={l} />
        ))}
      </Picker>

      <Text>Plataforma de contacto</Text>
      <Picker
        selectedValue={plataformaDeContacto}
        onValueChange={setPlataformaDeContacto}
      >
        <Picker.Item label="Seleccione una plataforma" value="" />
        {PLATAFORMAS.map((p) => (
          <Picker.Item key={p} label={p} value={p} />
        ))}
      </Picker>

      {plataformaDeContacto === "Otro" && (
        <TextInput
          placeholder="Especifique la plataforma"
          value={plataformaOtra}
          onChangeText={setPlataformaOtra}
          style={{
            borderWidth: 1,
            padding: 10,
            borderRadius: 8,
          }}
        />
      )}

      <Text>Descripción del engaño</Text>
      <TextInput
        value={descripcionDelEngaño}
        onChangeText={setDescripcionDelEngaño}
        multiline
        numberOfLines={5}
        style={{
          borderWidth: 1,
          padding: 10,
          borderRadius: 8,
          textAlignVertical: "top",
        }}
      />

      <Text
        style={{
          fontWeight: "bold",
          fontSize: 18,
        }}
      >
        Evidencias
      </Text>

      {evidencias.map((evidencia, index) => (
        <View
          key={index}
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 8,
            padding: 12,
            gap: 10,
          }}
        >
          <Text>Tipo</Text>

          <Picker
            selectedValue={evidencia.tipo}
            onValueChange={(value) =>
              handleEvidenceChange(index, "tipo", value)
            }
          >
            <Picker.Item label="Seleccione un tipo" value="" />
            {TIPOS_EVIDENCIA.map((t) => (
              <Picker.Item key={t} label={t} value={t} />
            ))}
          </Picker>

          <TextInput
            placeholder="Valor"
            value={evidencia.valor}
            onChangeText={(text) =>
              handleEvidenceChange(index, "valor", text)
            }
            style={{
              borderWidth: 1,
              padding: 10,
              borderRadius: 8,
            }}
          />

          <TextInput
            placeholder="Notas"
            value={evidencia.notas}
            onChangeText={(text) =>
              handleEvidenceChange(index, "notas", text)
            }
            style={{
              borderWidth: 1,
              padding: 10,
              borderRadius: 8,
            }}
          />

          <TextInput
            placeholder="Link (opcional)"
            value={evidencia.linkEvidencia}
            onChangeText={(text) =>
              handleEvidenceChange(index, "linkEvidencia", text)
            }
            style={{
              borderWidth: 1,
              padding: 10,
              borderRadius: 8,
            }}
          />

        <Button
            title="Eliminar evidencia"
            color="red"
            onPress={() => removeEvidence(index)}
        />
        </View>
      ))}

      <Button
        title="Agregar evidencia"
        onPress={addEvidence}
      />

      <Button
        title="Enviar reporte"
        onPress={handleSubmit}
      />
    </ScrollView>
</SafeAreaView>
  );
}