import { useEffect, useState } from "react";

export default function Dashboard() {
    /*på dashboard kan bruker logge inn ved å sette staten signedIn til true
    dette blir gjort med funksjonen handleclick. hvis bruker er logget inn 
    får de opp en overskrift dashboard og en knapp til å logge ut */
  const [userLogin, setUserLogin] = useState({});
  const [error, setError] = useState("");
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("login") === "true";
    if (isLoggedIn) {
        setSignedIn(true);
    }
  }, []);

  const handleChange = (e) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;
    setUserLogin((prev) => ({ ...prev, [inputName]: inputValue }));
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (userLogin.username) {
        setSignedIn(true);
        sessionStorage.setItem("login", "true");
        setError("")
    } else {
        setError("du må skrive inn brukernavn")
    }
  };

  const handleLogout = () => {
    sessionStorage.setItem("login", false);
    setSignedIn(false);
  };

  return (
    <>
      {signedIn ? (
        <>
          <button onClick={handleLogout}>Logg ut</button>
          <h1>Min side</h1>
        </>
      ) : (
        <>
          <h1>Logg inn</h1>
          <form>
            <label htmlFor="username">Brukernavn</label>
            <input
              type="text"
              id="username"
              placeholder="ulrikw"
              name="username"
              onChange={handleChange}
            />
            <button onClick={handleClick}>Logg inn</button>
          </form>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </>
      )}
    </>
  );
}
