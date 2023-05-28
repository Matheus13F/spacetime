import Link from 'next/link'
import { ChevronLeftIcon } from '@heroicons/react/24/solid'
import { NewMemoryForm } from '@/components/NewMemoryForm'

export default function NewMemorie() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-16">
      <Link
        href="/"
        className="flex items-center gap-1 text-sm text-gray-200 hover:text-gray-100"
      >
        <ChevronLeftIcon className="h-4 w-4" />
        Voltar a timeline
      </Link>

      <NewMemoryForm />
    </div>
  )
}
