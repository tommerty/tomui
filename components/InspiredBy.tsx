export default function InspiredBy({
    name,
    url,
}: {
    name: string;
    url: string;
}) {
    const hostname = new URL(url).hostname;
    const faviconUrl = `https://www.google.com/s2/favicons?domain=${hostname}&sz=32`;
    return (
        <div className="flex w-fit flex-col py-3">
            <p className="text-sm text-muted-foreground">Inspired by</p>
            <div className="flex items-center gap-2 rounded-md bg-card p-1 text-muted-foreground">
                <img
                    src={faviconUrl}
                    alt={`${name} favicon`}
                    className="size-4"
                />
                <a
                    href={url}
                    className="text-sm hover:underline"
                    target="_blank"
                >
                    {name}
                </a>
            </div>
        </div>
    );
}
