'use client'
import Button from "@/app/components/Button/Button";
import { useRouter } from "next/navigation";

interface TermsCardProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TermsCard({ isOpen, onClose }: TermsCardProps) {
  const router = useRouter();

  // Retorna null se não estiver aberto
  if (!isOpen) return null;

  return (
    
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      
      <div className="flex flex-col w-150 max-h-[85vh] violet-border bg-zinc-950 p-6 space-y-4 shadow-2xl">
        
        <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
          <h1 className="font-bold text-3xl text-zinc-100">Termos de Uso</h1>
          <button 
            onClick={onClose} 
            className="text-zinc-400 hover:text-white font-bold text-xl px-2"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto rounded-lg border border-zinc-800 bg-zinc-900/50 p-4 text-sm text-zinc-300 space-y-3 pr-3 scrollbar-thin scrollbar-thumb-zinc-700">
          <h3>
            ipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsumipsum lorem ipsum
          </h3> 
        </div>

        <div className="pt-2 flex flex-row items-center justify-between"> 
          <label className="flex flex-row items-center gap-2 cursor-pointer text-zinc-200">
            <input type="checkbox" className="w-4 h-4 accent-violet-600" />
            <span>Eu aceito</span>
          </label>
          
          <div className="flex gap-2">
            <Button className="" text="Confirmar" 
              onClick={() => router.push('/input')} 
            />
          </div>
        </div>

      </div>
    </div>
  );
}