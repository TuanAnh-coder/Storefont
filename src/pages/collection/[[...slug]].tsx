import CategoryProduct from "@/components/collection/CategoryProduct";
import ListCategoriesChild from "@/components/collection/listCategoriesChild";
import Recently from "@/components/other-page/recently";
import { ReviewItem } from "@/components/product/Reviews";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { PrimaryLayout } from "@/layouts";
import { api } from "@/utils/api";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactElement, useState } from "react";

const CollectionPage = () => {
  const { data: categories, isLoading } = api.medusa.listCategories.useQuery();
  const slug = usePathname();
  const [showFullProductList, setShowFullProductList] = useState(false);

  // Get collection handle from URL
  const collectionHandle = slug?.split('/').pop() || null;

  // Find specific collection by handle
  const collection = categories?.find(item => item.handle === collectionHandle);

  // Get all parent categories (for fallback when no specific collection found)
  const parentCategories = categories?.filter(item => !item.parent_category_id) || [];

  console.log('Collection:', collection);
  console.log('Parent Categories:', parentCategories);

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    );
  }
  return (
    <>
      {/* Header Section */}
      <div className="px-2 sm:px-4 md:px-6 lg:px-8 max-w-7xl mx-auto py-6">
        <div className="text-center">
          <h1 className="text-xl md:text-3xl font-bold text-gray-900 mb-2">
            {collection ? collection.name : 'All Collections'}
          </h1>
          <p className="text-sm md:text-lg text-gray-600 mb-2">
            {collection ? collection.description : 'Browse our complete collection of products'}
          </p>
          {collection?.products && (
            <p className="text-sm text-gray-500">
              ({collection.products.length} results)
            </p>
          )}
        </div>
      </div>

      {/* Category Navigation */}
      {collection ? (
        // Show subcategories if viewing a specific collection
        collection.category_children && collection.category_children.length > 0 && (
          <div className="mb-6">
            <ListCategoriesChild
              category_children={collection.category_children}
              handle={`/collection/${collection.handle}`}
            />
            {/* Products Grid */}
            {collection?.products && collection.products.length > 0 && (
              <div className="mb-8">
                <CategoryProduct
                  products={collection.products}
                  totalCount={collection.products.length}
                  showLoadMore={true}
                />
              </div>
            )}
            {/* Explore Ongoing Events Section */}
            <div className="px-2 sm:px-4 md:px-6 lg:px-8 max-w-7xl mx-auto py-6">
              <h2 className="text-lg md:text-2xl font-bold text-gray-900 mb-6">
                Explore ongoing events
              </h2>
              <Link href="/christmas" className="block">
                <Image
                  src={'/assets/chis.webp'}
                  alt="Christmas Gifts"
                  width={400}
                  height={300}
                  className="object-cover rounded-lg hover:scale-105 transition-transform duration-300"
                />
              </Link>

              {/* Top 10 Best Selling Products Section */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden my-8">
                <div className="p-4 sm:p-6 border-b border-gray-100">
                  <h3 className="text-lg md:text-xl font-bold text-gray-900">
                    Top 10 Best Selling Product Ideas for Home & Living
                  </h3>
                </div>

                {/* Product List */}
                <div className="divide-y divide-gray-100">
                  {[
                    { name: "Best Team Coworker Mug Scrabble Custom Name - Personalized Mug", price: "$10.95" },
                    { name: "Forest Animal For Christmas - Personalized Acrylic Ornament", price: "$7.95" },
                    { name: "Personalized Wicked Ornament 2025, Elphaba and Glinda Christmas Ornament", price: "$12.95" },
                    { name: "Personalized Anniversary Christmas Wedding Gifts - Custom Acrylic Ornament For Husband And Wife", price: "$8.95" },
                    { name: "2025 Buffalo Trace Advent Calendar 24 Days Blind Box Christmas Tree Decoration", price: "$24.95" },
                    { name: "Serve And Protect - Personalized Police Officer Whiskey Glass", price: "$13.99" },
                    { name: "Dodgers World Series Champions 2025 Advent Calendar 24 Mini 2D Ornament", price: "$25.95" },
                    { name: "World Series Champions, Christmas Dodgers Ornament", price: "$8.95" },
                    { name: "Minecraft Advent Calendar 2025, Holiday Countdown Set, Surprise Gift for Christmas", price: "$25.95" },
                    { name: "Bourbon Advent Calendar, Buffalo Trace 250th Anniversary Advent Box, Whiskey Christmas Advent Calendar", price: "$25.95" }
                  ].slice(0, showFullProductList ? 10 : 5).map((product, index) => (
                    <div key={index} className="p-3 sm:p-4 hover:bg-gray-50 transition-colors duration-200">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <span className="text-sm sm:text-base font-medium text-gray-700 mr-2">
                            {index + 1}.
                          </span>
                          <span className="text-sm sm:text-base text-gray-800 leading-relaxed">
                            {product.name}
                          </span>
                        </div>
                        <div className="flex-shrink-0">
                          <span className="text-sm sm:text-base font-bold text-red-600">
                            {product.price}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bottom Section */}
                {showFullProductList && (
                  <div className="bg-gray-50 p-4 sm:p-6">
                    <div className="text-sm sm:text-base text-gray-700 space-y-3 leading-relaxed">
                      <p>
                        You are contemplating products of <span className="font-semibold text-orange-600">Home & Living</span> designed
                        uniquely by the world's top talented designers.
                      </p>
                      <p>
                        With thousands of <span className="font-semibold">Home & Living</span>, which are diverse sizes, colors, surely
                        you will have unlimited choice when shopping for these products at Printerval.
                      </p>
                      <p>
                        Pick these stunning and high-qualified <span className="font-semibold">Home & Living</span> products with the
                        price only from on Printerval.com and own them right now!
                      </p>
                    </div>
                  </div>
                )}

                {/* Toggle Button */}
                <div className="flex justify-center p-4 border-t border-gray-100">
                  <button
                    onClick={() => setShowFullProductList(!showFullProductList)}
                    className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-6 py-2 rounded-lg transition-colors duration-300 text-sm flex items-center gap-2"
                  >
                    {showFullProductList ? (
                      <>
                        <span>See Less</span>
                        <svg className="w-4 h-4 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </>
                    ) : (
                      <>
                        <span>See More</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Review Spotlight */}
              <div className="mb-6">
                <h2 className="text-lg md:text-2xl font-bold text-gray-900 mb-2">
                  Review Spotlight
                </h2>
                <p className="text-gray-600 text-sm md:text-base">
                  Here is a selection of four-star and five-star reviews from customers who were delighted with the products they found in this category.
                </p>
              </div>

              <Carousel
                opts={{
                  align: "start",
                  loop: false,
                }}
                className="w-full"
              >
                <CarouselContent className="pl-2">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <CarouselItem key={index} className="basis-11/12 sm:basis-1/2 lg:basis-1/3 pl-2">
                      <ReviewItem star={4 + Math.round(Math.random())} date={new Date()} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
          </div>
        )
      ) : (
        // Show all parent categories if no specific collection
        parentCategories.length > 0 && (
          <div className="mb-6">
            <ListCategoriesChild
              category_children={parentCategories}
              handle="/collection"
            />
          </div>
        )
      )}
      <div className="px-2 sm:px-4 md:px-6 lg:px-8 max-w-7xl mx-auto py-6">
        <Recently />
      </div>
    </>
  );
}
CollectionPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <PrimaryLayout
      seo={{ title: 'Collection', canonical: '/collection' }}
    >
      {page}
    </PrimaryLayout>
  );
};
export default CollectionPage;