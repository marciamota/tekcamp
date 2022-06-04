import { useState } from "react";
import AppContext from "./app-context";

const AppProvider = props => {
    const [cart, setCart] = useState([]);
    const [cartItemsCount, setCartItemsCount] = useState(0);
    const clearCartHandler = () => { };
    const updateCartHandler = (id, action) => {
        console.log("test")
        // make a copy of cart and originalProducts
        const cartCopy = [...cart];
        // const originalProductsCopy = [...originalProducts];

        // find if the added item already exist in the cart
        let itemInCartIndex = cartCopy.findIndex((item) => {
            return item.productId == id;
        });

        // find the index of the added item in the original products array
        // let originalProductsIndex = originalProducts.findIndex((item) => {
        //     return item.id == id;
        // });

        if (action === "increment") {
            // reduce the availble quantity by 1
            // originalProductsCopy[originalProductsIndex].available--;
            // setOriginalProducts(originalProductsCopy);
            // increase cart quantity or add to cart
            if (itemInCartIndex != -1) {
                // if the added item exist in the cart then increase its quantity by 1
                cartCopy[itemInCartIndex].quantity++;
            } else {
                // if item is not yet in the cart then add it to the cart
                cartCopy.push({ productId: id, quantity: 1 });
            }
            setCartItemsCount(cartItemsCount + 1);
            setCart(cartCopy);
        } else {
            // increase the availble quantity by 1
            //   originalProductsCopy[originalProductsIndex].available++;
            //   setOriginalProducts(originalProductsCopy);
            cartCopy[itemInCartIndex].quantity--;
            setCartItemsCount(cartItemsCount - 1);
            setCart(cartCopy);
        }
    };

    const appContext = {
        user: null,
        setUser: (user) => { },
        isAdmin: false,
        setIsAdmin: (isAdmin) => { },
        loading: false,
        setLoading: (loading) => { },
        originalProducts: [],
        setOriginalProducts: (originalProducts) => { },
        products: [],
        setProducts: (products) => { },
        cart: cart,
        cartItemsCount: cartItemsCount,
        clearCart: clearCartHandler,
        updateCart: updateCartHandler,
    }

    return (
        <AppContext.Provider value={appContext}>
            {props.children}
        </AppContext.Provider>
    )
};

export default AppProvider;