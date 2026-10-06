'use client'

import { useRouter } from 'next/navigation'
import { Source_Serif_4 } from 'next/font/google'

const serif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["600", "700"],
})

export default function Header() {
  const router = useRouter()

  return (
    <header className="violet-border flex h-20 shrink-0 items-center px-6">
      <h1
        onClick={() => router.push('/home')}
        className={`${serif.className} cursor-pointer select-none text-3xl text-zinc-100 transition-opacity hover:opacity-80`}
      >
        Tá Certo Brasil?
      </h1>
    </header>
  )
}
