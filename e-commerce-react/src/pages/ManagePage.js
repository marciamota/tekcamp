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
                    <button class="ui icon button" onClick={editProductHandler}>
                        <i class="edit icon"></i>
                    </button>
                </td>
                <td data-label="DELETE">
                    <button class="ui icon button" onClick={removeProductHandler}>
                        <i class="trash icon"></i>
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
                <div className="column">C2</div>
            </div>
        </div>
    )
}

export default ManagePage;