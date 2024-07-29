import { create } from "zustand";

const alreadyAddedWebsites = JSON.parse(localStorage.getItem('websitesToBlock')!)

export const useCustomWebsitesToBlock = create((set) => ({
    customWebsitesToBlock: alreadyAddedWebsites ? [...alreadyAddedWebsites] : [],
    addWebsitesToBlock: (website: string) => set((state: any) => ({
        ...state,
        customWebsitesToBlock: [...state.customWebsitesToBlock, website]
    })),
    removeWebsitesToBlock: (website: string) => set((state: any) => ({
        ...state,
        customWebsitesToBlock: state.customWebsitesToBlock.filter((websites: string) => websites !== website)
    }))
}))

export const useShowWebsiteEditPage = create((set) => ({
    showWebsiteEditPage: false,
    setShowWebsiteEditPage: (show: boolean) => set(() => ({
        showWebsiteEditPage: show
    }))
}))

export { }