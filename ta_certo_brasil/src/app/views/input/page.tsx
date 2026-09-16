'use client'

import Button from "@/app/components/Button/Button";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Input() {
    const router = useRouter()
    const [urlInput, setUrlInput] = useState("");
    const [respostaIA, setRespostaIA] = useState({});

    function enviarLinkPost(): void {
        console.log(urlInput)
        //chamar backend
        setUrlInput('textoNovo')
    }

    return (
        <div className="flex flex-col h-full min-h-150 w-full min-w-150 violet-border p-2 justify-around">
            <div className="flex h-26/30 w-full bg-zinc-900">
                <img aria-label="Imagem do post"></img>
                <p aria-label="Texto obtido da imagem do post"></p>
                <p aria-label="Caption do post"></p>
            </div>
            <div className="flex h-3/30 w-full justify-between">
                <input placeholder="Insira o url da notícia" value={urlInput} className="w-24/30 p-2 text-white violet-border" onChange={e => setUrlInput(e.target.value)}></input>
                <Button text="Enviar" onClick={() => enviarLinkPost()} className=" w-5/30 p-2 rounded-sm bg-purple-700"></Button>
            </div>
        </div>
    );
}
