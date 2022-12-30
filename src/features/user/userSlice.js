import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BaseUrl } from "../../utils/BaseUrl";



export const loginUserAsync = createAsyncThunk(
    "user/login",
    async({ email, password }, thunkAPI) => {
        try {
            const { data } = await axios.post(`${BaseUrl}/users/login`, { email, password, });
            if (data.success) {
                axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
                localStorage.setItem("user", JSON.stringify(data.user));
                localStorage.setItem("token", JSON.stringify(data.token));
                return data;
            }
            return thunkAPI.rejectWithValue({
                errorMessage: data.message
            })
        } catch (error) {
            return thunkAPI.rejectWithError({
                errorMessage: error.message
            });
        }
    }
);


export const signupUserAsync = createAsyncThunk(
    "user/signup",
    async({ username, name, email, password }, thunkAPI) => {
        try {
            const { data } = await axios.post(`${BaseUrl}/users/signup`, {
                username,
                name,
                email,
                password,
            });
            if (data.success) {
                axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
                localStorage.setItem("user", JSON.stringify(data.user));
                localStorage.setItem("token", JSON.stringify(data.token));
                return data;
            }
            return thunkAPI.rejectWithValue({
                errorMessage: data.message
            })
        } catch (error) {
            return thunkAPI.rejectWithValue({ errorMessage: error.message });
        }
    }
)


export const fetchUserFollowers = createAsyncThunk(
    "user/fetchUserFollowers",
    async(body, thunkAPI) => {
        try {
            const { data } = await axios.post(`${BaseUrl}/users/followers`, body);
            if (data.success) {
                return data;
            }
            return thunkAPI.rejectWithValue({
                errorMessage: data.message
            });
        } catch (error) {
            return thunkAPI.rejectWithValue({
                errorMessage: error.message
            })
        }
    }
)

export const fetchUserFollowing = createAsyncThunk(
    "user/fetchUserFollowing",
    async(body, thunkAPI) => {
        try {
            const { data } = await axios.post(`${BaseUrl}/users/following`, body);
            if (data.success) {
                return data;
            }
            return thunkAPI.rejectWithValue({
                errorMessage: data.message
            })
        } catch (error) {
            return thunkAPI.rejectWithValue({ errorMessage: error.message });
        }
    }
)


export const fetchUserInfo = createAsyncThunk(
    "user/fetchUserInfo",
    async ({ userId }, thunkAPI) => {
        try {
            const { data } = await axios.get(`${BaseUrl}/users/${userId}`);
            if (data.success) {
                return data;
            }
            return thunkAPI.rejectWithValue({ errorMessage: data.message });
        } catch (error) {
            return thunkAPI.rejectWithValue({ errorMessage: error.message });
        }
    }
);

export const followUser = createAsyncThunk(
    "user/followUser",
    async({ targetId }, thunkAPI) => {
        try {
            const {
                user: {
                    data: { _id: sourceId },
                },
            } = thunkAPI.getState();
            const { data } = await axios.post(`${BaseUrl}/users/follow`, {
                targetId,
                sourceId,
            });
            if (data.success) {
                return data;
            }
            return thunkAPI.rejectWithValue({ errorMessage: data.message });
        } catch (error) {
            return thunkAPI.rejectWithValue({ errorMessage: error.message });
        }
    }
);

