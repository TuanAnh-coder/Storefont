import Image from "next/image";
import Link from "next/link";

const CreateYourOwnBanner = () => {
    return (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center lg:sticky lg:top-10 max-w-xl mx-auto bg-[#f5f5f5]">
            {/* Colorful CREATE YOUR OWN Text */}
            <div className="mb-6">
                <Image
                    src="/assets/create-your-own.webp"
                    alt="Create Your Own"
                    width={300}
                    height={150}
                    className="mx-auto"
                />
            </div>

            {/* Description */}
            <p className="text-gray-600 font-medium mb-2">
                Got a design?
            </p>
            <p className="text-gray-500 text-sm mb-6">
                Upload it to see it on our products
            </p>

            {/* Button */}
            <Link
                href="/create"
                className="block w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transition-colors mb-6"
            >
                Browser your design
            </Link>

            {/* Features Icons */}
            <div className="grid grid-cols-4 gap-4 pt-6 border-t border-gray-200">
                <div className="flex flex-col items-center">
                    <div className="w-12 h-12 mb-2 flex items-center justify-center">
                        <Image
                            src="/assets/materials.svg"
                            alt="Sustainable"
                            width={40}
                            height={40}
                        />
                    </div>
                    <p className="text-xs font-medium text-gray-700">Sustainable</p>
                    <p className="text-xs text-gray-500">Materials</p>
                </div>

                <div className="flex flex-col items-center">
                    <div className="w-12 h-12 mb-2 flex items-center justify-center">
                        <Image
                            src="/assets/secure.svg"
                            alt="Secure"
                            width={40}
                            height={40}
                        />
                    </div>
                    <p className="text-xs font-medium text-gray-700">Secure</p>
                    <p className="text-xs text-gray-500">Payment</p>
                </div>

                <div className="flex flex-col items-center">
                    <div className="w-12 h-12 mb-2 flex items-center justify-center">
                        <Image
                            src="/assets/return.svg"
                            alt="30 Days Free"
                            width={40}
                            height={40}
                        />
                    </div>
                    <p className="text-xs font-medium text-gray-700">30 Days Free</p>
                    <p className="text-xs text-gray-500">Returns</p>
                </div>

                <div className="flex flex-col items-center">
                    <div className="w-12 h-12 mb-2 flex items-center justify-center">
                        <Image
                            src="/assets/worldwide.svg"
                            alt="Worldwide"
                            width={40}
                            height={40}
                        />
                    </div>
                    <p className="text-xs font-medium text-gray-700">Worldwide</p>
                    <p className="text-xs text-gray-500">Shipping</p>
                </div>
            </div>
        </div>
    );
};

export default CreateYourOwnBanner;
