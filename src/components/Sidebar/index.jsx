
const Sidebar = () => {

    return (
        <div className=" flex mb-5 ">
            <div>
                <div className=" bg-primary text-white flex justify-center items-center p-2 uppercase text-base font-bold mb-2">Bộ lọc</div>
                <div className=" w-64 p-1 border-dashed border-[#e6e6e6] border">
                    <h3 className=" p-2 uppercase text-base font-semibold">Giá sản phẩm</h3>
                    <hr className="border-dashed border-[#e6e6e6]" />
                    <div className="p-2">
                        <ul className="mb-2">
                            <li className="py-2">
                                <label className="text-[#6f6f6f]">
                                    <input
                                        id="under-500k"
                                        className="mx-1"
                                        type="checkbox"
                                    />
                                    Giá dưới 500.000đ
                                </label>
                            </li>
                            <li className="py-2">
                                <label className=" text-[#6f6f6f]">
                                    <input className=" mx-1" type="checkbox" />
                                    500.000đ - 1.000.000đ
                                </label>
                            </li>
                            <li className="py-2">
                                <label className=" text-[#6f6f6f]">
                                    <input className=" mx-1" type="checkbox" />
                                    1.000.000đ - 2.000.000đ
                                </label>
                            </li>
                            <li className="py-2">
                                <label className=" text-[#6f6f6f]">
                                    <input className=" mx-1" type="checkbox" />
                                    2.000.000đ - 5.000.000đ
                                </label>
                            </li>
                        </ul>
                        <hr className="border-dashed border-[#e6e6e6]" />
                        <h3 className="py-2 uppercase text-base font-semibold">Kích thước bình</h3>
                        <hr className="border-dashed border-[#e6e6e6]" />
                        <ul>
                            <li className="py-2">
                                <label className=" text-[#6f6f6f]">
                                    <input className=" mx-1" type="checkbox" />
                                    Dưới 20cm
                                </label>
                            </li>
                            <li className="py-2">
                                <label className=" text-[#6f6f6f]">
                                    <input className=" mx-1" type="checkbox" />
                                    Dưới 40cm
                                </label>
                            </li>
                            <li className="py-2">
                                <label className=" text-[#6f6f6f]">
                                    <input className=" mx-1" type="checkbox" />
                                    Dưới 60cm
                                </label>
                            </li>
                            <li className="py-2">
                                <label className=" text-[#6f6f6f]">
                                    <input className=" mx-1" type="checkbox" />
                                    Trên 60cm
                                </label>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default Sidebar;
