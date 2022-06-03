import React, { Fragment } from 'react';

const ManagePage = (props) => {
    const removeProductHandler = () => {
        // to do 
    };
    const editProductHandler = () => {
        // to do 
    };

    const itemRows = props.productList.map((product) => {
        return (
            <tr key={product.id}>
                <td data-label="ID">
                    {product.id}
                </td>
                <td data-label="NAME">
                    {product.title}
                </td>
                <td data-label="EDIT">
                    <button className="ui icon button" onClick={editProductHandler}>
                        <i className="edit icon"></i>
                    </button>
                </td>
                <td data-label="DELETE">
                    <button className="ui icon button" onClick={removeProductHandler}>
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
                    <form className="ui form">
                        <h1>Add Product</h1>
                        <div className="field">
                            <label>Name</label>
                            <input type="text" placeholder="Name" />
                        </div>
                        <div className="field">
                            <label>Serial Number</label>
                            <input type="text" placeholder="00000" />
                        </div>
                        <div className="field">
                            <label>Price</label>
                            <input type="number" placeholder="00.00" />
                        </div>
                        <div className="field">
                            <label>Manufacturer</label>
                            <input type="text" placeholder="manufacturer" />
                        </div>
                        <div className="field">
                            <label>Category</label>
                            <input type="text" placeholder="category" />
                        </div>
                        <div className="field">
                            <label>Quantity</label>
                            <input type="number" placeholder="0" />
                        </div>
                        <div className="field">
                            <label>Product Image</label>
                            <input type="url" placeholder="product image" />
                        </div>
                        <button className="ui button" type="submit">Add Product</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ManagePage;