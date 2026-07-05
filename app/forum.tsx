import { ForoLink, ForoLinkProps } from "@/components/ForoLink";
import { usePagination } from "@/hooks/usePagination";
import { FlatList, Text, View } from "react-native";


// TODO: change this to the actual url of the api;
const url = "http://192.168.1.178:42069/api/forum"

export default function Forum() {


    const {
        data, 
        loading, 
        page, 
        next, 
        setPage
    } = usePagination<ForoLinkProps>(url)
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {loading && !data ? (
        (
        <Text>
          keep loading
        </Text>)
        ) : (
          <FlatList
            data={data}
            keyExtractor={ item => item.Id.toString()}
            renderItem={
            ({item:repoLinkProps}) => (
            <ForoLink
            {...repoLinkProps}




              /*
	Localidad     string    `json:"Localidad"`
	Plataforma    string    `json:"PlataformaDeContacto"`
	EjercePresion bool      `json:"EjercePresionPsicologica"`
	Urgencia      bool      `json:"GeneraSentidoDeUrgencia"`
	Descripcion   string    `json:"DescripcionDelEngaño"`
	Estado        string    `json:"Estado"`
              DateTime={repoLinkProps.DateTime}
              Localidad={repoLinkProps.Localidad}
              PlataformaDeContacto={repoLinkProps.PlataformaDeContacto}
              Estado={repoLinkProps.Estado}
              DescripcionDelEngaño={repoLinkProps.DescripcionDelEngaño}


                Nombre={repoLinkProps.Nombre}
                Descripcion={repoLinkProps.Descripcion}
                PrincipalMotorPsicologico={repoLinkProps.PrincipalMotorPsicologico}
                SeñalesDeAlarma={repoLinkProps.SeñalesDeAlarma}
                AccionPreventiva={repoLinkProps.AccionPreventiva}
                EstaActivo={repoLinkProps.EstaActivo}


  */


            />)}
            onEndReached={() => {
              if (!loading){
                next()
              }
            }}
            onEndReachedThreshold={0.5}
            />)}

    </View>
  );
}
