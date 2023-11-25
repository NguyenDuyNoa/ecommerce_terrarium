import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { notification } from "../../utils/helper";

export const getProductLists = createAsyncThunk("getProductLists", async () => {
    let res = await axios.get('http://localhost:4000/products')
    return res.data;
});

export const addProduct = createAsyncThunk("addProduct", async (newProduct) => {
    const res = await axios.post(`http://localhost:4000/products`, newProduct);
    console.log(res)
    return res.data;
});

export const editProduct = createAsyncThunk("editProduct", async (updatedProduct) => {
    const res = await axios.put(`http://localhost:4000/products/${updatedProduct.id}`, updatedProduct);
    return res.data;
});

export const deleteProduct = createAsyncThunk("deleteProduct", async (id) => {
    const res = await axios.delete(`http://localhost:4000/products/${id}`);
    console.log(res)
    return res
})

export const filterProductById = createAsyncThunk("filterProductById", async (id) => {
    let res = await axios.get(`http://localhost:4000/products?id=${id}`);
    return res.data;
}
);

export const filterProductByCategory = createAsyncThunk("filterProductByCategory", async (category) => {
    let res = await axios.get(`http://localhost:4000/products?category=${category}`);
    return res.data;
}
);

export const filterProductByCategoryAndSort = createAsyncThunk("filterProductByCategoryAndSort", async ({ category, type, sort }) => {
    let res = await axios.get(`http://localhost:4000/products?category=${category}&_sort=${type}&_order=${sort}`);
    return res.data;
}
);



export const searchProductByName = createAsyncThunk("searchProductByName", async (name) => {
    let res = await axios.get(`http://localhost:4000/products?name_like=${name}`);
    if (name === '') {
        return { products: [] }
    } else {
        return { products: res.data }
    }
}
)

export const fetchProductsPage = createAsyncThunk(
    "fetchProductsPage",
    async (payload) => {
        const { category, page, pageSize } = payload;
        const startItem = (page - 1) * pageSize;
        try {
            let originalPage = await axios.get(`http://localhost:4000/products?category=${category}`);
            const res = await axios.get(`http://localhost:4000/products?category=${category}&_start=${startItem}&_limit=${pageSize}`);
            return { products: res.data, totalCount: originalPage.data.length };
        } catch (error) {
            throw error;
        }
    });


export const filterProductUnder500k = createAsyncThunk(
    "filterProductUnder500k",
    async () => {
        try {
            const res = await axios.get("http://localhost:4000/products");
            const filteredProducts = res.data.filter(
                (product) => product.price < 500000
            );
            return filteredProducts;
        } catch (error) {
            throw error;
        }
    }
);

const productSlice = createSlice({
    name: "product",
    initialState: {
        isLoading: false,
        listProducts: [],
        searchList: [],
        product: {},
        isError: false,
        productMessage: "",
        totalCount: 0,
        selectedPriceFilter: [],
        currentFilter: { category: "", type: "", sort: "", name: "" },
    },
    extraReducers: (builder) => {
        builder.addCase(getProductLists.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getProductLists.fulfilled, (state, action) => {
            state.isLoading = false;
            state.listProducts = [...action.payload];
        });
        builder.addCase(getProductLists.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
            state.productMessage = "Lỗi";
        });
        builder.addCase(addProduct.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(addProduct.fulfilled, (state) => {
            state.isLoading = false;
            notification("Thêm thành công!");
        });
        builder.addCase(addProduct.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
            state.message = "Error ";
            notification("Thêm thất bại!", 'error');
        });
        builder.addCase(filterProductById.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(filterProductById.fulfilled, (state, action) => {
            state.isLoading = false;
            state.listProducts = [...action.payload];
        });
        builder.addCase(filterProductById.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
            state.productMessage = "Lỗi";
        });
        builder.addCase(filterProductByCategory.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(filterProductByCategory.fulfilled, (state, action) => {
            state.isLoading = false;
            state.listProducts = [...action.payload];
        });
        builder.addCase(filterProductByCategory.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
            state.productMessage = "Lỗi";
        });
        builder.addCase(filterProductByCategoryAndSort.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(filterProductByCategoryAndSort.fulfilled, (state, action) => {
            state.isLoading = false;
            state.listProducts = [...action.payload];
        });
        
        builder.addCase(filterProductByCategoryAndSort.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
            state.productMessage = "Lỗi";
        });
        builder.addCase(fetchProductsPage.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.errorMessage = "";
        });
        builder.addCase(fetchProductsPage.fulfilled, (state, action) => {
            state.isLoading = false;
            state.listProducts = [...action.payload.products];
            state.totalCount = action.payload.totalCount;
        });
        
        builder.addCase(fetchProductsPage.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.errorMessage = action.error.message;
        });
        builder.addCase(searchProductByName.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(searchProductByName.fulfilled, (state, action) => {
            state.isLoading = false;
            state.searchList = [...action.payload.products];
        })
        builder.addCase(searchProductByName.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
            state.productMessage = 'Lỗi';
        })
        builder.addCase(deleteProduct.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(deleteProduct.fulfilled, (state) => {
            state.isLoading = false;
            notification('Xóa sản phẩm thành công!', 'success');
        });
        builder.addCase(deleteProduct.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
            state.message = "Error";
            notification('Xóa sản phẩm thất bại!', 'error');
        });
        builder.addCase(editProduct.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(editProduct.fulfilled, (state, action) => {
            state.isLoading = false;
            const updatedProduct = action.payload;
            state.listProducts = state.listProducts.map(product => (product.id === updatedProduct.id ? updatedProduct : product));
            notification("Cập nhật sản phẩm thành công", "success");
        });
        builder.addCase(editProduct.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
            state.message = 'Error';
            notification('Cập nhật sản phẩm thất bại!', 'error');
        });
        builder.addCase(filterProductUnder500k.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(filterProductUnder500k.fulfilled, (state, action) => {
            state.isLoading = false;
            state.listProducts = [...action.payload];
        });
        builder.addCase(filterProductUnder500k.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
            state.productMessage = "Lỗi";
        });
    },
});

export default productSlice.reducer;
