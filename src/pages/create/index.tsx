import { PrimaryLayout } from "@/layouts";
import { NextPageWithLayout } from "../_app"
import { ReactElement, useEffect, useState } from "react";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import CustomeProduct from "@/components/other-page/custome";
import { api } from "@/utils/api";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BottomNavigation } from "@/components";
import Recently from "@/components/other-page/recently";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FiGrid, FiHeart, FiHome, FiShoppingBag, FiUser } from "react-icons/fi";
import { useTranslation } from "react-i18next";
export const getStaticProps: GetStaticProps = async context => {
    return {
        props: {
            ...(await serverSideTranslations(context.locale as string)),
        },
    };
};

const CreatePage: NextPageWithLayout = () => {
    const { data: products } = api.medusa.getProducts.useQuery();
    const [selectedProduct, setSelectedProduct] = useState<any>(null);
    const [isProductsModalOpen, setIsProductsModalOpen] = useState(false);
    const [isDesignsModalOpen, setIsDesignsModalOpen] = useState(false);
    const { t } = useTranslation();

    const handleTabClick = (tabId: string) => {
        switch (tabId) {
            case 'products':
                setIsProductsModalOpen(true);
                break;
            case 'designs':
                setIsDesignsModalOpen(true);
                break;
        }
    };

    const bottomTabs = [
        { id: 'custom', title: t('common:Custom'), Icon: FiHome },
        { id: 'products', title: t('common:Products'), Icon: FiGrid },
        { id: 'designs', title: t('common:Designs'), Icon: FiShoppingBag },
        { id: 'text', title: t('common:Text'), Icon: FiHeart },
        { id: 'upload', title: t('common:Upload'), Icon: FiUser },
        { id: 'support', title: t('common:Support'), Icon: FiUser },
    ];
    useEffect(() => {
        if (products && products.length > 0) {
            setSelectedProduct(products[0]);
        }
    }, [products]);

    return (
        <>
            <div className="hidden md:block xl:hidden">
                <BottomNavigation />
            </div>
            <div className="p-3 absolute md:hidden top-0 md:top-auto md:bottom-0 bg-white shadow left-0 z-10 grid grid-cols-12 items-center w-full">
                <ArrowLeft size={24} className="cursor-pointer" onClick={() => window.history.back()} />
                <span className="col-span-6">Create Your Own</span>
                <span className="col-span-2 px-2 text-center">$12</span>
                <Button className="col-span-3 bg-orange-500">Confirm</Button>
            </div>
            {selectedProduct && (
                <div className="flex">
                    <div className="hidden lg:block w-full max-w-lg">
                        <Tabs defaultValue={bottomTabs?.[0]?.title} className="flex">
                            <TabsList className="flex flex-col h-full gap-5 bg-inherit">
                                {bottomTabs.map((tab: any) => (
                                    <TabsTrigger
                                        key={tab.id}
                                        value={tab.title}
                                        onClick={() => handleTabClick(tab.id)}
                                        className="data-[state=active]:bg-[#F3F9FE] rounded-lg flex flex-col p-4 items-center justify-center hover:bg-[#F3F9FE] transition-colors"
                                    >
                                        <tab.Icon />
                                        {tab.title}
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                            {bottomTabs.map((tab: any) => (
                                <TabsContent key={tab.id} value={tab.title} className="w-full">
                                    <div className="p-6">
                                        <h1 className="text-2xl font-bold mb-4">Create your own</h1>
                                        <hr className="mb-4" />
                                        {tab.id === 'custom' && (
                                            <div>
                                                <p className="mb-4">{tab.title}</p>
                                                <div className="grid gap-4">
                                                    <div className="space-y-2">
                                                        <Label>Color: Navy</Label>
                                                        <div className="flex gap-2 flex-wrap">
                                                            {/* Color swatches */}
                                                            <div className="w-10 h-10 rounded bg-black border-2 cursor-pointer" />
                                                            <div className="w-10 h-10 rounded bg-white border-2 cursor-pointer" />
                                                            <div className="w-10 h-10 rounded bg-blue-900 border-2 cursor-pointer" />
                                                            <div className="w-10 h-10 rounded bg-red-600 border-2 cursor-pointer" />
                                                            <div className="w-10 h-10 rounded bg-gray-800 border-2 cursor-pointer" />
                                                        </div>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label>Size</Label>
                                                        <Input placeholder="Choose a size" />
                                                    </div>
                                                    <Button className="w-full bg-orange-500 hover:bg-orange-600">
                                                        Confirm
                                                    </Button>
                                                </div>
                                            </div>
                                        )}
                                        {tab.id === 'text' && (
                                            <div className="space-y-4">
                                                <Input placeholder="Enter your text..." />
                                                <div className="space-y-2">
                                                    <Label>Font</Label>
                                                    <Input placeholder="Choose font" />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label>Color</Label>
                                                    <Input type="color" />
                                                </div>
                                            </div>
                                        )}
                                        {tab.id === 'upload' && (
                                            <div className="space-y-4">
                                                <h3 className="font-medium">Upload file</h3>
                                                <p className="text-sm text-gray-500">
                                                    (If you don&apos;t complete the customized box, our design team will change some details on the prints if necessary) to ensure they are perfect for your items.)
                                                </p>
                                                <div className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors">
                                                    <div className="flex flex-col items-center">
                                                        <FiUser size={32} className="mb-2" />
                                                        <p className="text-sm">Upload (PNG, JPG, JPEG, &lt; 10MB)</p>
                                                    </div>
                                                </div>
                                                <p className="text-xs text-gray-500">
                                                    By uploading a design, you confirm that it does not violate any applicable laws or rights of third parties.
                                                </p>
                                                <div className="mt-4">
                                                    <Label>Uploaded</Label>
                                                    <div className="mt-2 border rounded p-2">
                                                        <img src="/placeholder.png" alt="Uploaded" className="w-full h-32 object-cover rounded" />
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        {tab.id === 'support' && (
                                            <div className="space-y-4">
                                                <h3 className="font-medium text-lg">Support</h3>
                                                <div className="border rounded-lg p-4">
                                                    <h4 className="font-medium mb-2">Bulk Orders For 50+ items</h4>
                                                    <Button variant="link" className="p-0 h-auto text-orange-500">Learn more</Button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </TabsContent>
                            ))}
                        </Tabs>

                        {/* Products Modal */}
                        {isProductsModalOpen && (
                            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center" onClick={() => setIsProductsModalOpen(false)}>
                                <Card className="w-full max-w-4xl max-h-[90vh] overflow-auto m-4" onClick={(e) => e.stopPropagation()}>
                                    <CardHeader>
                                        <CardTitle>Products</CardTitle>
                                        <CardDescription>Choose a product to customize</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <Input placeholder="Find Products" className="mb-4" />
                                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                            {products?.map((product: any) => (
                                                <div
                                                    key={product.id}
                                                    className="border rounded-lg p-2 cursor-pointer hover:border-blue-500 transition-colors"
                                                    onClick={() => {
                                                        setSelectedProduct(product);
                                                        setIsProductsModalOpen(false);
                                                    }}
                                                >
                                                    <img
                                                        src={product.thumbnail || '/placeholder.png'}
                                                        alt={product.title}
                                                        className="w-full h-40 object-cover rounded mb-2"
                                                    />
                                                    <p className="text-sm font-medium">{product.title}</p>
                                                    <p className="text-xs text-gray-500">${product.variants?.[0]?.prices?.[0]?.amount / 100}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Button variant="outline" onClick={() => setIsProductsModalOpen(false)}>Close</Button>
                                    </CardFooter>
                                </Card>
                            </div>
                        )}

                        {/* Designs Modal */}
                        {isDesignsModalOpen && (
                            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center" onClick={() => setIsDesignsModalOpen(false)}>
                                <Card className="w-full max-w-5xl max-h-[90vh] overflow-auto m-4" onClick={(e) => e.stopPropagation()}>
                                    <CardHeader>
                                        <CardTitle>Choose a design</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <Input placeholder="Find Designs" className="mb-4" />
                                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                            {['charlie kirk freedom', 'justic for charlie kirk', 'Harris Walz 2024', 'rip Charlie Kirk', 'Harris Walz 2024 Vote'].map((design, idx) => (
                                                <div
                                                    key={idx}
                                                    className="border rounded-lg p-3 cursor-pointer hover:border-blue-500 transition-colors"
                                                >
                                                    <div className="w-full h-40 bg-gray-200 rounded mb-2 flex items-center justify-center">
                                                        <span className="text-sm text-gray-500">Design {idx + 1}</span>
                                                    </div>
                                                    <p className="text-sm font-medium">{design}</p>
                                                    <p className="text-xs text-gray-500">$3.00</p>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Button variant="outline" onClick={() => setIsDesignsModalOpen(false)}>Close</Button>
                                    </CardFooter>
                                </Card>
                            </div>
                        )}
                    </div>
                    <CustomeProduct {...selectedProduct} />
                </div>
            )}
            <div className="p-3 hidden bg-white grid md:grid md:grid-cols-12 items-center w-full">
                <ArrowLeft size={24} className="cursor-pointer" onClick={() => window.history.back()} />
                <span className="col-span-6">Create Your Own</span>
                <span className="col-span-2 px-2 text-center">$12</span>
                <Button className="col-span-3 bg-orange-500">Confirm</Button>
            </div>
            <div className="md:hidden">
                <BottomNavigation />
            </div>
            <div className="xl:px-4">
                <Recently />
            </div>
        </>
    );
};

CreatePage.getLayout = function getLayout(page: ReactElement) {
    return (
        <PrimaryLayout seo={{ title: 'Create Your Own', canonical: '/create' }} >
            {page}
        </PrimaryLayout>
    );
};
export default CreatePage;