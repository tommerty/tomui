import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { SidebarContentType, SidebarState } from "@/types/sidebar";

// Function to get sidebar state from localStorage or API
const getSidebarState = async (sidebarName: string): Promise<SidebarState> => {
    // In a real app, this might come from an API or localStorage
    const storedState = localStorage.getItem(`sidebar-${sidebarName}`);
    return storedState
        ? JSON.parse(storedState)
        : { collapsed: true, content: null };
};

// Function to update sidebar state

const updateSidebarState = async (
    sidebarName: string,
    state: SidebarState
): Promise<SidebarState> => {
    localStorage.setItem(`sidebar-${sidebarName}`, JSON.stringify(state));
    return state;
};

export function useSidebarQuery(sidebarName: string) {
    const queryClient = useQueryClient();

    // Query for sidebar state
    const { data: sidebarState } = useQuery({
        queryKey: ["sidebar", sidebarName],
        queryFn: () => getSidebarState(sidebarName),
        initialData: { collapsed: true, content: null },
    });

    // Mutation to update sidebar collapsed state
    const { mutate: setCollapsed } = useMutation({
        mutationFn: (collapsed: boolean) => {
            const newState = { ...sidebarState, collapsed };
            return updateSidebarState(sidebarName, newState);
        },
        onSuccess: (newState) => {
            queryClient.setQueryData(["sidebar", sidebarName], newState);
        },
    });

    // Mutation to update sidebar content
    const { mutate: setContent } = useMutation({
        mutationFn: (content: SidebarContentType) => {
            const newState = { ...sidebarState, content };
            return updateSidebarState(sidebarName, newState);
        },
        onSuccess: (newState) => {
            queryClient.setQueryData(["sidebar", sidebarName], newState);
        },
    });

    return {
        collapsed: sidebarState.collapsed,
        content: sidebarState.content,
        setCollapsed,
        setContent,
    };
}
