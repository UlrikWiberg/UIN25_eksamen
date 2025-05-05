export default function SearchForm({ setSearch, handleClick }){
    const handleChange = (e) => {
        setSearch(e.target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
    };
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="search">Søk her</label>
            <input type="search" id="search" onChange={handleChange}></input>
            <button onClick={handleClick}>Søk</button>
        </form>
    )
}