export const fetchRecentlyJoinedUsers = createAsyncThunk(
    "user/fetchRecentlyJoinedUsers",
    async(_, thunkAPI) => {
        try {
            const {
                user: {
                    data: { _id: userId },
                },
            } = thunkAPI.getState();
            const { data } = await axios.get(
                `${BaseUrl}/users/get-recently-joined-users/${userId}`
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

export const unFollowUser = createAsyncThunk(
    "user/unFollowUser",
    async({ targetId }, thunkAPI) => {
        try {
            const {
                user: {
                    data: { _id: sourceId },
                },
            } = thunkAPI.getState();
            const { data } = await axios.post(`${BaseUrl}/users/unfollow`, {
                targetId,
                sourceId,
            });
            if (data.success) {
                return data;
            }

            return thunkAPI.rejectWithValue({
                errorMessage: data.message
            })
        } catch (error) {
            return thunkAPI.rejectWithValue({
                errorMessage: error.message
            })
        }
    }
)

export const updateUserInfo = createAsyncThunk(
    "user/updateUserInfo",
    async(body, thunkAPI) => {
        try {
            const {
                user: {
                    data: { _id: userId },
                },
            } = thunkAPI.getState();
            const { data } = await axios.put(
                `${BaseUrl}/users/update/${userId}`,
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

const userSlice = createSlice({
    name: "user",
    initialState: {
        data: {
            _id: null,
            name: null,
            username: null,
            email: null,
            profileUrl: null,
            followers: [],
            following: [],
            chats: [],
        },
        retreivedUser: {
            _id: null,
            name: null,
            username: null,
            email: null,
            bio: null,
            profileUrl: null,
            followers: [],
            following: [],
        },
        token: null,
        isUserLoggedIn: false,
        loading: false,
        errorMessage: "",
        retreivedUserLoading: false,
        recentlyJoinedUsers: [],
        recentlyJoinedUsersLoading: false,
        initialLoading: true,
        profileTabsFetching: true,
    },
    reducers: {
        logoutUser: (state) => {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            state.data = {
                _id: null,
                name: null,
                username: null,
                email: null,
                bio: null,
                profileUrl: null,
                followers: [],
                followings: [],
            };
            state.token = null;
            state.isUserLoggedIn = false;
            state.loading = false;
            state.errorMessage = "";
        },
        setUserFromLocalStorage: (state) => {
            let user;
            const jsonUser = localStorage.getItem("user");
            if (jsonUser) {
                user = JSON.parse(jsonUser);
            }
            const token = JSON.parse(localStorage.getItem("token"));
            if (user !== undefined && token !== null) {
                state.isUserLoggedIn = true;
                state.data = user;
                state.token = token;
                axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            }
            state.initialLoading = false;
        },
        setInitialLoadingFalse: (state) => {
            state.initialLoading = false;
        },
    },
    extraReducers: {
        [loginUserAsync.pending]: (state) => {
            state.loading = true;
        },
        [loginUserAsync.fulfilled]: (state, action) => {
            state.loading = false;
            state.isUserLoggedIn = true;
            state.errorMessage = "";
            state.data = action.payload.user;
        },
        [loginUserAsync.rejected]: (state, action) => {
            state.loading = false;
            state.errorMessage = action.payload.errorMessage;
        },
        [signupUserAsync.pending]: (state) => {
            state.loading = true;
        },
        [signupUserAsync.fulfilled]: (state, action) => {
            state.loading = false;
            state.isUserLoggedIn = true;
            state.errorMessage = "";
            state.data = action.payload.user;
        },
        [signupUserAsync.rejected]: (state, action) => {
            state.loading = false;
            state.errorMessage = action.payload.errorMessage;
        },
        [fetchUserFollowers.pending]: (state) => {
            state.profileTabsFetching = true;
            state.errorMessage = "";
        },
        [fetchUserFollowers.rejected]: (state, action) => {
            state.profileTabsFetching = false;
            state.errorMessage = action.payload.errorMessage;
        },
        [fetchUserFollowers.fulfilled]: (state, action) => {
            state.profileTabsFetching = false;
            state.errorMessage = "";
            state.retreivedUser.followers = action.payload.followers;
            if (state.data._id === state.retreivedUser._id) {
                state.data.followers = action.payload.followers;
            }
        },
        [fetchUserFollowing.pending]: (state) => {
            state.profileTabsFetching = true;
            state.errorMessage = "";
        },
        [fetchUserFollowing.rejected]: (state, action) => {
            state.profileTabsFetching = false;
            state.errorMessage = action.payload.errorMessage;
        },
        [fetchUserFollowing.fulfilled]: (state, action) => {
            state.profileTabsFetching = false;
            state.errorMessage = "";
            state.retreivedUser.following = action.payload.following;
            if (state.data._id === state.retreivedUser._id) {
                state.data.following = action.payload.following;
            }
        },
        [fetchUserInfo.pending]: (state) => {
            state.retreivedUserLoading = true;
            state.errorMessage = "";
        },
        [fetchUserInfo.rejected]: (state, action) => {
            state.retreivedUserLoading = false;
            state.errorMessage = action.payload.errorMessage;
        },
        [fetchUserInfo.fulfilled]: (state, action) => {
            state.retreivedUserLoading = false;
            state.errorMessage = "";
            state.retreivedUser = action.payload.user;
        },
        [followUser.fulfilled]: (state, action) => {
            state.data.following.push(action.payload.targetUserId);
            if (state.retreivedUser._id === action.payload.targetUserId) {
                state.retreivedUser.followers.push(state.data._id);
            }
        },
        [unFollowUser.fulfilled]: (state, action) => {
            let index = state.data.following.indexOf(action.payload.targetUserId);
            state.data.following.splice(index, 1);
            if (state.retreivedUser._id === action.payload.targetUserId) {
                index = state.retreivedUser.followers.indexOf(state.data._id);
                state.retreivedUser.followers.splice(index, 1);
            }
        },
        [fetchRecentlyJoinedUsers.pending]: (state) => {
            state.recentlyJoinedUsersLoading = true;
        },
        [fetchRecentlyJoinedUsers.rejected]: (state, action) => {
            state.recentlyJoinedUsersLoading = false;
            state.errorMessage = action.payload.errorMessage;
        },
        [fetchRecentlyJoinedUsers.fulfilled]: (state, action) => {
            state.recentlyJoinedUsers = action.payload.users;
            state.recentlyJoinedUsersLoading = false;
        },
        [updateUserInfo.pending]: (state) => {
            state.retreivedUserLoading = true;
        },
        [updateUserInfo.fulfilled]: (state, action) => {
            state.retreivedUser = action.payload.user;
            state.data = action.payload.user;
            state.retreivedUserLoading = false;
        },
    },
});

export const { logoutUser, setUserFromLocalStorage, setInitialLoadingFalse } = userSlice.actions;
export default userSlice.reducer;