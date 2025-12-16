import Image from "next/image"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel"
import { Card, CardContent } from "../ui/card"

const image = [
    '/assets/products/product-1.jpg', 
    '/assets/products/product-2.jpg', 
    '/assets/products/product-3.jpg', 
    '/assets/products/product-4.jpg',
    '/assets/products/product-5.jpg', 
    '/assets/products/product-6.jpg', 
    '/assets/products/product-7.jpg', 
    '/assets/products/product-8.jpg'
]

const AdsSpace = () => {
    // Chunk into groups of 6 for mobile (3x2) and 10 for desktop (5x2)
    // Since we need to handle both, we'll chunk by the larger number (10)
    // and let CSS grid handle the responsive layout
    const chunk = (arr: string[], size: number) => {
        const result = [];
        for (let i = 0; i < arr.length; i += size) {
            result.push(arr.slice(i, i + size));
        }
        return result;
    };

    // Create slides based on mobile view (6 items per slide for 3x2 grid)
    // On desktop it will show 10 items (5x2 grid)
    const mobileSlides = chunk(image, 6);
    const desktopSlides = chunk(image, 10);

    return (
        <>
            <div className="relative">
                <Image 
                    src={'/assets/pc-back-to-school.jpg'} 
                    alt='logo-ads' 
                    width={1500} 
                    height={800} 
                    className="w-full hidden xl:block object-cover" 
                />
                <div className="bg-[url('/assets/spice-up-your-life.webp')] h-[300px] md:h-[500px] relative xl:hidden bg-cover">
                    <Image 
                        src={'/assets/boy-back-to-school.webp'} 
                        alt='logo-ads' 
                        width={192} 
                        height={640} 
                        className="absolute bottom-0 left-0 lg:w-48" 
                    />
                </div>
                <div className="absolute top-[50%] left-[50%] -translate-x-1/3 -translate-y-1/4 py-8 xl:py-0 xl:translate-y-1 text-xs max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg px-2 sm:px-3">
                    <p className="leading-relaxed text-sm w-60 py-4 md:py-12 md:w-[500px] md:text-xl">
                        Printerval is an online marketplace where people connect to create,
                        sell, buy, and collect unique items. It fosters a community dedicated to supporting independent creators while offering buyers peace of mind.
                    </p>
                </div>
            </div>
            
            <div className='mx-auto w-full px-3 sm:px-4 md:px-6 lg:px-10 max-w-7xl py-4 sm:py-6 md:py-8 lg:py-10'>
                <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold flex gap-2 items-center mb-4 sm:mb-5 md:mb-6 lg:mb-8">
                    #Printerval Fandom
                </h1>
                
                {/* Mobile/Tablet Carousel (3x2 grid - 6 items per slide) */}
                <Carousel className="xl:hidden">
                    <CarouselContent>
                        {mobileSlides.map((group, i) => (
                            <CarouselItem key={i} className="basis-full">
                                <div className="grid grid-cols-3 grid-rows-2 gap-4 pl-4">
                                    {group.map((img, idx) => (
                                        <img 
                                            key={idx} 
                                            src={img} 
                                            alt={`Product ${idx + 1}`}
                                            className="w-full h-[200px] aspect-square rounded-lg object-cover" 
                                        />
                                    ))}
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>

                {/* Desktop Carousel (5x2 grid - 10 items per slide) */}
                <Carousel className="hidden xl:block">
                    <CarouselContent>
                        {desktopSlides.map((group, i) => (
                            <CarouselItem key={i} className="basis-full">
                                <div className="grid grid-cols-5 grid-rows-2 gap-4">
                                    {group.map((img, idx) => (
                                        <img 
                                            key={idx} 
                                            src={img} 
                                            alt={`Product ${idx + 1}`}
                                            className="w-full h-[200px] aspect-square rounded-lg object-cover" 
                                        />
                                    ))}
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>
        </>
    )
}

export { AdsSpace }