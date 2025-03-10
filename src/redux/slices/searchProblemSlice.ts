import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SearchProblemState {
  searchProblem: string;
}

const initialState: SearchProblemState = {
  searchProblem: ''
};

const searchProblemSlice = createSlice({
  name: 'searchProblem',
  initialState,
  reducers: {
    setSearchProblem: (state, action: PayloadAction<string>) => {
      state.searchProblem = action.payload;
    },
    clearSearchProblem: (state) => {
      state.searchProblem = '';
    }
  }
});

export const getSearchProblemSelector = createSelector(
  (state: { searchProblem: SearchProblemState }) => state.searchProblem,
  (searchProblemState: SearchProblemState) => searchProblemState.searchProblem
);

export const { setSearchProblem,clearSearchProblem } = searchProblemSlice.actions;

export default searchProblemSlice.reducer;
