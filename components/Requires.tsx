interface RequiresProps {
    req?: {
        title: string;
        url: string;
    }[];
}

export default function Requires({ req }: RequiresProps) {
    if (!req?.length) return null;

    return (
        <div className="flex w-fit flex-col">
            <p className="text-sm text-muted-foreground">Built with</p>
            <div className="flex flex-col gap-1">
                {req.map((item, index) => {
                    const hostname = new URL(item.url).hostname;
                    const faviconUrl = `https://www.google.com/s2/favicons?domain=${hostname}&sz=32`;

                    return (
                        <div
                            key={index}
                            className="flex items-center gap-2 rounded-md bg-card p-1 text-muted-foreground"
                        >
                            <img
                                src={faviconUrl}
                                alt={`${item.title} favicon`}
                                className="size-4"
                            />
                            <a
                                href={item.url}
                                className="text-sm hover:underline"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {item.title}
                            </a>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
