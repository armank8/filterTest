import { useState } from "react"
import { items } from "./items";
import Test1Item from "./Test1Item";

const Test1 = () => {
    const [filter, setFilter] = useState({
        search: "n",
        category: "all",
        sort: "none"
    });
    console.log(filter);

    return (
        <div>
            <div className="py-5">
                {/* Search Input */}
                <input value={filter.search} onChange={(e) => setFilter({ ...filter, search: e.target.value })}
                    type="text" placeholder="Search..." className="input focus:outline-none mr-3" />

                {/* Category Dropdown */}
                <select value={filter.category} className="select focus:outline-none mr-3"
                    onChange={(e) => setFilter({ ...filter, category: e.target.value })}>
                    <option disabled={true} value="all">All</option>
                    <option value="frontend">frontend</option>
                    <option value="backend">backend</option>
                </select>

                {/* Sorting Dropdown */}
                <select value={filter.sort} className="select focus:outline-none mr-3"
                    onChange={(e) => setFilter({ ...filter, sort: e.target.value })}>
                    <option disabled={true} value="none">None</option>
                    <option value="ascending">Ascending</option>
                    <option value="descending">Descending</option>
                </select>
            </div>

            {/* Filtered Results */}
            <h3 className="font-bold text-2xl">Filtered Results</h3>
            <div className="grid grid-cols-3 gap-5 py-5">
                {
                    items.map((item) => (
                        <Test1Item key={item.id} item={item}></Test1Item>
                    ))
                }
            </div>
        </div >
    )
}

export default Test1