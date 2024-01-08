import { create } from "zustand";

export const useCustomWebsitesToBlock = create((set) => ({
    websitesToBlock: [
        "reddit",
        "facebook",
        "twitter",
        "roblox",
        "instagram",
        "insta",
        "netflix",
        "amazon",
        "facebook",
        "hbo",
        "hotstar",
        "messenger",
    ],
    addWebsitesToBlock: (website: string) => set((state: any) => ({
        ...state,
        websitesToBlock: [...state.websitesToBlock, website]
    }))
}))

export { }