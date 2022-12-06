import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BaseUrl } from "../../utils/BaseUrl";

export const fetchChats = createAsyncThunk(
    "message/fetchChats",
    async ({ userId }, thunkAPI) => {
      try {
        const { data } = await axios.get(`${BaseUrl}/users/chats/${userId}`);
        if (data.success) {
          return data;
        }
        return thunkAPI.rejectWithValue({ errorMessage: data.message });
      } catch (error) {
        return thunkAPI.rejectWithValue({ errorMessage: error.message });
      }
    }
  );
  
  export const fetchMessages = createAsyncThunk(
    "message/fetchMessages",
    async (body, thunkAPI) => {
      try {
        const { data } = await axios.post(
          `${BaseUrl}/messages/get_messages`,
          body
        );
        if (data.success) {
          return data;
        }
        return thunkAPI.rejectWithValue({ errorMessage: data.message });
      } catch (error) {
        return thunkAPI.rejectWithValue({ errorMessage: error.message });
      }
    }
);
  


const messagaeSlice = createSlice({
    name: "message",
    initialState: {
        chats: [],
        messages: [],
        loadingChats: false,
        loadingMessages: false,
        error:null,
    },
    reducers: {
        newMessage: (state, action) => {
            state.messages.append(action.payload);
        },

        newChat: (state, action) => {
            state.chats.append(action.payload);
        },
        deleteMessage: (state, action) => {
            state.messages = state.messages.filter((message) => message._id.toString() !== action.payload.id.toString());
        },

        deleteChat: (state, action) => {
            state.chats=state.chats.filter((recipient) =>recipient._id.toString() !==action.payload.id.toString()); 
        },
    },

    extraReducers: {
        [fetchChats.pending]: (state) => {
            state.loadingChats = true;
        }
    }
})




export const { newMessage, newChat, deleteChat, deleteMessage } = messageSlice.actions;
export default messageSlice.reducer;