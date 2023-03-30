import axios from './axios';
import { refreshToken } from './Urls';
// import { useNavigate } from 'react-router-dom';


export const GuideRefreshToken = async (navigate) => {

    
    console.log('testing')

  try {
    const authTokens = JSON.parse(localStorage.getItem('guide_authTokens'));
    const refresh = authTokens?.refresh;

    if (refresh) {
      const response = await axios.post(refreshToken, {
        refresh: refresh,
      });

      if (response.status === 200) {
        const data = response.data;
        localStorage.setItem('guide_authTokens', JSON.stringify(data));
        
      }
      else{
        localStorage.removeItem('guide_authTokens');
        localStorage.removeItem('guide_prevUrl');
        navigate('/guide')
      }
    }
  } catch (error) {
        localStorage.removeItem('guide_authTokens');
        localStorage.removeItem('guide_prevUrl');
        navigate('/guide')
    }
};
