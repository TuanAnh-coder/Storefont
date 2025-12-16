import { api } from "@/utils/api";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../ui/breadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import Image from "next/image";
import { Button } from "../ui/button";

const HeroComponent = ({ product, categories }: {product: any, categories: any}) => {
    return (
        <div>
            <div className="bg-[#E5F0FA] flex flex-col items-center justify-around gap-2 py-3 lg:hidden">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Thanksgiving Day</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <h1 className="font-bold text-xl">Sale Up to 10%</h1>
                <p className="w-72 text-center text-sm">
                    Thanksgiving gifts and high-quality merch for family and friends!
                </p>
            </div>
            <div className="hidden lg:grid lg:grid-cols-2 w-full py-5">
                <div className="flex flex-col items-center justify-center gap-2 p-5">
                    <h1 className="font-bold text-2xl">Sale Up to 10%</h1>
                    <p className="w-96 text-center text-xl">
                        Thanksgiving gifts and high-quality merch for family and friends!
                    </p>
                    <Button className="mt-4 bg-black text-white hover:bg-gray-800">Customize Thanksgiving Gifts</Button>
                </div>
                <Image src={'/assets/thanksgiving-day-49f9cf01b226fe60d6e5d076abe92ad6.webp'} alt="Thanksgiving" width={500} height={500} className="object-cover mx-auto rounded-xl" />
            </div>
            <div>
                <h2 className="text-center lg:text-left mx-auto my-4 font-medium text-2xl px-2">
                    Best Items for Thanksgiving Day Shopping
                </h2>
                {categories?.length > 0 && (
                    <Tabs defaultValue={categories?.[0]?.name} className="w-full">
                        <TabsList className="bg-white">
                            {categories?.map((category: any) => (
                                <TabsTrigger
                                    key={category.id}
                                    value={category.name}
                                >
                                    {category.name}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                        {categories?.map((category: any) => (
                            <TabsContent
                                className="grid grid-cols-2 lg:grid-cols-4"
                                key={category.id}
                                value={category.name}
                            >
                                {product.filter((prod: any) => prod.categories?.some((cat: any) => cat.id === category.id)).map((prod: any) => (
                                    <div key={prod.id} className="col-span-1 p-2 lg:p-1">
                                        <Image
                                            src={prod.thumbnail || ''}
                                            alt={prod.title}
                                            width={350}
                                            height={350}
                                            className="object-cover"
                                        />
                                        <h5>{prod.title}</h5>
                                        <p className="font-semibold text-lg flex gap-1 items-center">${prod.variants?.[0]?.price || "40"}
                                            <span className="line-through text-sm text-gray-500">$30</span>
                                        </p>

                                    </div>
                                ))}
                            </TabsContent>
                        ))}
                    </Tabs>
                )}
            </div>
        </div>
    )
}
export default HeroComponent;   