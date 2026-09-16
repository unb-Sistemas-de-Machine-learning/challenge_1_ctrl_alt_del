'use client'

import Button from "@/app/components/Button/Button";
import TextInput from "@/app/components/TextInput/TextInput";
import { useRouter } from "next/navigation";

export default function Input() {
    const router = useRouter()

    return (
        <div className="flex flex-col h-full min-h-150 w-1/2 min-w-150 violet-border p-2 justify-around">
            <div className="flex h-26/30 w-full bg-zinc-900">
                <img aria-label="Imagem do post"></img>
                <p aria-label="Texto obtido da imagem do post"></p>
                <p aria-label="Caption do post"></p>
            </div>
            <div className="flex h-3/30 w-full justify-between">
                <TextInput placeholder="Insira o url da notícia" className="w-24/30 p-2 text-white violet-border"></TextInput>
                <Button text="Enviar" onClick={() => router.push('/resposta')} className=" w-5/30 p-2 rounded-sm bg-purple-700"></Button>
            </div>
        </div>
    );
}
