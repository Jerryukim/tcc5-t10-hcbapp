async function getUsers() {
  const res = await fetch("http://localhost:3000/api/users", {
    cache: "no-store",
  });

  return res.json();
}

export default async function Dashboard() {
  const users = await getUsers();

  return (
    <div>
      <h1>Doctors Dashboard</h1>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Specialty</th>
            <th>Role</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user:any) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.specialty}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}