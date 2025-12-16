import { api } from "@/utils/api";
import Image from "next/image";
import Link from "next/link";
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
const MostBlog = () => {
    const { data: articles } = api.blog.getCollections.useQuery();

    const newArticles = (articles as unknown as BlogArticle[] | undefined)
        ?.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
        .slice(0, 4);
    return (
        <div className="bg-white rounded-lg shadow-sm lg:sticky lg:top-10">
            <h2 className="text-xl font-medium py-4">Most Popular</h2>
            {/* Nội dung của thành phần MostBlog */}
            <div className="md:grid md:grid-cols-3 gap-4">
                {newArticles?.map((item, ix) => {
                    return (
                        <Link href={`/blog/${item.slug}`} key={ix} className="flex flex-col justify-between group cursor-pointer h-full">
                            <Image
                                src={`https://blogger-production-0439.up.railway.app${item.Thumbnail.url}`}
                                alt={item.Title}
                                width={600}
                                height={600}
                                className="w-full h-full object-cover rounded-lg"
                            />
                            <h2 className="text-xs sm:text-sm md:text-base font-medium text-gray-900 pb-3 truncate">{item.Title}</h2>
                        </Link>
                    )
                })}
            </div>
        </div>
    );
}
export default MostBlog;