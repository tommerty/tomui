import { create } from "zustand";
import { updateSidebarCookie } from "./actions";

interface SidebarState {
    sidebarStates: {
        "app-sidebar": boolean;
        "right-sidebar": boolean;
    };
    openMobile: boolean;
    toggleSidebar: (name: keyof SidebarState["sidebarStates"]) => void;
    setOpenMobile: (value: boolean) => void;
}

export const useSidebarStore = create<SidebarState>()((set) => ({
    sidebarStates: {
        "app-sidebar": true,
        "right-sidebar": true,
    },
    openMobile: false,
    toggleSidebar: (name) =>
        set((state) => {
            const newStates = {
                ...state.sidebarStates,
                [name]: !state.sidebarStates[name],
            };
            updateSidebarCookie(newStates);
            return { sidebarStates: newStates };
        }),
    setOpenMobile: (value) => set({ openMobile: value }),
}));
