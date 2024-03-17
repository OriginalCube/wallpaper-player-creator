export type Confirm = {
	message: string
	actionName?: string
	action: () => void
	close: () => void
}
