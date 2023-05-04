import { api, requestConfig } from "../utils/config";

// Register a user
const register = async (data) => {
  const config = requestConfig("POST", data);

  try {
    const res = await fetch(api + "/users/register", config);

    console.log(res);

    if (res) {
      localStorage.setItem("user", JSON.stringify(await res.json()));
    }

    return res.json()
  } catch (error) {
    console.log("error", error);
  }
};

// Logout a user
const logout = () => {
  localStorage.removeItem("user");
};

// Sign in a user
const login = async (data) => {
  const config = requestConfig("POST", data);

  try {
    const res = await fetch(api + "/users/login", config); // foi removido o then, não havia necessidade se o metodo ja é assincrono


    if (res) {
      //salvando no localstorage o valor correto
      localStorage.setItem("user", JSON.stringify(await res.json()));
    }
    // a chamada do metodo precisava ser assim, pq senão vc não iria decodificar a resposta por estar vindo em um stream
    return res.json(); // o metodo de login precisa retornar alguma coisa para o slicer, só assim ele mostra o erro
  } catch (error) {
    console.log("erro", error);
  }
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
