import { useEffect, useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router";
import Home from "./Routes/HomePage";
import Profile from "./Routes/Profile";

function App() {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    district: "",
    province: "",
    country: "Nepal",
  });
  const [allInfo, setAllInfo] = useState([]);
  const [editContent, setEditContent] = useState({});
  useEffect(() => {
    const storedAllInfo = localStorage.getItem("allInfo");
    if (storedAllInfo) {
      setAllInfo(JSON.parse(storedAllInfo));
    }
    console.log("fetched items", storedAllInfo);
  }, []);
  useEffect(() => {
    const saveToLocal = () => {
      localStorage.setItem("allInfo", JSON.stringify(allInfo));
      console.log("stored items", allInfo);
    };
    if (allInfo.length > 0) {
      saveToLocal();
    }
  }, [allInfo]);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              userInfo={userInfo}
              setUserInfo={setUserInfo}
              allInfo={allInfo}
              setAllInfo={setAllInfo}
              editContent={editContent}
              setEditContent={setEditContent}
            />
          }
        ></Route>
        <Route
          path="/profiles"
          element={
            <Profile
              allInfo={allInfo}
              setAllInfo={setAllInfo}
              editContent={editContent}
              setEditContent={setEditContent}
            />
          }
        ></Route>
      </Routes>
    </>
  );
}

export default App;