import Image from "next/image";
import Link from "next/link";

const SocialShare = () => {
    return (
        <div className="bg-white rounded-lg shadow-sm p-6">
            {/* Share Section */}
            <div className="mb-6">
                <h3 className="text-base font-semibold text-gray-800 mb-4">
                    Share userful information
                </h3>
                <div className="flex gap-3">
                    {/* Facebook */}
                    <Link
                        href="#"
                        className="w-10 h-10 rounded-full bg-[#3b5998] hover:bg-[#2d4373] flex items-center justify-center transition-colors"
                        aria-label="Share on Facebook"
                    >
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                    </Link>

                    {/* Blogger */}
                    <Link
                        href="#"
                        className="w-10 h-10 rounded-full bg-[#ff5722] hover:bg-[#e64a19] flex items-center justify-center transition-colors"
                        aria-label="Share on Blogger"
                    >
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M21.976 24H2.026C.9 24 0 23.1 0 21.976V2.026C0 .9.9 0 2.025 0h19.95C23.1 0 24 .9 24 2.025v19.95C24 23.1 23.1 24 21.976 24zM12 3.975H9c-2.775 0-5.025 2.25-5.025 5.025v6c0 2.774 2.25 5.024 5.025 5.024h6c2.774 0 5.024-2.25 5.024-5.024v-3.975c0-.6-.45-1.05-1.05-1.05H18c-.524 0-.976-.45-.976-.975s.45-.975.975-.975h1.125c.675 0 1.125-.45 1.125-1.125V9c0-2.775-2.25-5.025-5.024-5.025zM9 6h4.5c.525 0 .975.45.975.975s-.45.975-.975.975H9c-.525 0-.975-.45-.975-.975S8.475 6 9 6zm6 9H9c-.525 0-.975-.45-.975-.975s.45-.975.975-.975h6c.525 0 .975.45.975.975S15.525 15 15 15z"/>
                        </svg>
                    </Link>

                    {/* Twitter */}
                    <Link
                        href="#"
                        className="w-10 h-10 rounded-full bg-[#1da1f2] hover:bg-[#0d8bd9] flex items-center justify-center transition-colors"
                        aria-label="Share on Twitter"
                    >
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                        </svg>
                    </Link>

                    {/* LinkedIn */}
                    <Link
                        href="#"
                        className="w-10 h-10 rounded-full bg-[#0077b5] hover:bg-[#005582] flex items-center justify-center transition-colors"
                        aria-label="Share on LinkedIn"
                    >
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                    </Link>

                    {/* Pinterest */}
                    <Link
                        href="#"
                        className="w-10 h-10 rounded-full bg-[#e60023] hover:bg-[#bd081c] flex items-center justify-center transition-colors"
                        aria-label="Share on Pinterest"
                    >
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.438.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z"/>
                        </svg>
                    </Link>
                </div>
            </div>

            {/* Like Section */}
            <div className="pt-6 border-t border-gray-200">
                <h3 className="text-base font-semibold text-gray-800 mb-4">
                    Like and interested in Printerval
                </h3>
                <div className="flex gap-3">
                    {/* Facebook Like Button */}
                    <div className="flex items-center">
                        <iframe 
                            src="https://www.facebook.com/plugins/like.php?href=https%3A%2F%2Fwww.facebook.com%2Fgofiber&width=100&layout=button_count&action=like&size=small&share=false&height=21&appId" 
                            width="100" 
                            height="21" 
                            style={{border: 'none', overflow: 'hidden'}} 
                            scrolling="no" 
                            frameBorder="0" 
                            allowFullScreen={true} 
                            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                        />
                    </div>

                    {/* YouTube Subscribe Button */}
                    <div className="flex items-center">
                        <Link
                            href="https://www.youtube.com/@gofiber"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-[#ff0000] hover:bg-[#cc0000] text-white text-sm font-medium px-3 py-1 rounded transition-colors"
                        >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                            </svg>
                            YouTube
                        </Link>
                    </div>
                </div>
            </div>

            {/* Posted By Section */}
            <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden flex-shrink-0">
                        <Image
                            src="/assets/author-avatar.png"
                            alt="Blog Printerval"
                            width={48}
                            height={48}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">Posted by:</p>
                        <Link 
                            href="#" 
                            className="text-base font-semibold text-orange-500 hover:text-orange-600 transition-colors"
                        >
                            Blog Printerval
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SocialShare;
