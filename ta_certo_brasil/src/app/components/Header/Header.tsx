'use client'

import Button from "../Button/Button"
import { useRouter } from 'next/navigation'
import "./Header.css"

export default function Header() {
    const router = useRouter()

    return (
        <div className="flex justify-between items-center violet-border h-20 p-2">
            <div className="flex justify-between items-center">
            <img 
                src={'../../favicon.ico'}
                className="w-15 mr-3"
                ></img>
            <h1 className="text-4xl">Tá Certo Brasil?</h1>
            </div>
            <Button
                onClick={() => router.push('/views/login')}
                text="Login"
                className="w-30 h-15 p-5 rounded-sm bg-purple-700"
            ></Button>
        </div>
    )
}