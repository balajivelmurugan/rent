import { createContext, useState, useContext, useEffect } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Example API call
    fetch(`${process.env.REACT_APP_API}/rents`)
      .then((res) => res.json())
      .then((data) => {
        // For demo, store only names
        setList(data.map((user) => user));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch:", err);
        setLoading(false);
      });
  }, []); // Runs only once on initial load

  return (
    <DataContext.Provider value={{ list, setList, loading }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
