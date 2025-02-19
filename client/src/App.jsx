import { useEffect, useState } from 'react';
import axios from "axios"
import './App.css'

function App() {
  const [data, setData] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/orders");
        setData(JSON.stringify(response.data));
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <div>{data}</div>
    </>
  )
}

export default App
