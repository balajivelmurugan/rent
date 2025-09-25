import {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import axios from "axios";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  const refreshList = useCallback(() => {
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_API}/tenants`)
      .then((res) => {
        // For demo, store only names
        setList(res.data.map((user) => user));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    // Example API call
    refreshList();
  }, [refreshList]); // Runs only once on initial load

  return (
    <DataContext.Provider value={{ list, setList, loading, refreshList }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
