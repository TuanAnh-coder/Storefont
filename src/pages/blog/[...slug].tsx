import { LayoutBlog } from "@/layouts/LayoutBlog";
import { GetStaticPathsResult, GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ReactElement, useEffect, useState, useRef } from "react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { api } from "@/utils/api";
import { useRouter } from "next/router";
import PopularBlog from "@/components/blog/popular";
import MostBlog from "@/components/blog/mostBlog";
import Recently from "@/components/other-page/recently";
import SocialShare from "@/components/blog/social";

interface Heading {
    id: string;
    text: string;
    element: HTMLElement;
}

export const getStaticProps: GetStaticProps = async context => {
    return {
        props: {
            ...(await serverSideTranslations(context.locale as string)),
        },
    };
};
export function getStaticPaths(): GetStaticPathsResult {
    return {
        paths: [],
        fallback: 'blocking',
    };
}

const BlogPage = () => {
    const router = useRouter()
    const { slug } = router.query
    const blogSlug = Array.isArray(slug) ? slug.join('/') : slug

    const path = usePathname()
    const breadcrumbs = path?.split('/').filter(Boolean) || []

    const { data: blog } = api.blog.getBlog.useQuery(
        { slug: blogSlug || '' },
        { enabled: !!blogSlug }
    );

    const [headings, setHeadings] = useState<Heading[]>([]);
    const [activeHeading, setActiveHeading] = useState<string>("");
    const contentRef = useRef<HTMLDivElement>(null);

    // Extract headings từ HTML sau khi render
    useEffect(() => {
        if (!blog || !contentRef.current) return;

        const headingElements = contentRef.current.querySelectorAll('h1, h2, h3, h4, h5, h6');
        const extractedHeadings: Heading[] = [];

        headingElements.forEach((element, index) => {
            const text = element.textContent || "";
            const id = `heading-${index}`;
            element.setAttribute('data-heading-id', id);
            element.classList.add('scroll-mt-24');

            extractedHeadings.push({
                id,
                text: text.trim(),
                element: element as HTMLElement
            });
        });

        setHeadings(extractedHeadings);
    }, [blog]);

    // Theo dõi scroll để active heading
    useEffect(() => {
        if (headings.length === 0) return;

        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    let currentActive = "";

                    headings.forEach((heading) => {
                        const rect = heading.element.getBoundingClientRect();
                        if (rect.top <= 150 && rect.bottom >= 150) {
                            currentActive = heading.id;
                        }
                    });

                    if (currentActive && currentActive !== activeHeading) {
                        setActiveHeading(currentActive);
                    }

                    ticking = false;
                });

                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, [headings, activeHeading]);

    const scrollToHeading = (headingId: string) => {
        const heading = headings.find(h => h.id === headingId);
        if (heading) {
            const yOffset = -100;
            const y = heading.element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };

    if (!blog) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-lg text-gray-500">Đang tải bài viết...</p>
            </div>
        );
    }

    return (
        <>
            <div className="py-8 max-w-7xl mx-auto w-full">
                {/* Breadcrumb */}
                <Breadcrumb className="mb-8">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href="/">Home</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        {breadcrumbs.map((crumb, index) => {
                            const href = '/' + breadcrumbs.slice(0, index + 1).join('/')
                            const isLast = index === breadcrumbs.length - 1

                            return (
                                <div key={href} className="flex items-center">
                                    <BreadcrumbSeparator />
                                    <BreadcrumbItem className="max-w-[150px] sm:max-w-[200px] md:max-w-xs">
                                        {isLast ? (
                                            <BreadcrumbPage className="capitalize truncate">
                                                {decodeURIComponent(crumb)}
                                            </BreadcrumbPage>
                                        ) : (
                                            <BreadcrumbLink asChild>
                                                <Link href={href} className="capitalize truncate block">
                                                    {decodeURIComponent(crumb)}
                                                </Link>
                                            </BreadcrumbLink>
                                        )}
                                    </BreadcrumbItem>
                                </div>
                            )
                        })}
                    </BreadcrumbList>
                </Breadcrumb>

                <div className="xl:flex lg:gap-2">
                    {/* Tiêu đề bài viết */}
                    <div>
                        <h1 className="text-2xl font-medium mb-4 text-amber-900 py-2">
                            {blog.Title}
                        </h1>

                        {/* Nội dung bài viết */}
                        <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
                            {/* Sidebar - Table of Contents */}
                            {headings.length > 0 && (
                                <aside className="lg:w-64 flex-shrink-0 order-2 lg:order-1">
                                    <div className="sticky top-24 bg-gray-50 rounded-lg p-4 border border-gray-200">
                                        <h2 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                                            Mục lục
                                        </h2>
                                        <nav className="space-y-2">
                                            {headings.map((heading) => {
                                                const isActive = activeHeading === heading.id;

                                                return (
                                                    <div
                                                        key={heading.id}
                                                        onClick={() => scrollToHeading(heading.id)}
                                                        className={`text-sm transition-all cursor-pointer py-1 px-2 rounded font-bold ${isActive
                                                            ? 'text-amber-800 bg-amber-100 font-semibold border-l-2 border-amber-800'
                                                            : 'text-gray-600 hover:text-amber-800 hover:bg-gray-100'
                                                            }`}
                                                    >
                                                        {heading.text}
                                                    </div>
                                                );
                                            })}
                                        </nav>
                                    </div>
                                </aside>
                            )}

                            {/* Main Content */}
                            <article className="flex-1 max-w-3xl mx-auto order-1 lg:order-2">
                                <div
                                    ref={contentRef}
                                    className="
                                max-w-none text-gray-800 text-base sm:text-lg leading-relaxed space-y-6
                                [&>h1]:text-3xl [&>h1]:font-bold [&>h1]:text-amber-900 [&>h1]:mt-10 [&>h1]:mb-6 [&>h1]:border-b-2 [&>h1]:border-amber-200 [&>h1]:pb-2
                                [&>h2]:text-2xl [&>h2]:font-semibold [&>h2]:text-amber-900 [&>h2]:mt-8 [&>h2]:mb-4
                                [&>h3]:text-xl [&>h3]:font-semibold [&>h3]:text-amber-900 [&>h3]:mt-6 [&>h3]:mb-3
                                [&>p]:my-4
                                [&>a]:text-blue-600 [&>a]:underline hover:[&>a]:text-blue-800 transition-colors
                                [&>img]:w-full [&>img]:rounded-xl [&>img]:shadow-lg [&>img]:max-h-96 [&>img]:object-cover [&>img]:my-8
                                [&>ul]:list-disc [&>ul]:ml-6 [&>ul]:my-4
                                [&>ol]:list-decimal [&>ol]:ml-6 [&>ol]:my-4
                                [&>li]:text-gray-700 [&>li]:leading-relaxed
                                [&>blockquote]:border-l-4 [&>blockquote]:border-amber-400 [&>blockquote]:bg-amber-50 [&>blockquote]:px-4 [&>blockquote]:py-3 [&>blockquote]:italic [&>blockquote]:my-6
                                [&>strong]:font-semibold [&>strong]:text-gray-900
                            "
                                    dangerouslySetInnerHTML={{ __html: blog.Content }}
                                />
                            </article>
                        </div>
                        <SocialShare />
                        <MostBlog />
                    </div>
                    <div>
                        <PopularBlog />
                    </div>
                </div>
                <Recently />
            </div>
        </>
    )
}
BlogPage.getLayout = function getLayout(page: ReactElement) {
    return (
        <LayoutBlog seo={{ title: 'Home', canonical: '/' }}>
            {page}
        </LayoutBlog>
    );
};
export default BlogPage;