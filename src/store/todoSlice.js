import {
    createSlice,
    createEntityAdapter,
    createAsyncThunk,
} from "@reduxjs/toolkit";

export const login = createAsyncThunk("todo/login", async () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, 2750);
    });
});

const todoAdapter = createEntityAdapter({});

const todoSlice = createSlice({
    name: "todo",
    initialState: todoAdapter.getInitialState({
        loading: false,
        filterQueries: [],
    }),
    reducers: {
        createContent: todoAdapter.addOne,
        deleteContent: todoAdapter.removeOne,
        updateContent: todoAdapter.updateOne,
        handleFilter: (state, action) => {
            state.filterQueries = action.payload;
        },
    },
    extraReducers: {
        [login.fulfilled]: (state, action) => {
            state.loading = false;
        },
        [login.pending]: (state, action) => {
            state.loading = true;
        },
    },
});
export const { selectAll } = todoAdapter.getSelectors(
    (state) => state.todoReducer
);
export const {
    createContent,
    deleteContent,
    updateContent,
    handleFilter,
} = todoSlice.actions;
export default todoSlice.reducer;
