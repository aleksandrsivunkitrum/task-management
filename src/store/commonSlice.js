import { createSlice} from '@reduxjs/toolkit'

const key = 'common';

const initialState = {
    username: 'Username',
    title: 'Title',
    description: 'Description',
}



const commonSlice = createSlice({
    name: `${key}`,
    initialState,
    reducers: {
        updateUser(state, action) {
            const { username, title, description } = action.payload
            state.username = username
            state.title = title
            state.description = description
        }
    }
})

export const { updateUser } = commonSlice.actions

export default commonSlice.reducer

export const getByProperty = (state, property) =>
    state[key][property]

export const getAllProps = (state) =>
    state[key]
