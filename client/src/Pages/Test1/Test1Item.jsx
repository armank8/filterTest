/* eslint-disable react/prop-types */

const Test1Item = ({ item }) => {
    const { id, name, category } = item;
    return (
        <div className="card w-96 bg-base-100 card-xs shadow-sm">
            <div className="card-body">
                <h2 className="card-title">{id}</h2>
                <p>{name}</p>
                <p>{category}</p>
            </div>
        </div>
    )
}

export default Test1Item