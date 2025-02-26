import { useMemo, useState } from "react"

import Test1Item from "./Test1Item";
import { stack_items } from "../../assets/data/stack_items";

const Test1 = () => {
    const [filter, setFilter] = useState({
        search: "",
        category: "all",
        sort: "none"
    });
    console.log(filter);

    const filteredItems = useMemo(() => {
        return stack_items.filter((item) => {
            if (filter.search) {
                return item.name.toLowerCase().includes(filter.search.toLowerCase())
            }
            return true;
        }).filter((item) => {
            if (filter.category !== "all") {
                return item.category === filter.category;
            };
            return true;
        }).sort((a, b) => {
            if (filter.sort === 'asc') {
                return a.name.localeCompare(b.name);
            } else if (filter.sort === 'desc') {
                return b.name.localeCompare(a.name);
            }
            return 0;
        })
    }, [filter])



    return (
        <div>
            <div className="py-5">
                {/* Search Input */}
                <input value={filter.search} onChange={(e) => setFilter({ ...filter, search: e.target.value })}
                    type="text" placeholder="Search..." className="input focus:outline-none mr-3" />

                {/* Category Dropdown */}
                <select value={filter.category} className="select focus:outline-none mr-3"
                    onChange={(e) => setFilter({ ...filter, category: e.target.value })}>
                    <option value="all">All</option>
                    <option value="frontend">frontend</option>
                    <option value="backend">backend</option>
                </select>

                {/* Sorting Dropdown */}
                <select value={filter.sort} className="select focus:outline-none mr-3"
                    onChange={(e) => setFilter({ ...filter, sort: e.target.value })}>
                    <option value="none">None</option>
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
            </div>

            {/* Filtered Results */}
            <h3 className="font-bold text-2xl">Filtered Results</h3>
            <div className="grid grid-cols-3 gap-5 py-5">
                {
                    filteredItems.map((item) => (
                        <Test1Item key={item.id} item={item}></Test1Item>
                    ))
                }
            </div>
        </div >
    )
}

export default Test1