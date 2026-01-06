export interface ButtonState {
    isPending: boolean,
    isSuccess: boolean,
    isError: boolean,
}

export interface ButtonProps {
    state: ButtonState,
    handleSubmit: () => Promise<void>
}