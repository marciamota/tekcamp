import React, { useContext, useRef, useState } from 'react';
import AppContext from '../store/app-context';
import classes from './ManagePage.module.css';

const pricePattern = /((\d+)((\.\d{1,2})?))$/;
const quantityPattern = /^[1-9]\d*$/;
const urlPattern = /[(http(s)?)://(www.)?a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/ig;

const ManagePage = () => {
    const appCtx = useContext(AppContext);

    const productNameRef = useRef('');
    const serialRef = useRef('');
    const priceRef = useRef('');
    const manufacturerRef = useRef('');
    const categoryRef = useRef('');
    const quantityRef = useRef('');
    const imageRef = useRef('');

    const [productNameError, setProductNameError] = useState(false);
    const [serialError, setSerialError] = useState(false);
    const [priceError, setPriceError] = useState(false);
    const [manufacturerError, setManufacturerError] = useState(false);
    const [categoryError, setCategoryError] = useState(false);
    const [quantityError, setQuantityError] = useState(false);
    const [imageError, setImageError] = useState(false);

    const [editMode, setEditMode] = useState(false);
    const [editItemId, setEditItemId] = useState(null);

    const removeProductHandler = (id) => {
        const updatedList = appCtx.originalProducts.filter((product) => +product.id !== +id);
        appCtx.setOriginalProducts(updatedList);
        localStorage.setItem("products", JSON.stringify(updatedList));
    };

    const clearFormErrors = () => {
        setProductNameError(false);
        setSerialError(false);
        setPriceError(false);
        setManufacturerError(false);
        setCategoryError(false);
        setQuantityError(false);
        setImageError(false);
    };

    const clearFormData = () => {
        productNameRef.current.value = "";
        serialRef.current.value = "";
        priceRef.current.value = "";
        manufacturerRef.current.value = "";
        categoryRef.current.value = "";
        quantityRef.current.value = "";
        imageRef.current.value = "";
    }
    const editModeHandler = (id) => {
        setEditMode(true);
        setEditItemId(id);
        clearFormErrors();
        const productInfo = appCtx.originalProducts.find(product => +product.id === +id);
        productNameRef.current.value = productInfo.title;
        serialRef.current.value = productInfo.serial_number;
        priceRef.current.value = productInfo.price;
        manufacturerRef.current.value = productInfo.manufacturer;
        categoryRef.current.value = productInfo.category;
        quantityRef.current.value = productInfo.available;
        imageRef.current.value = productInfo.image;
    };

    const cancelEditProductHandler = () => {
        setEditMode(false);
        setEditItemId(null);
        clearFormErrors();
        clearFormData();
    };

    const addEditProductHandler = (e) => {
        e.preventDefault();
        clearFormErrors();
        let errorsFound = false;
        if (productNameRef.current.value.length === 0) {
            setProductNameError(true);
            errorsFound = true;
        };
        if (serialRef.current.value.length === 0) {
            setSerialError(true);
            errorsFound = true;
        };
        if (!priceRef.current.value.match(pricePattern)) {
            setPriceError(true);
            errorsFound = true;
        };
        if (manufacturerRef.current.value.length === 0) {
            setManufacturerError(true);
            errorsFound = true;
        };
        if (categoryRef.current.value.length === 0) {
            setCategoryError(true);
            errorsFound = true;
        };
        if (!quantityRef.current.value.match(quantityPattern)) {
            setQuantityError(true);
            errorsFound = true;
        };
        if (!imageRef.current.value.match(urlPattern)) {
            setImageError(true);
            errorsFound = true;
        };
        if (!errorsFound) {
            const productData = {
                id: editItemId,
                title: productNameRef.current.value,
                serial_number: serialRef.current.value,
                price: priceRef.current.value,
                manufacturer: manufacturerRef.current.value,
                category: categoryRef.current.value,
                available: quantityRef.current.value,
                image: imageRef.current.value,
            };
            const productListCopy = [...appCtx.originalProducts];
            
            if (editMode) {
                const itemInfoIndex = appCtx.originalProducts.findIndex((product) => +product.id === +editItemId);
                productListCopy[itemInfoIndex] = { ...productData };
            } else {
                let newId = -1;
                for (const product of appCtx.originalProducts) {
                    if (newId < +product.id) {
                        newId = +product.id;
                    };
                };
                productData.id = newId + 1;
                productListCopy.push(productData);
            }
            appCtx.setOriginalProducts(productListCopy);
            clearFormData();
            localStorage.setItem("products", JSON.stringify(productListCopy));
        }
    };

    const itemRows = appCtx.originalProducts.map((product) => {
        return (
            <tr key={product.id}>
                <td data-label="ID">
                    {product.id}
                </td>
                <td data-label="NAME">
                    {product.title}
                </td>
                <td data-label="EDIT">
                    <button className="ui icon button" onClick={() => editModeHandler(product.id)}>
                        <i className="edit icon"></i>
                    </button>
                </td>
                <td data-label="DELETE">
                    <button className="ui icon button" onClick={() => removeProductHandler(product.id)}>
                        <i className="trash icon"></i>
                    </button>
                </td>
            </tr>
        )
    });

    return (
        <div>
            <div className="ui two column stackable grid container">
                <div className="column">
                    <table className="ui striped table">
                        <thead>
                            <tr key="header">
                                <th className='two wide'>ID</th>
                                <th className='ten wide'>NAME</th>
                                <th className='one wide'>EDIT</th>
                                <th className='one wide'>DELETE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {itemRows}
                        </tbody>
                    </table>
                </div>
                <div className="column">
                    <form className="ui form" onSubmit={addEditProductHandler}>
                        <h1>{editMode ? "Edit Product" : "Add Product"}</h1>
                        <div className="field">
                            <label>Name</label>
                            <input type="text" placeholder="Name" ref={productNameRef} />
                            {productNameError && <p className={classes.errorMessage}>Add a valid name</p>}
                        </div>
                        <div className="field">
                            <label>Serial Number</label>
                            <input type="text" placeholder="00000" ref={serialRef} />
                            {serialError && <p className={classes.errorMessage}>Add a serial number</p>}
                        </div>
                        <div className="field">
                            <label>Price</label>
                            <input type="number" placeholder="00.00" ref={priceRef} step="0.01" />
                            {priceError && <p className={classes.errorMessage}>Add a valid price</p>}
                        </div>
                        <div className="field">
                            <label>Manufacturer</label>
                            <input type="text" placeholder="manufacturer" ref={manufacturerRef} />
                            {manufacturerError && <p className={classes.errorMessage}>Add a valid manufacturer</p>}
                        </div>
                        <div className="field">
                            <label>Category</label>
                            <input type="text" placeholder="category" ref={categoryRef} />
                            {categoryError && <p className={classes.errorMessage}>Add a category</p>}
                        </div>
                        <div className="field">
                            <label>Quantity</label>
                            <input type="number" placeholder="0" ref={quantityRef} />
                            {quantityError && <p className={classes.errorMessage}>Add a valid quantity</p>}
                        </div>
                        <div className="field">
                            <label>Product Image</label>
                            <input type="url" placeholder="product image" ref={imageRef} />
                            {imageError && <p className={classes.errorMessage}>Add a valid image url</p>}
                        </div>
                        <button className="ui button" type="submit">
                            {editMode ? "Edit Product" : "Add Product"}
                        </button>
                        {
                            editMode &&
                            <button className="ui button" type="button" onClick={cancelEditProductHandler}>
                                Cancel Edit
                            </button>
                        }
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ManagePage;