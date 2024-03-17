import { create } from 'zustand'

type State = {
	modal: string[]
	data: object
}

type Action = {
	openModal: (name: string) => void
	closeModal: () => void
	setData: (obj: Object) => void
}

export const useModal = create<State & Action>((set) => ({
	modal: [],
	data: {},

	openModal: (name) =>
		set((state) => ({
			modal: [...state.modal, name],
		})),

	closeModal: () =>
		set((state) => ({
			modal: state.modal.slice(0, -1),
		})),

	setData: (obj) => set(() => ({ data: obj })),
}))
