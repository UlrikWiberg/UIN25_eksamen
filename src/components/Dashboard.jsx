export default function Dashboard(){
    return (
        <>
        <button>Logg ut</button>
        <h1>Dashboard</h1>
        <form>
            <label htmlFor="username">Brukernavn</label>
            <input type="username" id="username" placeholder="ulrikw" />
            <button type="submit">Logg inn</button>
        </form>
        </>
    )
}