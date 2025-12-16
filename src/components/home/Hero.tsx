import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { FaLongArrowAltRight } from "react-icons/fa";
import { LuEye } from "react-icons/lu";
import { api } from "@/utils/api";

export const Hero = () => {
  const { t } = useTranslation("home");
  
  const {data:user} = api.medusa.userDetail.useQuery({id:"me"});
  return (
    <div className="max-w-7xl mx-auto xl:px-8 py-2 sm:py-3 md:py-5">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-2">

        {/* Main Carousel - Takes 2/3 width on desktop */}
        <div className="xl:col-span-2">
          <Carousel className="w-full h-full">
            <CarouselContent>
              {[1, 2, 3].map((i) => (
                <CarouselItem key={i} className="pl-4">
                  <div className="relative w-full h-[190px] md:h-[380px] xl:rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                    <Image
                      src={`/assets/carousel-${i}.webp`}
                      fill
                      alt={`carousel ${i}`}
                      className="object-cover"
                      priority={i === 1}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2 sm:left-4 hidden md:flex" />
            <CarouselNext className="right-2 sm:right-4 hidden md:flex" />
          </Carousel>
        </div>

        {/* Promotion Card - Takes 1/3 width on desktop */}
        <Link href="/promotions" className="w-full px-2">
          <div className="shadow-md rounded-2xl overflow-hidden flex items-center justify-between gap-2 p-1 xl:p-0 xl:relative xl:h-full">
            <Image
              src="/assets/thanks.webp"
              width={150}
              height={150}
              alt="Special promotions"
              className="object-cover group-hover:scale-105 transition-transform duration-500 rounded-2xl w-20 h-20 xl:w-full xl:h-full"
            />
            <div className="w-full xl:absolute xl:bottom-0 xl:p-2 xl:bg-gradient-to-t xl:from-black/60 xl:to-transparent">
              <div className="flex items-center text-xs md:text-md gap-1 mb-1 bg-orange-100 text-orange-500 p-1 rounded-2xl max-w-sm md:text-center  xl:backdrop-blur-sm xl:rounded-2xl xl:bg-white/30 xl:mx-2 xl:text-yellow-400">
                <LuEye />
                <span>Thoughtfulll picks for everyone on your list</span>
              </div>
              <p className="font-medium text-sm lg:text-lg xl:text-white xl:px-2">Personalized presents that make memories</p>
            </div>
            <FaLongArrowAltRight size={28} className="opacity-60 xl:absolute xl:right-2 xl:bottom-6 xl:text-white"/>
          </div>
        </Link>

      </div>
    </div>
  );
};
