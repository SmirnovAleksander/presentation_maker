import {create} from 'zustand'
import {devtools, persist} from "zustand/middleware";

interface IBearStore {
    bears: number
    increasePopulation: () => void
    removeAllBears: () => void
}
// export const useBearsStore = create<IBearStore>((set) => ({
//     bears: 0,
//     increasePopulation: () => set((state) => ({bears: state.bears + 1})),
//     removeAllBears: () => set({bears: 0}),
// }))

export const useBearsStore = create<IBearStore>()(
    devtools(
        persist(
            (set) => ({
                bears: 0,
                increasePopulation: () => set((state) => ({bears: state.bears + 1})),
                removeAllBears: () => set({bears: 0}),
            }), {
                name: 'bears',
            }
        )
    )
)
