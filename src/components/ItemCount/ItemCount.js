import React, { useEffect } from 'react'
import './styles.css';

function ItemCount({ initial, min, max, count, setCount }) {

    const countAdd = () => { if (max > count) setCount(count + 1) }

    const countRest = () => { if (min < count) setCount(count - 1) }

    useEffect(() => {
        if (initial) {
            setCount(initial)
        } else {
            setCount(1)
        }
    }, [initial, setCount])

    return (
        <div className="boxSimbolos">
            <i onClick={countRest} className="fas fa-minus simbolo"></i>
            {count}
            <i onClick={countAdd} className="fas fa-plus simbolo"></i>
        </div>
    )
}

export default ItemCount;