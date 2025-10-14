import { LoaderIcon } from 'lucide-react'

function Loader() {
  return (
    <div className='flex grow items-center justify-center'>
      <LoaderIcon className='animate-spin stroke-primary' />
    </div>
  )
}

export { Loader }
