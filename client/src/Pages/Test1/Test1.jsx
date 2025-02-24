import { useState } from "react"
import { items } from "./items";
import Test1Item from "./Test1Item";

const Test1 = () => {
    const [filter, setFilter] = useState({
        search: "",
        category: "all",
        sort: "none"
    });

    return (
        <div className="grid grid-cols-3 gap-5 py-5">           
            {
                items.map((item) => (
                    <Test1Item key={item.id} item={item}></Test1Item>
                ))
            }
        </div>
    )
}

export default Test1