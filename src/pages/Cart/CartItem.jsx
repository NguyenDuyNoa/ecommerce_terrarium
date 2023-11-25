import { Divider } from "@mui/material";

function CartItem({ item, handleIncrease, handleDecrease, handleRemove }) {
    return (
        <tr>
            <td class="py-4">
                <div class="flex items-center">
                    <img
                        class="h-16 w-16 mr-4 rounded-md"
                        src={item.img}
                        alt={item.name}
                    />
                    <span class="font-semibold">{item.name}</span>
                </div>
            </td>
            <td class="py-4 text-center text-primary">{parseFloat(item.price).toLocaleString().replace(/,/g, '.')}đ</td>
            <td class="py-4 ">
                <div class="flex items-center justify-center">
                    <button
                        class="border rounded-md py-2 px-4 mr-2"
                        onClick={handleDecrease}
                    >
                        -
                    </button>
                    <span class="text-center w-8">{item.quantity}</span>
                    <button
                        class="border rounded-md py-2 px-4 ml-2"
                        onClick={handleIncrease}
                    >
                        +
                    </button>
                </div>
            </td>
            <td class="py-4 text-center text-primary">{parseFloat(item.price * item.quantity).toLocaleString().replace(/,/g, '.')}đ</td>
            <Divider />
        </tr>
    );
}

export default CartItem;
