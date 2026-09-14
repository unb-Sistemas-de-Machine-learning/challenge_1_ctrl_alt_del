'use client'
import { useRouter } from 'next/navigation'
import "./Header.css"

export default function Header() {
    const router = useRouter()

    return (
        <div className="flex justify-between items-center violet-border h-8/100 min-h-20 p-2">
            <div 
                className="flex justify-between items-center cursor-pointer select-none"
                onClick={() => router.push('/home')}    
            >
            <img 
                src={'../../favicon.ico'}
                className="w-15 mr-3"
                ></img>
            <h1 className="text-4xl">Tá Certo Brasil?</h1>
            </div>
        </div>
    )
}