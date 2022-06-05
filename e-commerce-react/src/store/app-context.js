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

export default AppContext;