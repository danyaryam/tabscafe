import OurStoryClient from "./our-story"

export const metadata = {
    title: "Our Story | TabsCafe",
    description:
        "Kenali perjalanan TabsCafe, sumber kopi pilihan, tim di balik brand, serta misi dan nilai yang kami bawa dalam setiap cangkir.",
    openGraph: {
        title: "Our Story | TabsCafe",
        description:
            "Dari biji kopi hingga komunitas. Cerita lengkap TabsCafe tentang kualitas, transparansi, dan keberlanjutan.",
        url: "https://tabscafe.com/our-story",
        siteName: "TabsCafe",
        type: "website",
    },
}

export default function Page() {
    return <OurStoryClient />
}
