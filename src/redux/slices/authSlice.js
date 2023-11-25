import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import CryptoJS from "crypto-js";
import { notification } from "../../utils/helper";

export const register = createAsyncThunk("register", async (newUser) => {
  const res = await axios.post(`http://localhost:4000/users`, newUser);
  return res.data;
});

export const login = createAsyncThunk("login", async (inforLogin) => {
  const res = await axios.get(`http://localhost:4000/users`);
  return {
    users: res.data,
    inforLogin: inforLogin,
  };
});

export const getListUser = createAsyncThunk("getListUser", async () => {
  const res = await axios.get(`http://localhost:4000/users`);
  return res.data
})

export const deleteUser = createAsyncThunk("deleteUser", async (id) => {
  const res = await axios.delete(`http://localhost:4000/users/` + id);
  return res
})

export const editUser = createAsyncThunk("editUser", async ({ updatedUser }) => {
  const res = await axios.put(`http://localhost:4000/users/${updatedUser.id}`, updatedUser);
  return res.data;
});

function createToken(userObj, privateKey) {
  return CryptoJS.AES.encrypt(JSON.stringify(userObj), privateKey).toString();
}

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoading: false,
    userData: [],
    user: {},
    isError: false,
    message: "",
    isLogin: false
  },
  reducers: {
    logout: (state) => {
      state.isLogin = false;
      localStorage.clear();
    }
  },
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(register.fulfilled, (state) => {
      state.isLoading = false;
      notification("Đăng ký thành công!");
    });
    builder.addCase(register.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      state.message = "Error ";
      notification("Đăng ký thất bại!", 'error');
    });
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      //tìm xem tài khoản có tồn tại hay không
      let user = action.payload.users.find(
        (user) =>
          user.email === action.payload.inforLogin.email &&
          user.password === action.payload.inforLogin.password
      );
      // kiểm tra đăng nhập
      if (!user) {
        notification("Email hoặc mật khẩu bị sai!", 'error');
      } else {
        //mã hóa dữ liệu
        let token = createToken(user, "keycheck");
        //lưu token trong local storage
        localStorage.setItem("token", token);
        localStorage.setItem("userInfor", JSON.stringify(user));
        state.isLogin = true
        notification("Đăng nhập thành công!");
      }
    });
    builder.addCase(login.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      state.message = "Error";
    });

    builder.addCase(getListUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getListUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.userData = [...action.payload];
    });
    builder.addCase(getListUser.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      state.message = "Error";
    });

    builder.addCase(deleteUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteUser.fulfilled, (state) => {
      state.isLoading = false;
      notification('Xóa người dùng thành công!');
    });
    builder.addCase(deleteUser.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      state.message = "Error";
      notification('Xóa người dùng thất bại!');
    });

    builder.addCase(editUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(editUser.fulfilled, (state, action) => {
      state.isLoading = false;
      const updatedUser = action.payload;
      state.userData = state.userData.map(user => (user.id === updatedUser.id ? updatedUser : user));
      notification("Cập nhật người dùng thành công", "success");
    });
    builder.addCase(editUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = 'Lỗi';
      notification('Cập nhật người dùng thất bại!', 'error');
    });
  },
});

export const { logout } = authSlice.actions
export default authSlice.reducer;
