
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import Link from "next/link";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { CiFlag1, CiRuler } from "react-icons/ci";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import { LuShoppingBag } from "react-icons/lu";
import Image from "next/image";
import { PiShootingStarFill } from "react-icons/pi";
import { MdLibraryBooks, MdLocalShipping } from "react-icons/md";
import { Table, TableBody, TableCell, TableRow } from "../ui/table";
import { useEffect, useState, useMemo } from "react";
import clsx from "clsx";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { Heart } from "lucide-react";
import { Toggle } from "../ui/toggle";
import { Drawer, DrawerContent, DrawerTrigger } from "../ui/drawer";
import { api } from "@/utils/api";

const Detail = ({ product }: { product: any }) => {
    const Payment = ["affirm.svg", "after-pay.svg", "klarna.svg", "paypal.svg"]
    const [showMore, setShowMore] = useState(false);
    const [mount, setMount] = useState(1);
    const [selectedVariant, setSelectedVariant] = useState("");
    const [selectedColor, setSelectedColor] = useState("");
    const [selectedSize, setSelectedSize] = useState("");
    const [addingToCart, setAddingToCart] = useState(false);
    const [cartMessage, setCartMessage] = useState("");

    // tRPC mutations
    const createCartMutation = api.medusa.createCart.useMutation();
    const addLineItemMutation = api.medusa.addToCart.useMutation();
    useEffect(() => {
        if (product) {
            const defaultVariant = product.options?.[0]?.values?.[0]?.value || "";
            const defaultColor = product.options?.[1]?.values?.[0]?.value || "";
            setSelectedColor(defaultColor);
            setSelectedVariant(defaultVariant);
        }
    }, [product]);

    // Find the matching variant based on selected options
    const matchingVariant = useMemo(() => {
        if (!product?.variants) {
            return null;
        }

        // If no options selected, return first variant
        if (!selectedColor && !selectedVariant && !selectedSize) {
            return product.variants[0];
        }

        // Try to find exact match
        const exactMatch = product.variants.find((variant: any) => {
            const variantOptions = variant.options || [];

            // Check color match
            const colorMatch = selectedColor
                ? variantOptions.some((opt: any) =>
                    opt.value?.toLowerCase() === selectedColor.toLowerCase()
                )
                : true;

            // Check variant option match
            const variantMatch = selectedVariant
                ? variantOptions.some((opt: any) =>
                    opt.value?.toLowerCase() === selectedVariant.toLowerCase()
                )
                : true;

            // Check size match
            const sizeMatch = selectedSize
                ? variant.title?.toLowerCase().includes(selectedSize.toLowerCase())
                : true;

            return colorMatch && variantMatch && sizeMatch;
        });

        return exactMatch || product.variants[0];
    }, [product?.variants, selectedColor, selectedVariant, selectedSize]);
    // Handle add to cart
    const handleAddToCart = async () => {
        if (!matchingVariant?.id) {
            setCartMessage("Please select a variant");
            setTimeout(() => setCartMessage(""), 3000);
            return;
        }

        if (mount < 1) {
            setCartMessage("Quantity must be at least 1");
            setTimeout(() => setCartMessage(""), 3000);
            return;
        }

        setAddingToCart(true);
        setCartMessage("");

        try {
            // Get cart ID and region from localStorage
            let cartId = localStorage.getItem('cart_id');
            const regionId = localStorage.getItem('selected_region');
            console.log('Region ID:', regionId);
            // Create cart if not exists
            if (!cartId) {
                const data = await createCartMutation.mutateAsync({ id: regionId! });
                localStorage.setItem('cart_id', data.cart.id);
            }


            // Add item to cart via tRPC
            await addLineItemMutation.mutateAsync({
                cart_id: cartId!,
                variant_id: matchingVariant.id,
                quantity: mount,
            });

            setCartMessage(`Added ${mount} item(s) to cart successfully!`);
            setAddingToCart(false);
            setTimeout(() => setCartMessage(""), 3000);
        } catch (error: any) {
            console.error("Error adding to cart:", error);
            setCartMessage(error.message || "Failed to add item to cart");
            setAddingToCart(false);
            setTimeout(() => setCartMessage(""), 3000);
        }
    };

    return (
        <div className="w-full h-full px-2 min-h-[500px] md:min-h-[700px] lg:min-h-[900px] max-w-full relative">
            <h1 className="text-xl">{product?.title}</h1>
            <div className="flex flex-col gap-3">
                <div className="flex gap-4 items-center">
                    <span className="flex items-center flex-nowrap">4.8 <BsStarFill size={16} color="orange" /></span>
                    <span className="flex items-center flex-nowrap gap-1"><span>92</span> reviews</span>
                    <Toggle
                        aria-label="Toggle bookmark"
                        size="sm"
                        className="w-full data-[state=on]:bg-transparent data-[state=on]:[svg]:fill-blue-500 data-[state=on]:[svg]:stroke-blue-500 justify-end"
                    >
                        <Heart className='fill' />
                        Add to Wishlist
                    </Toggle>
                </div>
                <div className="bg-[#ff4e00] hidden md:flex rounded-lg">
                    <Image src={'/assets/early-bird.webp'} width={64} height={64} alt="Early Bird" className="bg-[#fd0] rounded-l-lg skew-x-12 relative -left-1.5" />
                    <div className="flex gap-4 items-center justify-center px-2 text-white text-xs">
                        <div className="flex gap-2 items-center">
                            <Image src={'/assets/verified_6764458.png'} width={20} height={20} alt="Fire Icon" />
                            <span>Fast delivery</span>
                        </div>
                        <div className="flex gap-2 items-center">
                            <Image src={'/assets/verified_6764458.png'} width={20} height={20} alt="Fire Icon" />
                            <span>$5.00 credit for late delivery</span>
                        </div>
                    </div>
                </div>
                <div className="relative p-2 sm:p-3 bg-[#F8F8F8] w-full">
                    <div className="flex gap-2 items-center ">
                        <span className="font-bold text-xl sm:text-2xl text-green-700">${product?.weight}</span>
                        <span className="font-ligth text-sm sm:text-md line-through">${product?.weight - 300}</span>
                        <span className='bg-orange-100 rounded-xl text-xs p-1'>{((product?.weight - 300) / product?.weight * 100).toFixed(0)}% OFF</span>
                    </div>
                    <span className="text-green-700 text-xs">Men's Health Awareness Day ends in</span>
                    <div className="hidden md:block">
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="ghost" className="absolute top-0 right-0 text-xs sm:text-sm">Open popover</Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-80 sm:w-96">
                                <p className="p-1 flex flex-col gap-2 text-xs sm:text-sm">
                                    <span className="font-bold">Return this item for free</span>
                                    Free returns are available for the shipping address you chose. You can return the item for any reason in new and unused condition: no return shipping charges.
                                </p>
                                <Link href='/' className="text-orange-500 p-1">Read the full returns policy</Link>
                            </PopoverContent>
                        </Popover>
                    </div>
                    <div className="md:hidden">
                        <Drawer>
                            <DrawerTrigger asChild>
                                <Button variant="ghost" className="absolute top-0 right-0 text-xs sm:text-sm">Open popover</Button>
                            </DrawerTrigger>
                            <DrawerContent>
                                <p className="p-1 flex flex-col gap-2 text-lg px-3 h-64">
                                    <span className="font-bold">Return this item for free</span>
                                    Free returns are available for the shipping address you chose. You can return the item for any reason in new and unused condition: no return shipping charges.
                                </p>
                            </DrawerContent>
                        </Drawer>
                    </div>
                </div>
                {product?.options.map((option: any, idx: number) => {
                    // Chọn state theo option
                    const isColor = option.title.toLowerCase() === "color";

                    const value = isColor ? selectedColor : selectedVariant;
                    const onChange = isColor ? setSelectedColor : setSelectedVariant;

                    return (
                        <div className="flex flex-col gap-2 sm:gap-3 items-start" key={idx}>
                            <h3 className="font-bold underline text-sm sm:text-base md:text-md">
                                {option.title}
                            </h3>

                            <ToggleGroup
                                type="single"
                                value={value}
                                onValueChange={onChange}
                                className="flex-wrap justify-start gap-1.5 sm:gap-2"
                            >
                                {option.values.map((item: any) => (
                                    <ToggleGroupItem
                                        key={item.id}
                                        value={item.value}
                                        className="
                            data-[state=on]:bg-black
                            data-[state=on]:text-white
                            text-xs sm:text-sm
                            px-2 sm:px-3
                            h-8 sm:h-9 md:h-10
                            rounded-md
                        "
                                    >
                                        {item.value}
                                    </ToggleGroupItem>
                                ))}
                            </ToggleGroup>
                        </div>
                    );
                })}


                <div className="flex flex-col gap-2 sm:gap-3 items-start">
                    <div className="flex justify-between w-full items-center">
                        <h3 className="font-bold underline text-sm sm:text-base md:text-md">Size</h3>
                        <Dialog>
                            <DialogTrigger>
                                <span className="text-[10px] sm:text-xs text-gray-500 flex gap-1 items-center"> <CiRuler size={14} className="sm:w-4 sm:h-4" /> View Size Guide</span>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                                    <DialogDescription>
                                        This action cannot be undone. This will permanently delete your account
                                        and remove your data from our servers.
                                    </DialogDescription>
                                </DialogHeader>
                            </DialogContent>
                        </Dialog>
                    </div>
                    <Select onValueChange={setSelectedSize}>
                        <SelectTrigger className="w-full text-xs sm:text-sm h-9 sm:h-10">
                            <SelectValue placeholder="Choose a size" />
                        </SelectTrigger>
                        <SelectContent>
                            {product?.variants?.map((item: any) =>
                                <SelectItem value={item.title}
                                    key={item.id} className="text-xs sm:text-sm">{item.title}</SelectItem>
                            )}
                        </SelectContent>
                    </Select>
                </div>
                <div className="grid grid-cols-7 gap-1.5 sm:gap-2 items-center text-xs sm:text-sm">
                    <span className="font-bold underline text-xs sm:text-sm md:text-base col-span-2 md:col-span-1">Qty</span>
                    <Link href={'/'} className="text-gray-700 text-[10px] sm:text-xs md:text-sm col-span-3 md:col-span-2">Buying In Bulk</Link>
                    <div className="col-span-2 md:col-span-4 text-end flex gap-1.5 sm:gap-2 md:gap-3 justify-end">
                        <Button className="bg-[#F8F8F8] text-black-900 h-7 w-7 sm:h-9 sm:w-9 md:h-10 md:w-10 p-0 text-base sm:text-lg" variant="outline" onClick={() => setMount(mount + 1)}>+</Button>
                        <Input type="text" value={mount} className="w-[35px] sm:w-[45px] md:w-[50px] h-7 sm:h-9 md:h-10 text-center text-xs sm:text-sm" />
                        <Button className="bg-[#F8F8F8] text-black-900 h-7 w-7 sm:h-9 sm:w-9 md:h-10 md:w-10 p-0 text-base sm:text-lg" variant="outline" onClick={() => mount > 1 && setMount(mount - 1)}>-</Button>
                    </div>
                </div>
                {cartMessage && (
                    <div className={`p-3 rounded-lg text-sm font-medium ${cartMessage.includes('success') || cartMessage.includes('Added')
                        ? 'bg-green-50 text-green-700 border border-green-200'
                        : 'bg-red-50 text-red-700 border border-red-200'
                        }`}>
                        {cartMessage}
                    </div>
                )}
                <Button
                    className="flex flex-col items-center h-[45px] sm:h-[55px] md:h-[60px] justify-center gap-0 bg-[#C72C37] hover:bg-gray-700 sticky md:static top-0 z-50 p-0 w-full text-white rounded-lg"
                    onClick={handleAddToCart}
                    disabled={addingToCart || !matchingVariant}
                >
                    <span className="flex gap-1.5 sm:gap-2 font-bold items-center text-xs sm:text-sm md:text-base lg:text-lg uppercase">
                        <LuShoppingBag />
                        {addingToCart ? "Adding..." : "Add to cart"}
                    </span>
                    <p className="text-[9px] sm:text-[10px] md:text-xs font-light">
                        {matchingVariant?.inventory_quantity
                            ? `Almost gone! Only ${matchingVariant.inventory_quantity} left - add now`
                            : "Check availability"
                        }
                    </p>
                </Button>
                <div className="flex flex-col gap-2 sm:gap-3 md:gap-5 lg:gap-7">
                    <h3 className="font-bold text-xs sm:text-sm md:text-base">Pay in 4 interest-free instalments of $6.99</h3>
                    <div className="flex gap-1.5 sm:gap-2 flex-wrap">
                        {Payment.map((item, idx) =>
                            <Image src={`/assets/payments/${item}`} width={50} height={80} alt="payment" key={idx} className="w-8 sm:w-10 md:w-12 h-auto" />
                        )}
                    </div>
                </div>
                <hr />
                <div className="bg-[#FEF1D3] p-2 sm:p-3 rounded-xl flex flex-col gap-2 sm:gap-3 md:gap-4">
                    <div className="flex gap-2 items-center">
                        <Image src={'/assets/guarantee.png'} width={50} height={50} alt="guarantee" className="w-8 sm:w-10 md:w-12 h-auto flex-shrink-0" />
                        <div className="flex flex-col text-[10px] sm:text-xs">
                            <span className="text-orange-500 font-medium">Kara Guarantee</span>
                            <span>Don't love it? We'll fix it. For free.</span>
                        </div>
                    </div>
                    <div className="flex gap-2 items-center">
                        <MdLocalShipping size={32} className="sm:w-10 sm:h-10 md:w-12 md:h-12 flex-shrink-0" />
                        <div className="flex flex-col text-[10px] sm:text-xs">
                            <span className="font-medium text-sm sm:text-base md:text-lg">Deliver to Viet Nam</span>
                            <span><b>Standard</b> - Order today to get by Dec.8 - Dec.22</span>
                            <span><b>Ready to ship in:</b> 1 business day</span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-2 sm:gap-3 md:gap-5">
                    <h3 className="flex gap-1 items-center text-xs sm:text-sm md:text-base flex-wrap">Designed by <Link href={'/'} className="font-bold hover:underline">Entreaty Livid</Link> <PiShootingStarFill color="blue" className="flex-shrink-0" /></h3>
                    <div className="flex gap-2 sm:gap-3 md:gap-4 my-1 sm:my-2 md:my-4">
                        <div className="bg-[#FEF1D3] rounded-full w-10 h-9 sm:w-14 sm:h-11 md:w-16 md:h-12 flex items-center justify-center flex-shrink-0">
                            <MdLibraryBooks size={20} className="sm:w-6 sm:h-6 md:w-7 md:h-7" />
                        </div>
                        <div className="text-[10px] sm:text-xs md:text-sm">
                            <span className="font-bold">Policies</span>
                            <p>Eligible for Refund or Return and Replacement within 30 days from the date of delivery</p>
                        </div>
                    </div>
                    <div className="flex gap-2 sm:gap-3 md:gap-4">
                        <div className="bg-[#FEF1D3] rounded-full w-10 h-9 sm:w-14 sm:h-11 md:w-16 md:h-12 flex items-center justify-center flex-shrink-0">
                            <CiFlag1 size={20} className="sm:w-6 sm:h-6 md:w-7 md:h-7" />
                        </div>
                        <div className="text-[10px] sm:text-xs md:text-sm">
                            <span className="font-bold">Need Support?</span>
                            <p>Eligible for Refund or Return and Replacement within 30 days from the date of delivery</p>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-bold underline mt-1.5 sm:mt-2 md:mt-3 lg:mt-4 text-xs sm:text-sm md:text-base">Features</h4>

                        <Table className="my-1.5 sm:my-2 text-[10px] sm:text-xs md:text-sm">
                            <TableBody>
                                <TableRow>
                                    <TableCell className="font-medium border w-20 sm:w-24 md:w-32 p-1 sm:p-1.5 md:p-2" align="center">Weight</TableCell>
                                    <TableCell colSpan={5} className="border p-1 sm:p-1.5 md:p-2" align="center">{product?.weight}</TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell className="font-medium border w-20 sm:w-24 md:w-32 p-1 sm:p-1.5 md:p-2" align="center">Description</TableCell>
                                    <TableCell colSpan={5} className="border p-1 sm:p-1.5 md:p-2" align="center">{product?.created_at}</TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell className="font-medium border w-20 sm:w-24 md:w-32 p-1 sm:p-1.5 md:p-2" align="center">{product?.handle}</TableCell>
                                    <TableCell colSpan={5} className="border p-1 sm:p-1.5 md:p-2" align="center">{product?.weight}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>

                        {/* --- DESCRIPTION COLLAPSE --- */}
                        <div className={`${showMore ? "" : "line-clamp-1"}`}>
                            <p className="text-[10px] sm:text-xs md:text-sm pe-1.5 sm:pe-2 md:pe-3">
                                You are contemplating one of the best-selling products Sleep Token Flowers Red Logo Hoodie Black Sleep Token Tour 2025 New Song Concert For Kids belong theme 3D Hoodies at Printerval
                            </p>

                            <ul className="list-disc p-2 sm:p-3 md:p-5 text-[10px] sm:text-xs md:text-sm">
                                <li>
                                    <b>Material:</b>
                                    <p className="text-gray-500 py-1.5 sm:py-2 md:py-4">
                                        Made from a high-quality blend of 95% polyester and 5% spandex,
                                        this fabric is durable, stretchy, and comfortable.
                                    </p>
                                </li>
                                <li>
                                    <b>Printing:</b>
                                    <p className="text-gray-500 py-1.5 sm:py-2 md:py-4">
                                        360-degree all-over print is created using advanced dye-sublimation technology, ensuring vibrant, long-lasting designs.
                                    </p>
                                </li>
                                <li>
                                    <b>Design:</b>
                                    <p className="text-gray-500 py-1.5 sm:py-2 md:py-4">
                                        The design will not fade, crack, flake, or peel, maintaining its quality over time.
                                    </p>
                                </li>
                            </ul>
                        </div>

                        {/* Button Show more */}
                        <Button
                            onClick={() => setShowMore(!showMore)}
                            className="my-1.5 sm:my-2 md:my-3 border-2 border-orange-500 bg-transperent flex text-orange-500 mx-auto hover:border-black hover:bg-transperent hover:text-black w-24 sm:w-28 md:w-32 text-[10px] sm:text-xs md:text-sm h-7 sm:h-8 md:h-9"
                        >
                            {showMore ? "Show Less" : "Show More"}
                        </Button>
                    </div>
                </div>
            </div>
            <div className="hidden md:flex bg-[#F3F3F5] items-center gap-1.5 sm:gap-2 h-28 sm:h-32 md:h-36 lg:h-40 rounded-xl sticky top-10 my-2 sm:my-3 md:my-4">
                <Image src={product?.thumbnail} alt={product?.title} width={200} height={100} className="h-full w-20 sm:w-24 md:w-32 lg:w-40 object-cover overflow-hidden rounded-l-xl" />
                <div className="flex flex-col gap-1 sm:gap-1.5 md:gap-2 w-full px-1.5 sm:px-2 md:px-3">
                    <h3 className="font-medium text-xs sm:text-sm md:text-base lg:text-lg line-clamp-2">{product?.title}</h3>
                    <div className="flex gap-0.5 sm:gap-1 items-center">
                        <span className='underline text-[10px] sm:text-xs md:text-sm font-bold'>4.6</span>
                        {[...Array(5)].map((_, i) => {
                            const index = i + 1;

                            return (
                                <button
                                    type="button"
                                    key={index}
                                    className={clsx('text-yellow-400 text-sm sm:text-base md:text-lg lg:text-2xl', {
                                    })}
                                >
                                    {4.5 >= index ? (
                                        <BsStarFill />
                                    ) : 4.5 >= index - 0.5 ? (
                                        <BsStarHalf />
                                    ) : (
                                        <BsStar />
                                    )}
                                </button>
                            );
                        })}
                    </div>
                    <div className="flex gap-1 sm:gap-2 text-[10px] sm:text-xs md:text-sm">
                        <span className="font-bold text-green-700">
                            ${matchingVariant?.calculated_price?.calculated_amount
                                ? (matchingVariant.calculated_price.calculated_amount / 100).toFixed(2)
                                : product?.weight
                            }
                        </span>
                        {matchingVariant?.calculated_price?.original_amount &&
                            matchingVariant.calculated_price.original_amount > matchingVariant.calculated_price.calculated_amount && (
                                <span className="line-through text-gray-500">
                                    ${(matchingVariant.calculated_price.original_amount / 100).toFixed(2)}
                                </span>
                            )}
                    </div>
                    <Button
                        className="w-full uppercase text-[10px] sm:text-xs md:text-sm h-6 sm:h-7 md:h-8 lg:h-10"
                        onClick={handleAddToCart}
                        disabled={addingToCart || !matchingVariant}
                    >
                        {addingToCart ? "Adding..." : "Add to cart"}
                    </Button>
                </div>
            </div>
        </div>
    )
}
export default Detail