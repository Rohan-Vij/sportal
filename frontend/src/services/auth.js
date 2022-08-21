import axios from "axios";

const API_URL = "http://localhost:8000/auth/";

class AuthService {
  login(email, password) {
    return axios
      .post(API_URL + "login", {
        email,
        password,
      }, { validateStatus: false })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(name, password, email, phone, gender, dob) {
    return axios.post(API_URL + "signup", {
      name,
      password,
      email,
      phone,
      gender,
      dob,
    }, { validateStatus: false });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

  updatePassword() {
    return axios.patch(API_URL + "update_password", {
      password,
    }, { validateStatus: false });
  }

  updateProfile(email, phone) {
    return axios.patch(API_URL + "update_info", {
        email,
        phone
    }, { validateStatus: false }); 
  }
}
export default new AuthService();
