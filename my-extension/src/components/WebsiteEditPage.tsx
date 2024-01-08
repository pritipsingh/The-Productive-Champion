import { useCustomWebsitesToBlock } from '../zustand/state';

export default function WebsiteEditPage() {
    const { addWebsitesToBlock, websitesToBlock } = useCustomWebsitesToBlock((state: any) => state)
    return (
        <section className="h-[100vh] relative mx-auto px-auto mt-4 flex flex-col items-center">
            <div className='overflow-y-auto max-h-3/4'>
                {websitesToBlock.map((website: string) => (
                    <p>{website}</p>
                ))}
            </div>
            <div className='flex flex-row gap-3 items-center justify-center'>
                <input className='py-2 px-2 rounded-md' type="text" placeholder='Enter website name' />
                <button className='text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-xs px-5 py-2.5 text-center'>Add website name</button>
            </div>
        </section>
    )
}

export { }