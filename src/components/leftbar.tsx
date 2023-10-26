import Link from "next/link"

export default function LeftBar() {
    const tags = [
    "life",
    "sports",
    "pet",
    "music",
    "travel",
    "food",
    "comedy",
    "technology",
    "education",
    "news",
    "gaming",
    "beauty",
    "fitness",
    "vlogs",
    "documentary",
    "fashion",
    "health",
    "DIY",
    "entertainment",
    "cars",
    "science",
    "art",
    "history",
    "business",
    "cooking",
    "gardening",
    "crafts",
    "celebrities",
    "nature",
    "photography",
    "dance",
    "magic",
    "anime",
    "reviews",
    "trailer",
    "reactions",
    "interviews",
    "reality",
    "pranks",
    "how-to",
    "unboxing",
    "product demos",
    "home improvement",
    "music videos",
    "sustainability",
    "parenting",
    "finance",
    "horror",
    "romance",
    "thriller",
    "fantasy",
    "scifi"
    ];

    return (
        <div className="hidden h-screen left-0 w-60 shrink-0 ml-5 border-r-[1px] border-foreground/30 lg:flex flex-col gap-2 px-8 py-4 text-foreground overflow-auto">
            {
                tags.map((x, index) => (
                    <Link href={'tag/'+ x} key={index}>
                        <div className=" px-5 inline-flex gap-2 h-14 rounded-full items-center  hover:bg-foreground/10 transition-colors duration-150 ">
                            <span>{x}</span>
                        </div>
                    </Link>
                ))
            }
        </div>
    )
}