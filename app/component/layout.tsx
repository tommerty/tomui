import {
    SidebarProvider,
    SidebarTrigger,
} from "@/components/complex-sidebar/complex-sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";
import MobileNav from "@/components/MobileNav";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <SidebarProvider defaultOpen name="root">
            <AppSidebar />
            <div className="relative mx-auto w-full max-w-screen-lg">
                {/* <SidebarTrigger className="fixed left-3 top-3 hidden md:block" /> */}
                {children}
                <MobileNav />
            </div>
        </SidebarProvider>
    );
}
