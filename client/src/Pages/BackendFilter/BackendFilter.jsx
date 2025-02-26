import { useMemo, useReducer } from "react"
import { items } from "../Test1/items";
import Test1Item from "../Test1/Test1Item";


const initialState = {
    search: "",
    category: "all",
    sort: "none"
}

const filterReducer = (state, action) => {
    switch (action.type) {
        case "SET_SEARCH":
            return { ...state, search: action.payload };

        case "SET_CATEGORY":
            return { ...state, category: action.payload };

        case "SET_SORT":
            return { ...state, sort: action.payload };

        default:
            return state;
    }
};



const BackendFilter = () => {
    const [filter, dispatch] = useReducer(filterReducer, initialState);

    const filteredItems = useMemo(() => {
        return items.filter((item) => {
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
                <input value={filter.search}
                    onChange={(e) => dispatch({ type: "SET_SEARCH", payload: e.target.value })}
                    type="text" placeholder="Search..." className="input focus:outline-none mr-3" />

                {/* Category Dropdown */}
                <select value={filter.category} className="select focus:outline-none mr-3"
                    onChange={(e) => dispatch({ type: "SET_CATEGORY", payload: e.target.value })}>
                    <option value="all">All</option>
                    <option value="frontend">frontend</option>
                    <option value="backend">backend</option>
                </select>

                {/* Sorting Dropdown */}
                <select value={filter.sort} className="select focus:outline-none mr-3"
                    onChange={(e) => dispatch({ type: "SET_SORT", payload: e.target.value })}>
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

export default BackendFilter