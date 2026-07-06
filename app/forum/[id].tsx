import { Evidence, ForoLinkProps } from "@/components/ForoLink";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Text } from "react-native";

/*
export type ForoLinkProps ={
    Id: Number ,
    DateTime: Date,
    Localidad: string,
    PlataformaDeContacto: string,
    EjercePresionPsicologica: boolean,
    GeneraSentidoDeUrgencia: boolean,
    DescripcionDelEngaño: string,
    Estado: string,
}
*/


export default function forumPostPage(){
    const { id } = useLocalSearchParams();

    const [loading, setLoading] = useState(true)
    const [post, setPost] = useState<ForoLinkProps>()
    const [loadingEvidences, setLoadingEvidences] = useState(true)
    const [evidences, setEvidences] = useState<Evidence[]>([])




    useEffect(()=>{
    }, [])

    useEffect(()=>{
        if(!post)return
        
    }, [post])

    return <Text>
        Item id: {id}
    </Text>
}