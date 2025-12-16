import { api } from "@/utils/api";
import { Card, CardContent } from "../ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel"
import Image from "next/image";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";

const carouselProductList = () => {
    const { data } = api.medusa.getProducts.useQuery();
    return (
        <div className="w-full px-2">
            <div className="flex flex-row justify-between items-center gap-3 sm:gap-0 mb-4 sm:mb-5 md:mb-6 lg:mb-8">
                <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold">
                    The design is also available on
                </h1>
                <Link href={'/'} className="flex gap-2 items-center hover:text-orange-500 transition-colors text-xs sm:text-sm md:text-base">See more <FaArrowRightLong className="w-3 h-3 sm:w-4 sm:h-4" /></Link>
            </div>
            <Carousel
                opts={{
                    align: "start",
                }}
                className="w-full"
            >
                <CarouselContent>
                    {data?.map((index: any) => (
                        <CarouselItem key={index.id} className="basis-1/2 md:basis-1/3 pl-4">
                            <div className="p-1">
                                <Card>
                                    <CardContent className="p-0">
                                        <Image src={index.thumbnail} alt={index.title} width={1000} height={500} className="w-full object-cover" />
                                        <div className="w-full p-2 grid grid-cols-4">
                                            <h3 className="text-sm whitespace-nowrap col-span-4">{index.title}</h3>
                                            <span className="font-bold">${index.price || '00'}</span>
                                            <span className="line-through">${index.price || '00'}</span>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>
    )
}
export default carouselProductList