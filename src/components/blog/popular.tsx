import { api } from "@/utils/api";
import Image from "next/image";
import Link from "next/link";
import CreateYourOwnBanner from "./CreateYourOwnBanner";

interface BlogArticle {
    Thumbnail: {
        name: string;
        url: string;
    };
    id: number;
    documentId: string;
    Title: string;
    Description: string;
    Content: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
}

const PopularBlog = () => {
    const { data: articles } = api.blog.getCollections.useQuery();

    const newArticles = (articles as unknown as BlogArticle[] | undefined)
        ?.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
        .slice(0, 4);

    return (
        <div className="bg-white rounded-lg shadow-sm relative h-full">
            <h2 className="hidden lg:block text-2xl font-bold mb-6 p-2 bg-[#F5F5F5]">New posts</h2>
            <div className="hidden lg:block">
                {newArticles?.map((article) => (
                    <Link
                        href={`/blog/${article.slug}`}
                        key={article.id}
                        className="flex gap-2 group hover:bg-gray-50 p-2 rounded-lg transition-colors"
                    >
                        <div className="w-[120px] h-[80px] flex-shrink-0 rounded-lg overflow-hidden">
                            <Image
                                src={`https://blogger-production-0439.up.railway.app${article.Thumbnail.url}`}
                                alt={article.Title}
                                width={120}
                                height={80}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                        <h3 className="text-base font-semibold text-[#2B1C12] line-clamp-3 flex-1">
                            {article.Title}
                        </h3>
                    </Link>
                ))}
            </div>
            <CreateYourOwnBanner />
        </div>
    )
}
export default PopularBlog;