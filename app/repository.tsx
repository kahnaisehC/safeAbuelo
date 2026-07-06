import { RepositorioLink } from "@/components/RepositorioLink";
import { useMetodologias } from "@/hooks/useMetodologias";
import { FlatList, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


// TODO: change this to the actual url of the api;
const url = "http://192.168.1.178:42069/api/repository"

export default function Repository() {



    const {
      metodologias, 
      page, 
      setPage, 
      hasMoreData,
      loading, 
      error

    } = useMetodologias()

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {loading && !metodologias ? (
        (
        <Text>
          keep loading
        </Text>)
        ) : (
          <FlatList
            data={metodologias}
            keyExtractor={ item => item.nombre}
            renderItem={
            ({item:repoLinkProps}) => (
            <RepositorioLink
                {...repoLinkProps}
            />)}
            onEndReached={() => {
              if (!loading && hasMoreData){
                setPage(page + 1)
              }
            }}
            onEndReachedThreshold={0.5}
            />)}

    </SafeAreaView>
  );
}
