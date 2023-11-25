
function CartItemCheckout({ item }) {
    return (
        <tr>
            <td class="py-2 ">{item.name}</td>
            <td class="py-2 text-center w-8">{item.quantity}</td>
            <td class="py-2 text-center text-primary">{parseFloat(item.price * item.quantity).toLocaleString().replace(/,/g, '.')}đ</td>
        </tr>
    );
}

export default CartItemCheckout;
