import ItemList from "../components/ItemList"
import { useDispatch, useSelector } from "react-redux"
import React, { useEffect } from "react"
import { fetchItemList, FETCH_ITEM_LIST } from "../modules/item"


const ItemListContainer = () => {

    const dispatch = useDispatch()
    const { items, isLoading } = useSelector(({ item, loading }) => ({
        items: item.items,
        isLoading: loading[FETCH_ITEM_LIST]
    }))

    useEffect(() => {
        dispatch(fetchItemList())
    }, [dispatch])

    return (
        <ItemList items={items} isLoading={isLoading} />
    )
}

export default ItemListContainer