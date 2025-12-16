import { api } from "@/utils/api"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel"
import Image from "next/image"
import { useState, useEffect } from "react"
import type { CarouselApi } from "@/components/ui/carousel"

const Thumbnail = ({ product }: {product: any}) => {
    console.log(product)
    const [activeIndex, setActiveIndex] = useState(0)
    const [mainApi, setMainApi] = useState<CarouselApi>()
    const [thumbApi, setThumbApi] = useState<CarouselApi>()

    // Đồng bộ activeIndex khi carousel chính thay đổi
    useEffect(() => {
        if (!mainApi) return

        const onSelect = () => {
            const currentIndex = mainApi.selectedScrollSnap()
            setActiveIndex(currentIndex)
        }

        mainApi.on("select", onSelect)

        return () => {
            mainApi.off("select", onSelect)
        }
    }, [mainApi])

    // Scroll thumbnail carousel khi activeIndex thay đổi
    useEffect(() => {
        if (!thumbApi) return
        thumbApi.scrollTo(activeIndex)
    }, [activeIndex, thumbApi])

    const handleThumbnailClick = (idx: number) => {
        setActiveIndex(idx)
        mainApi?.scrollTo(idx)
    }

    return (
        <div className="flex gap-2 sm:gap-3 items-stretch flex-col lg:flex-row-reverse">
            {/* Carousel chính */}
            <Carousel 
                className="relative w-full h-full" 
                opts={{ loop: false }}
                setApi={setMainApi}
            >
                <CarouselContent>
                    {product?.images?.map((item: any, idx: number) => (
                        <CarouselItem key={idx} >
                            <Image
                                src={item.url}
                                width={400}
                                height={400}
                                alt={item.id}
                                className="rounded-lg w-full max-h-[300px] lg:max-h-[600px] object-cover"
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="absolute left-0 z-50 hidden xl:flex"/>
                <CarouselNext className="absolute right-0 z-50 hidden xl:flex" />
            </Carousel>
            <div className="flex bg-[#ff4e00] md:hidden">
                <Image src={'/assets/early-bird.webp'} width={64} height={64} alt="Early Bird" className="bg-[#fd0] skew-x-12 relative -left-1.5"/>
                <div className="flex gap-4 items-center justify-center px-2 text-white text-xs">
                    <div className="flex gap-2 items-center">
                        <Image src={'/assets/verified_6764458.png'} width={20} height={20} alt="Fire Icon"/>
                        <span>Fast delivery</span>
                    </div>
                    <div className="flex gap-2 items-center">
                        <Image src={'/assets/verified_6764458.png'} width={20} height={20} alt="Fire Icon"/>
                        <span>$5.00 credit for late delivery</span>
                    </div>
                </div>
            </div>
            {/* Thumbnail vertical */}
            <Carousel
                opts={{ align: "start", startIndex: activeIndex}}
                orientation="vertical"
                className="hidden xl:block w-16 xl:w-40 oveflow-hidden"
                setApi={setThumbApi}
            >
                <CarouselContent className="gap-2 h-[400px] sm:h-[500px] lg:h-[680px]">
                    {product?.images?.map((item: any, idx: number) => (
                        <CarouselItem
                            key={item.id}
                            className={`basis-1/4 cursor-pointer`}
                            onClick={() => handleThumbnailClick(idx)}
                        >
                            <Image
                                src={item.url}
                                width={400}
                                height={200}
                                alt={item.id}
                                className={`rounded-md object-cover w-full h-full ${activeIndex === idx ? 'border-2 border-black' : ''}`}
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>
    )
}

export default Thumbnail