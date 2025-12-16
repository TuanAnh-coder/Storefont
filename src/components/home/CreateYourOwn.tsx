import Link from "next/link"
import { Button } from "../ui/button"
import { MdOutlineFileUpload } from "react-icons/md";
const CreateYourOwn = () => {
    return (
        <div className='mx-auto w-full px-2 sm:px-4 md:px-6 lg:px-8 max-w-7xl py-4 sm:py-6 md:py-8'>
            <h1 className="text-lg px-8 xl:text-2xl font-bold text-center text-gray-700 mb-3 sm:mb-4">Customize products to reflect your unique taste</h1>
            <Link href={'/'} className="relative flex justify-center">
                <video src="/video/cyo-video.mp4" autoPlay loop muted className="w-full max-w-xl md:max-w-2xl lg:max-w-3xl h-auto rounded-xl"></video>
                <Button className="absolute bottom-2 sm:bottom-3 -translate-x-1/2 left-[50%] bg-orange-500 hover:bg-orange-600 transition-colors text-[10px] sm:text-xs md:text-sm px-3 sm:px-4 py-1.5 sm:py-2">
                    <MdOutlineFileUpload className="mr-1 sm:mr-2" />
                    Upload Image
                </Button>
            </Link>
        </div>
    )
}
export default CreateYourOwn