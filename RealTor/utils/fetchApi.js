import axios from "axios";

export const baseUrl = "https://bayut.p.rapidapi.com";


export const fetchApi = async (url) => {
  const {data} = await axios.get(url, {
		headers: {
			"X-RapidAPI-Key": "aa90f9069dmsh77129c141cac057p10e255jsn3b7b6110ee58",
			"X-RapidAPI-Host": "bayut.p.rapidapi.com",
		},
	});

  return data
}