import axios from './axios';
import { refreshToken } from './Urls';


export const UserRefreshToken = async (setIsLoggedIn) => {


  try {
    const user_authTokens = JSON.parse(localStorage.getItem('user_authTokens'));
    const refresh = user_authTokens?.refresh;

    if (refresh) {
      const response = await axios.post(refreshToken, {
        refresh: refresh,
      });

      if (response.status === 200) {
        const data = response.data;
        localStorage.setItem('user_authTokens', JSON.stringify(data));
      }
      else{
        setIsLoggedIn(false)
      }
    }
  } catch (error) {
    setIsLoggedIn(false)
  }
};