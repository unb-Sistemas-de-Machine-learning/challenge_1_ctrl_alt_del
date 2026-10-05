import { Source_Serif_4 } from 'next/font/google'

const serif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["600", "700"],
})

export default function Header() {

  return (
    <header className="violet-border flex h-15 shrink-0 items-center px-6 w-full min-w-150">
      <h1
        className={`${serif.className} select-none text-3xl text-zinc-100 transition-opacity`}
      >
        Tá Certo, Brasil?
      </h1>
    </header>
  )
}
