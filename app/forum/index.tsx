import { ForoLink } from "@/components/ForoLink";
import { useForumPosts } from "@/hooks/useForumPosts";
import { FlatList, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


// TODO: change this to the actual url of the api;
const url = "http://192.168.1.178:42069/api/forum"

export default function Forum() {


    const {
  oldForoLinks, page, setPage, hasMoreData, loading, error
    } = useForumPosts()
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {loading && !oldForoLinks? (
        (
        <Text>
          keep loading
        </Text>)
        ) : (
          <FlatList
            data={oldForoLinks}
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

    </SafeAreaView>
  );
}
