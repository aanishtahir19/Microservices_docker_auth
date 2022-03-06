import axios from './AxiosConfig';
export default async function (body) {
  try {
    const { data } = await axios.post('/auth/googleLogin', body);
    return { data };
  } catch (error) {
    return { error };
  }
}
