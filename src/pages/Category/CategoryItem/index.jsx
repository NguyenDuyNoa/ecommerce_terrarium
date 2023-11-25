import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from "@mui/material";
import Sidebar from "../../../components/Sidebar";
import ProductItem from "../../../components/Product/ProductItem";
import { fetchProductsPage, filterProductByCategoryAndSort } from "../../../redux/slices/productSlice";

const CategoryItem = ({ name, type }) => {
    const [sort, setSort] = useState("");
    const { listProducts, totalCount } = useSelector((state) => state.product);
    const [currentPage, setCurrentPage] = useState(1);
    const dispatch = useDispatch();

    const pageSize = 12;
    const totalPages = Math.ceil(totalCount / pageSize);

    const fetchData = () => {
        const filterOptions = { category: type, page: currentPage, pageSize: pageSize };
        dispatch(fetchProductsPage(filterOptions));
    };

    const handleSortOptionChange = (option) => {
        setSort(option);
        setCurrentPage(1);
    };

    const handlePageChange = (event, newPage) => {
        setCurrentPage(newPage);
        fetchData();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        setSort("");
        setCurrentPage(1);
        fetchData();
    }, [type]);

    useEffect(() => {
        if (sort === "nameAsc") {
            dispatch(filterProductByCategoryAndSort({ category: type, type: "name", sort: "asc" }));
        } else if (sort === "nameDesc") {
            dispatch(filterProductByCategoryAndSort({ category: type, type: "name", sort: "desc" }));
        } else if (sort === "priceAsc") {
            dispatch(filterProductByCategoryAndSort({ category: type, type: "price", sort: "asc" }));
        } else if (sort === "priceDesc") {
            dispatch(filterProductByCategoryAndSort({ category: type, type: "price", sort: "desc" }));
        } else {
            fetchData();
        }
    }, [type, sort, currentPage, dispatch]);

    return (
        <div>
            <hr className=" mb-4" />
            <div className=" mx-36 flex">
                <Sidebar />
                <div className=" ml-5 w-full">
                    <h2 className=" text-xl font-semibold mb-2">Terrarium | Nghệ Thuật Terrarium | Cây trồng trong lọ thủy tinh {name}</h2>
                    <hr />
                    <div className="flex items-center my-2">
                        <h4>Xếp theo :</h4>
                        <span className="flex items-center">
                            <input
                                type="radio"
                                className="mr-2 ml-4 w-5 h-5"
                                checked={sort === "nameAsc"}
                                onChange={() => handleSortOptionChange("nameAsc")}
                            />
                            Tên A - Z
                        </span>
                        <span className="flex items-center">
                            <input
                                type="radio"
                                className="mr-2 ml-4 w-5 h-5"
                                checked={sort === "nameDesc"}
                                onChange={() => handleSortOptionChange("nameDesc")}
                            />
                            Tên Z - A
                        </span>
                        <span className="flex items-center">
                            <input
                                type="radio"
                                className="mr-2 ml-4 w-5 h-5"
                                checked={sort === "priceAsc"}
                                onChange={() => handleSortOptionChange("priceAsc")}
                            />
                            Giá thấp đến cao
                        </span>
                        <span className="flex items-center">
                            <input
                                type="radio"
                                className="mr-2 ml-4 w-5 h-5"
                                checked={sort === "priceDesc"}
                                onChange={() => handleSortOptionChange("priceDesc")}
                            />
                            Giá cao đến thấp
                        </span>
                    </div>
                    <hr className=" mb-4" />
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-5">
                        {listProducts.length > 0 &&
                            listProducts.map((item, index) => {
                                return <ProductItem item={item} key={index} height={64} />;
                            })}
                    </div>
                    <div className=" flex justify-center mb-4">
                        <Pagination
                            page={currentPage}
                            count={totalPages}
                            onChange={handlePageChange}
                            color="primary"
                            sx={{
                                '& .Mui-selected': {
                                    backgroundColor: 'lightblue',
                                    color: 'white',
                                },
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryItem;
