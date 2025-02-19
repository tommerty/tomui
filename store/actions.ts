"use server";

import { cookies } from "next/headers";

export async function updateSidebarCookie(states: Record<string, boolean>) {
    const cookieStore = cookies();
    (await cookieStore).set("sidebar-states", JSON.stringify(states), {
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
    });
}
