import axios from "axios";

const baseURL = "http://localhost:5000";

export const generateEquation = async (
  image: FormData
): Promise<TGenerateEquationResponse> => {
  const { data } = await axios.post(`${baseURL}/generateEquation`, image, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data as TGenerateEquationResponse;
};

export const solve = async () => {
  await axios.post(`${baseURL}/solve`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
