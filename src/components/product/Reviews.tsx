import { clsx } from "clsx";
import { Pagination, Rating } from "../ui"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "../ui/Pagination"
import { useEffect, useState } from "react";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
    InputGroupText,
    InputGroupTextarea,
} from "@/components/ui/input-group"
import { GiPencilRuler } from "react-icons/gi";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { MdOutlineDriveFolderUpload } from "react-icons/md";
import Image from "next/image";
export const ReviewItem = ({ star, date }: { star: number, date: Date }) => {
    function formatDate(date: Date) {
        if (!date) {
            return ""
        }
        return date.toLocaleDateString("en-US", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        })
    }
    return (
        <div className="py-5 flex flex-col gap-3 border-dotted border-b-2">
            <div className="flex justify-between items-center">
                <div>
                    {[...Array(5)].map((_, i) => {
                        const index = i + 1;

                        return (
                            <button
                                type="button"
                                key={index}
                                className={clsx('text-yellow-400')}
                            >
                                {star >= index ? (
                                    <BsStarFill />
                                ) : star >= index - 0.5 ? (
                                    <BsStarHalf />
                                ) : (
                                    <BsStar />
                                )}
                            </button>
                        );
                    })}
                </div>
                <div className="flex gap-2 items-center text-xs text-gray-500">
                    <Avatar className="w-[20px] h-[20px]">
                        <AvatarImage
                            src="https://github.com/maxleiter.png"
                            alt="@maxleiter"
                        />
                        <AvatarFallback>LR</AvatarFallback>
                    </Avatar>
                    <small>|</small>
                    <span>{formatDate(date)}</span>
                </div>
            </div>
            <h2 className="font-bold text-md">Awesome design!</h2>
            <p className="text-sm">The print is sharp and bold, exactly like the pics. Delivery was quick. Totally happy with my purchase!</p>
        </div>
    )
}
const Reviews = ({ star, date }: { star?: number; date?: string } = {}) => {
    const [active, setActive] = useState(false)
    const [ratingValue, setRatingValue] = useState(5);
    const [hoverValue, setHoverValue] = useState(5);

    const onStarHover = (index: number) =>
        setHoverValue(index);
    const onStarLeave = () => setHoverValue(ratingValue);
    const onStarClick = (index: number) =>
        setRatingValue(index);

    return (
        <div className="w-full flex flex-col gap-2 sm:gap-3 px-2">
            <h3 className="font-bold text-lg sm:text-xl">Reviews</h3>
            <Tabs defaultValue="item" className="w-full">
                <TabsList className="w-full grid grid-cols-2 text-xs sm:text-sm">
                    <TabsTrigger value="item" className="text-xs sm:text-sm">Reviews for this item</TabsTrigger>
                    <TabsTrigger value="shop" className="text-xs sm:text-sm">Reviews for this shop</TabsTrigger>
                </TabsList>
                <TabsContent value="item">
                    <ReviewItem star={4.3} date={new Date("2025-01-12")} />
                    <ReviewItem star={4.6} date={new Date("2025-01-12")} />
                    <ReviewItem star={4.7} date={new Date("2025-01-12")} />
                    <ReviewItem star={2} date={new Date("2025-01-12")} />
                    <ReviewItem star={4.3} date={new Date("2025-01-12")} />
                </TabsContent>
                <TabsContent value="shop" className="flex flex-col items-center">
                    <Image src={'/assets/no-review.webp'} width={800} height={400} alt="Shop Reviews" className="w-48 h-48" />
                    <p className="text-center text-sm w-72">No reviews yet. Order this product and share your experience!</p>
                </TabsContent>
            </Tabs>
            <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0">
                <Button variant="outline" onClick={() => setActive(true)} className="w-full sm:w-64 bg-orange-50 boder-[#FF7300] text-sm sm:text-base lg:text-lg"> <GiPencilRuler /> Write your review</Button>
                <Pagination className="justify-center sm:justify-end">
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious href="#" />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">1</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext href="#" />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
            {active && (
                <div className="flex flex-col items-stretch px-2 sm:px-3 gap-2 sm:gap-3 py-3 sm:py-5 border rounded-md">
                    <h1 className="font-bold text-base sm:text-lg">Overall Rating</h1>
                    <div>
                        {[...Array(5)].map((_, i) => {
                            const index = i + 1;

                            return (
                                <button
                                    type="button"
                                    key={index}
                                    className={clsx('text-yellow-400 text-2xl', {
                                    })}
                                    onMouseEnter={() => onStarHover(index)}
                                    onMouseLeave={onStarLeave}
                                    onClick={() => onStarClick(index)}
                                >
                                    {Math.max(hoverValue, ratingValue) >= index ? (
                                        <BsStarFill />
                                    ) : ratingValue >= index - 0.5 ? (
                                        <BsStarHalf />
                                    ) : (
                                        <BsStar />
                                    )}
                                </button>
                            );
                        })}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5">
                        <div>
                            <Label htmlFor="name" className="text-base sm:text-xl">Your Name <span className="text-red-600 text-base sm:text-xl">*</span></Label>
                            <Input id="name" type="text" className="w-full border-2" placeholder="Enter Your Name" required />
                        </div>
                        <div>
                            <Label htmlFor="email" className="text-base sm:text-xl">Your Email <span className="text-red-600 text-base sm:text-xl">*</span></Label>
                            <Input id="email" type="email" className="w-full border-2" placeholder="Enter Your Email" required />
                        </div>
                    </div>
                    <div>
                        <Label htmlFor="title" className="text-base sm:text-xl">Title <span className="text-red-600 text-base sm:text-xl">*</span></Label>
                        <Input id="title" type="text" className="w-full border-2" placeholder="Enter Your Email" required />
                    </div>
                    <div>
                        <Label htmlFor="content" className="text-base sm:text-xl">Content <span className="text-red-600 text-base sm:text-xl">*</span></Label>
                        <Textarea id="content" placeholder="Your comment" className="w-full border-2"/>
                    </div>
                    <div className="relative w-24 sm:w-32 h-24 sm:h-32 border-2 boder-2 border-dashed cursor-pointer ">
                        <Input type="file" className="hidden" id="file"/>
                        <Label htmlFor="file" className="flex flex-col items-center cursor-pointer absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 text-nowrap text-xs sm:text-sm">
                            <MdOutlineDriveFolderUpload className="text-xl sm:text-2xl" />
                            Add Photo 
                        </Label>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
                        <Button>Submit</Button>
                        <Button>Cancel</Button>
                    </div>
                </div>

            )}
        </div>
    )
}
export default Reviews