export default function FilterForm() {
    return (
        <form>
            <label htmlFor="date">Dato:</label>
            <input type="date" id="date" />
            <label htmlFor="country">Land:</label>
            <option id="country">Velg et land</option>
            <label htmlFor="city">By:</label>
            <option id="city">Velg en by</option>
            <button>Filtrer</button>
        </form>
    )
}