import React from "react";

const ItemList = ( {items, isLoading} ) => {
    return (
        <div>
            {
                isLoading && "....로딩중"
            }
            {
                items && items.map((item, index) => {
                    return <div key={index}>{item.first_name}</div>
                })
            }
        </div>
    )
}

export default ItemList