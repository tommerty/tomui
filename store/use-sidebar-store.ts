import { create } from "zustand";
import { updateSidebarCookie } from "./actions";

interface SidebarState {
    sidebarStates: {
        "app-sidebar": boolean;
        "left-sidebar": boolean;
        "right-sidebar": boolean;
    };
    toggleSidebar: (name: keyof SidebarState["sidebarStates"]) => void;
}

export const useSidebarStore = create<SidebarState>()((set) => ({
    sidebarStates: {
        "app-sidebar": true,
        "left-sidebar": true,
        "right-sidebar": false,
    },
    toggleSidebar: (name) =>
        set((state) => {
            const newStates = {
                ...state.sidebarStates,
                [name]: !state.sidebarStates[name],
            };
            updateSidebarCookie(newStates);
            return { sidebarStates: newStates };
        }),
}));
