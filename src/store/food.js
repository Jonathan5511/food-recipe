import { createSlice } from "@reduxjs/toolkit";

const initialFoodState = {
  foods: localStorage.getItem("food"),
  id: "",
};

const foodSlice = createSlice({
  name: "food",
  initialState: initialFoodState,
  reducers: {
    food(state, action) {
      state.foods = action.payload;
      localStorage.setItem("food", JSON.stringify(action.payload));
    },
    checkId(state, action) {
      state.id = action.payload;
    },
  },
});

export const foodActions = foodSlice.actions;

export default foodSlice.reducer;
