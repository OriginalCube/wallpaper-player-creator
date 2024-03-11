import { create } from 'zustand'

type State = {
	active: boolean
	modal: string | null
}

type Action = {
	openModal: (name: string) => void
	closeModal: () => void
}

export const useModal = create<State & Action>((set) => ({
	active: false,
	modal: null,

	openModal: (name) =>
		set(() => ({
			active: true,
			modal: name,
		})),

	closeModal: () =>
		set(() => ({
			active: false,
			modal: null,
		})),
}))
