import axios from './axios';
import { refreshToken } from './Urls';
// import { useNavigate } from 'react-router-dom';


export const RefreshToken = async (navigate) => {


  try {
    const authTokens = JSON.parse(localStorage.getItem('authTokens'));
    const refresh = authTokens?.refresh;

    if (refresh) {
      const response = await axios.post(refreshToken, {
        refresh: refresh,
      });

      if (response.status === 200) {
        const data = response.data;
        localStorage.setItem('authTokens', JSON.stringify(data));
      }
      else{
        console.log('admin')
        navigate('/admin')
      }
    }
  } catch (error) {
    navigate('/admin')
  }
};
