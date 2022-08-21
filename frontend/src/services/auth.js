import axios from "axios";

const API_URL = "http://localhost:8000/auth/";

class AuthService {
  login(email, password) {
    return axios
      .post(API_URL + "login", {
        email,
        password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
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
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

  updatePassword() {
    return axios.patch(API_URL + "update_password", {
      password,
    });
  }

  updateProfile(email, phone) {
    return axios.patch(API_URL + "update_info", {
        email,
        phone
    }); 
  }
}
export default new AuthService();
