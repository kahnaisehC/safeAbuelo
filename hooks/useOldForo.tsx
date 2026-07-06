import { ForoLinkProps } from "@/components/_OldForoLink";
import { useEffect, useState } from "react";


const pageSize = 10 
function getPlaceHolderPosts (page: number): ForoLinkProps[] {
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return placeHolderPosts.slice(startIndex, endIndex);
}

let placeHolderPosts: ForoLinkProps[]= []

for(let i = 0; i < 35; i++){
    let m: ForoLinkProps= {
        id: i,
        date: new Date(),
        title: `Me robaron ${i}0000 de mercado pago`,
        author: "Felipe Rodriguez",
        photo: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.istockphoto.com%2Fid%2F1390022045%2Fphoto%2Fsenior-caucasian-man-happy-selfie.jpg%3Fs%3D612x612%26w%3D0%26k%3D20%26c%3Dy0lEGtcZOWyC8BkdYaASL-ANvdcnm2KW_N7ShSfXtQE%3D&f=1&nofb=1&ipt=74ba7df7bea55ec8f49f60017c4b211eed96f93bab2e204483d15fe3e7aa2acf",
        replies: [],
    }
    placeHolderPosts.push(m)
}

export function useOldForoLinks() {
  const [oldForoLinks, setOldForoLinks] = useState<ForoLinkProps[]>([]);
  const [page, setPage] = useState(1);
  const [hasMoreData, setHasMoreData] = useState(true)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchOldForo = async () => {
      try {
        setLoading(true);

        /*
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        const data: Metodologia[] = await response.json();

          */


        if((page-1)*pageSize >= placeHolderPosts.length){
            setHasMoreData(false)
            return
        }
        const data = getPlaceHolderPosts(page);
        setOldForoLinks((metodologias) => {
            for(let i = 0; i < data.length; i++){
                metodologias.push(data[i])
            }
            return metodologias
        });
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchOldForo();
  }, [page]);

  return { oldForoLinks, page, setPage, hasMoreData, loading, error };
}