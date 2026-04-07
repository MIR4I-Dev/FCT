import UserCard from "./components/UserCard";
import { useState, useEffect } from "react";

interface User {
  id: number;
  name: string;
  age: number;
}

interface Error {
  message: string;
}

const App = () => {
  const [users, setUsers] = useState<User[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetch("/api/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      {users && users.length > 0 && (
        <div className="app">
          {users.map((user) => (
            <UserCard key={user.id} name={user.name} age={user.age} />
          ))}
        </div>
      )}
      {users && users.length === 0 && <div>No hay usuarios</div>}
      {loading && <div>Loading...</div>}
      {error && <div>{error.message}</div>}
    </>
  );
};

export default App;
