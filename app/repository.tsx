import { RepositorioLink, RepositorioLinkProps } from "@/components/RepositorioLink";
import { usePagination } from "@/hooks/usePagination";
import { Text, View } from "react-native";


// TODO: change this to the actual url of the api;
const url = "http://192.168.1.178:42069/api/forum"

export default function Repository() {


    const {
        data, 
        loading, 
        page, 
        next, 
        setPage
    } = usePagination<RepositorioLinkProps>(url)
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {loading || !data ? (
        (
        <Text>
          keep loading
        </Text>)
        ) : (
        data.map((repoLinkProps, index) => (
            <RepositorioLink
                key={index}
                Nombre={repoLinkProps.Nombre}
                Descripcion={repoLinkProps.Descripcion}
                PrincipalMotorPsicologico={repoLinkProps.PrincipalMotorPsicologico}
                SeñalesDeAlarma={repoLinkProps.SeñalesDeAlarma}
                AccionPreventiva={repoLinkProps.AccionPreventiva}
                EstaActivo={repoLinkProps.EstaActivo}
            />
        ))
      )}



    </View>
  );
}
