import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { get, post, update as updateItem, deleteItem as deleteItemService } from '../service/ticket'
const key = 'tickets';

const initialState = {
    [key]: [],
    status: 'idle',
    error: null,
}

export const fetch = createAsyncThunk(
    `${key}/fetch`,
    async () => {
        return await get()
    }
)

export const add = createAsyncThunk(
    `${key}/add`,
    async (item) => {
        return await post(item)
    }
)

export const update = createAsyncThunk(
    `${key}/update`,
    async (item) => {
        return updateItem(item);
    }
)

export const deleteItem = createAsyncThunk(
    `${key}/delete`,
    async (item) => {
        return await deleteItemService(item)
    }
)

const ticketsSlice = createSlice({
    name: `${key}`,
    initialState,
    reducers: {

    },
    extraReducers(builder) {
        builder
            .addCase(fetch.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetch.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state[key] = state[key].concat(action.payload)
            })
            .addCase(fetch.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(add.fulfilled, (state, action) => {
                state[key].push(action.payload)
            })
            .addCase(deleteItem.fulfilled, (state, action) => {
                const { id } = action.payload
                const existingItem = state[key].findIndex((item) => item.id === id)
                if (existingItem !== undefined) {
                    state[key].splice(existingItem, 1);
                }
            })
            .addCase(update.fulfilled, (state, action) => {
                const { id, ...other } = action.payload
                const existingItem = state[key].find((item) => item.id === id)

                if (existingItem) {
                    Object.assign(existingItem, other);
                }
            })
    },
})

export default ticketsSlice.reducer

export const getTicketsByList = (state, id) =>
    state[key][key].filter((item) => item.listId === id)
