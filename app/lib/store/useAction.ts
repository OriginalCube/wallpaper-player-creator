import { create } from 'zustand'
import SongPreset from '@/app/lib/SongData.json'

export type State = {
	songDetails: {
		name: string
		image?: string
		music?: string
		background: string
		foreground: string
	}
	songIndex: number
	playlist: State['songDetails'][]
	playlistId: number
}

type Action = {
	changeSongDetail: (model: keyof State['songDetails'], value: string) => void
	updateSongPreset: () => void
	addToPlaylist: () => void
}

export const useAction = create<Action & State>((set) => ({
	songIndex: 0,
	songDetails: {
		...SongPreset[0],
		image: `/images/${SongPreset[0].name}.jpg`,
	},
	playlist: [],
	playlistId: 0,

	changeSongDetail: (model, value: string) =>
		set((state) => ({
			songDetails: {
				...state.songDetails,
				[model]: value,
			},
		})),

	updateSongPreset: () => {
		set((state) => ({
			songIndex:
				state.songIndex < SongPreset.length - 1 ? state.songIndex + 1 : 0,
			songDetails: {
				...SongPreset[state.songIndex],
				image: `/images/${SongPreset[state.songIndex].name}.jpg`,
				textColor: SongPreset[state.songIndex].foreground,
			},
		}))
	},

	addToPlaylist: () => {
		set((state) => ({
			playlist: [...state.playlist, state.songDetails],
			songDetails: {
				...SongPreset[state.songIndex],
				image: `/images/${SongPreset[state.songIndex].name}.jpg`,
			},
		}))
	},
}))
