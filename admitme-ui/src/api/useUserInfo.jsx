import { useState, useEffect } from "react";
import axios from "axios";

import { appConfig } from "../config";

export default function useUserInfo(code) {
  const [userInfo, setUserInfo] = useState("loading");

  useEffect(() => {

    if (sessionStorage.getItem("userdata") === null) {
      getUserInfo(code);
    } else {
      // There is already user data stored
      setUserInfo(JSON.parse(sessionStorage.getItem("userdata")));
    }

    async function getUserInfo(code) {
      try {
        const corsURL = process.env.REACT_APP_BACKEND_URL;
          
        if (!code) {
          console.log("No code");
          setUserInfo(null);
        } else {
          const response = await axios.post(corsURL, {
            code: code,
            redirectUri: appConfig.redirectUri,
          });

          console.log("response: ", response);
          if (response.status === 200) {
            sessionStorage.setItem(
              "userdata",
              JSON.stringify(response.data.result)
            );
            setUserInfo(response.data.result);
          } else {
            setUserInfo(null);
          }
        }
      } catch (error) {
        setUserInfo(null);
      }
    }
    
  }, [code]);

  return userInfo;
}
