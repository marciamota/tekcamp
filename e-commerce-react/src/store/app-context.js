import React from "react";

const AppContext = React.createContext({
    user: null,
    setUser: (user) => {},
    isAdmin: false,
    setIsAdmin: (isAdmin) => {},
    loading: false,
    setLoading: (loading) => {},
    originalProducts: [],
    setOriginalProducts: (originalProducts) => {},
    products: [],
    setProducts: (products) => {},
    cart: [],
    cartItemsCount: 0,
    clearCart: () => {},
    updateCart: (id, action) => {},
});

// const [originalProducts, setOriginalProducts] = useState([]);
// const [products, setProducts] = useState([]);
// const [cart, setCart] = useState([]);
// const [loading, setLoading] = useState(true);
// const [user, setUser] = useState(null);
// const [isAdmin, setIsAdmin] = useState(false);

export default AppContext;