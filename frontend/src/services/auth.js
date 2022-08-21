import axios from "axios";

const API_URL = "http://localhost:8000/auth/";

class AuthService {
  async login(email, password) {
    const response = await axios.post(
      API_URL + "login",
      {
        email,
        password,
      },
      { validateStatus: false }
    );

    console.log(response.data);

    if (response.data.access_token) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response;
  }

  logout() {
    localStorage.removeItem("user");
  }

  async register(name, password, email, phone, gender, dob) {
    return await axios.post(
      API_URL + "signup",
      {
        name,
        password,
        email,
        phone,
        gender,
        dob,
      },
      { validateStatus: false }
    );
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

  async updatePassword() {
    return await axios.patch(
      API_URL + "update_password",
      {
        password,
      },
      { validateStatus: false }
    );
  }

  async updateProfile(email, phone) {
    return await axios.patch(
      API_URL + "update_info",
      {
        email,
        phone,
      },
      { validateStatus: false }
    );
  }
}
export default new AuthService();
