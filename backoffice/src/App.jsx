import "./App.css";
import Users from "./components/users";

function App() {
  return (
    <>
      <div className="min-h-full">
        <main>
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <Users />
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
