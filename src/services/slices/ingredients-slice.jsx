import { createSlice, createAsyncThunk, nanoid } from '@reduxjs/toolkit';
import { API_BURGERS, resCheck } from '../../utils/api';

export const initialState = {
   ingredients: [],
   constructorIngredients: [],
   ingredientDetails: null,
   ingredientDetailsModal: false,
   orderModal: false,
   order: 0,
   error: '',
   orderError: '',
   loading: false,
   orderLoading:false
}

export const ingredientSlice = createSlice({
   name: 'ingredients',
   initialState,
   reducers: {
      showIngredientDetails: ( state, {payload} ) => {
         state.ingredientDetails = payload
         state.ingredientDetailsModal = true
      },
      removeIngredientDetails: (state) => {
         state.ingredientDetails = null
         state.ingredientDetailsModal = false
      },
      closeOrderModal: (state) => { 
         state.orderModal = false 
         state.constructorIngredients = []
      },

      addIngredientToConstructor: ( state, { payload }) => {
         if (payload.type !== 'bun' && state.constructorIngredients.length === 0) {
               state.constructorIngredients = []
            } else {
               const id = nanoid()
               state.constructorIngredients.push({ id, ...payload })
            }
      },

      deleteIngredientFromConstructor: (state, { payload }) => {
         if (payload.type === 'bun') {
            state.constructorIngredients = state.constructorIngredients.filter(ingr => ingr.type !== 'bun')
         } else {
            state.constructorIngredients = state.constructorIngredients.filter(ingr => ingr.id !== payload.id)
         }
      },

      dragIngredients: (state, { payload }) => {
         console.log('slice >' + payload.drag)
         const ingredientsToChange = state.constructorIngredients.filter(i => i.type !== 'bun')
         ingredientsToChange[payload.drag] = ingredientsToChange.splice(payload.hover,1, ingredientsToChange[payload.drag])[0]
         state.constructorIngredients = ingredientsToChange.concat(state.constructorIngredients.filter(i => i.type === 'bun'))
      }
   },

   extraReducers: (builder) => {
      builder
         .addCase(fetchIngredients.pending, state => {
            state.loading = true
         })
         .addCase(fetchIngredients.fulfilled, (state, { payload }) => {
            state.loading = false
            state.error = ''
            state.ingredients = payload.data

         })
         .addCase(fetchIngredients.rejected, (state, { payload }) => {
            state.loading = false
            state.error = `${payload}`
         })
         // postFinalResult
         .addCase(postFinalResult.pending, state => {
            state.orderLoading = true
         } )
         .addCase(postFinalResult.fulfilled, (state, { payload }) => {
            state.orderModal = true
            state.orderLoading = false
            state.orderError = ''
            state.order = payload.order.number
         })
         .addCase(postFinalResult.rejected, (state, { payload }) => {
            state.orderLoading = false
            state.orderError = `${payload}`
            state.order = 0
         })
         .addDefaultCase(() => { })
   }
})

export const {
   showIngredientDetails,
   removeIngredientDetails,
   closeOrderModal,
   openOrderModal,
   addIngredientToConstructor,
   deleteIngredientFromConstructor,
   dragIngredients
} = ingredientSlice.actions;

export const ingredientsReducer = ingredientSlice.reducer;
export const ingredientsSelector = state => state.ingredients;

export const fetchIngredients = createAsyncThunk(
   'ingredients/fetchIngredients',
   async ( _, { rejectWithValue }) => {
      try {
         const res = await fetch(API_BURGERS + `${'ingredients'}`)
         const data = await resCheck(res)
         return data
      } catch (err) {
         return rejectWithValue(err)
      }
   }
)

export const postFinalResult = createAsyncThunk(
   'ingredients/postFinalResult',
   async (ingredients, { rejectWithValue }) => {
      try {
         const res = await fetch(API_BURGERS + `${'orders'}`,{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ingredients: ingredients.map(ingr => ingr._id) })
         })
         const result = await resCheck(res)
         return result
      } catch (err) {
         return rejectWithValue(err)
      }
   }
)


