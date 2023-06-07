// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// const baseURL = "http://localhost:80";
// // const nestedRoute = "/rates";

// export const fetchApiData = createAsyncThunk("products/fetchData", async () => {
//   try {
//     console.log("Hello from fetch");
//     const response = await fetch(`${baseURL}`);
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     throw new Error("Error fetching user Dashboard data");
//   }
// });

// const apiDataSlice = createSlice({
//   name: "productsData",
//   initialState: {
//     data: [],
//     isLoading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchApiData.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(fetchApiData.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.data = action.payload;
//       })
//       .addCase(fetchApiData.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.error.message;
//       });
//   },
// });

// export default apiDataSlice.reducer;
