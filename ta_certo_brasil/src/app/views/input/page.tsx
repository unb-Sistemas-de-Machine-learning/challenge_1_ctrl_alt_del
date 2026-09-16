'use client'

import Button from "@/app/components/Button/Button";
import TextInput from "@/app/components/TextInput/TextInput";
import { useRouter } from "next/navigation";

export default function Input() {
    const router = useRouter()

    return (
        <div className="flex mt-2 p-2 violet-border h-full min-h-150">
            <div></div>
            <div>
                <TextInput placeholder="Insira o url da notícia" className="w-80 h-10 text-white violet-border"></TextInput>
                <Button text="Enviar" onClick={() => router.push('/resposta')} className="w-40 h-10 ml-2 p-2 rounded-sm bg-purple-700"></Button>
            </div>
        </div>
    );
}
