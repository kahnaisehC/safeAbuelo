import { useForumPosts } from "./useForumPosts";

export function useForumPost(id: number){
    const {oldForoLinks, } = useForumPosts()
    return oldForoLinks[id]
}