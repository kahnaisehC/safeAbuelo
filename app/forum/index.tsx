import { fetchReportes, Reporte } from "@/api/getReportes";
import BackHeader from "@/components/BackHeader";
import { ForoLink } from "@/components/ForoLink";
import { useEffect, useState } from "react";
import { FlatList, ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";



export default function Forum() {

    const [foroLinks, setForoLinks] = useState<Reporte[]>([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)

    useEffect(()=>{
      setLoading(true)
      fetchReportes(page)
      .then(newReportes => {
        setForoLinks(foroLinks => {
          foroLinks.push(...newReportes)
          return foroLinks
        })
      })
      .catch(console.error)
      .finally(() => setLoading(false))

    }, [page])



  return (

    <SafeAreaView
    style={{ flex: 1 }}
    >
      <BackHeader
      name="Foro"
      ></BackHeader>
    <ScrollView
      style={{
        flex: 1,
      }}
    >
      {loading && !foroLinks ? (
        (
        <Text>
          keep loading
        </Text>)
        ) : (
          <FlatList
            data={foroLinks}
            keyExtractor={ item => item.id.toString()}
            renderItem={
            ({item:repoLinkProps}) => (
            <ForoLink
            {...repoLinkProps}
            />)}
            onEndReached={() => {
              if (!loading){
                setPage(page => page+1)
              }
            }}
            onEndReachedThreshold={0.5}
            />)}

   </ScrollView> 
   </SafeAreaView>
  );
}
