import { useReducer } from "react"
import useDebounce from "../../hooks/useDebounce";
// import { stack_items } from "../../assets/data/stack_items";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../../Shared/Loading/LOading";


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
    // const [items, setItems] = useState([]);

    // debounced search input
    const debouncedSearch = useDebounce(filter.search, 500);

    const { data: items = [], isLoading, error } = useQuery({
        queryKey: ['items', { search: debouncedSearch, category: filter.category, sort: filter.sort }],
        queryFn: async () => {
            const query = new URLSearchParams({
                search: debouncedSearch,
                category: filter.category,
                sort: filter.sort
            })
            const res = await axios.get(`http://localhost:5011/api/items?${query}`);
            return res.data;
        },
        keepPreviousData: true,
        staleTime: 1000 * 60 * 5
    });

    console.log(filter);
    console.log(items);


    // Frontend filter code with useMemo
    // const filteredItems = useMemo(() => {
    //     return stack_items.filter((item) => {
    //         if (debouncedSearch) {
    //             return item.name.toLowerCase().includes(debouncedSearch.toLowerCase())
    //         }
    //         return true;
    //     }).filter((item) => {
    //         if (filter.category !== "all") {
    //             return item.category === filter.category;
    //         };
    //         return true;
    //     }).sort((a, b) => {
    //         if (filter.sort === 'asc') {
    //             return a.name.localeCompare(b.name);
    //         } else if (filter.sort === 'desc') {
    //             return b.name.localeCompare(a.name);
    //         }
    //         return 0;
    //     })
    // }, [debouncedSearch, filter.category, filter.sort])


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

            {/* Loading & Error Handling */}
            {isLoading && <Loading></Loading>}
            {error && <p>Error fetching data </p>}

            {/* Filtered Results */}
            <h3 className="font-bold text-2xl">Filtered Results</h3>
            <ul className="grid grid-cols-3 gap-5 py-5">
                {
                    items.map((item) => (
                        <li key={item._id} className="p-5 bg-slate-100 rounded-md"
                        >{item.id} {item.name} <br></br> {item.category}</li>
                    ))
                }
            </ul>
        </div >
    )
}

export default BackendFilter