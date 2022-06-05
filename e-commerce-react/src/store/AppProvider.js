import { useState, useRef, useEffect } from "react";
import AppContext from "./app-context";
import data from '../resources/products.json';

const AppProvider = props => {
    const firstRun = useRef(true);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [originalProducts, setOriginalProducts] = useState([]);
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [cartItemsCount, setCartItemsCount] = useState(0);

    const clearCartHandler = () => {
        setCart([]);
        setCartItemsCount(0);
    };
    const updateCartHandler = (id, action) => {
        // make a copy of cart and originalProducts
        const cartCopy = [...cart];
        const originalProductsCopy = [...originalProducts];

        // find if the added item already exist in the cart
        let itemInCartIndex = cartCopy.findIndex((item) => {
            return item.productId == id;
        });

        // find the index of the added item in the original products array
        let originalProductsIndex = originalProducts.findIndex((item) => {
            return item.id == id;
        });

        if (action === "increment") {
            // reduce the availble quantity by 1
            originalProductsCopy[originalProductsIndex].available--;
            setOriginalProducts(originalProductsCopy);
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
            originalProductsCopy[originalProductsIndex].available++;
            setOriginalProducts(originalProductsCopy);
            cartCopy[itemInCartIndex].quantity--;
            setCartItemsCount(cartItemsCount - 1);
            setCart(cartCopy);
        }
    };

    useEffect(() => {
        if (firstRun.current) {
            firstRun.current = false;
            const savedData = JSON.parse(localStorage.getItem("products"));
            if (savedData) {
                setOriginalProducts(savedData);
            } else {
                setOriginalProducts(data);
                localStorage.setItem("products", JSON.stringify(data));
            }
            setLoading(false);
            const userName = localStorage.getItem("user");
            if (userName) {
                const isAdmin = localStorage.getItem("isAdmin");
                setUser(userName);
                setIsAdmin(isAdmin === "true")
            }
        }
    }, []);

    useEffect(() => {
        if (!firstRun.current) {
            setProducts(originalProducts);
        }
    }, [originalProducts]);

    const appContext = {
        user: user,
        setUser: setUser,
        isAdmin: isAdmin,
        setIsAdmin: setIsAdmin,
        loading: loading,
        setLoading: setLoading,
        originalProducts: originalProducts,
        setOriginalProducts: setOriginalProducts,
        products: products,
        setProducts: setProducts,
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