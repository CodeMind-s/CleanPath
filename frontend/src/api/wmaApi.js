import ApiHelper from "../helpers/apiHelper";

class AuthService {
  constructor() {
    this.api = new ApiHelper();
  }

  async register(wmaData) {
    try {
      const response = await this.api.post("wmas", wmaData);
      // Assuming the backend returns a token upon successful registration
      if (response.token) {
        localStorage.setItem("token", response.token);
      }
      return response;
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  }

  async login(credentials) {
    try {
      const response = await this.api.post("wmas/auth", credentials);
      // Assuming the backend returns a token upon successful login
      if (response.token) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("wmaId", response._id);
      }
      return response;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  }

  async getCurrentUserDetails() {
    try {
      const response = await this.api.get(
        "wmas/profile", // Assuming 'me' is the endpoint for fetching the current wma profile
        {
          withCredentials: true, // Ensure cookies are sent with the request
        }
      );

      // console.log(`Current User response => `, response); // Log the response data
      return response; // Return the response data
    } catch (error) {
      console.error("Error fetching current wma profile:", error);
      throw error; // Rethrow error for further handling
    }
  }

  async getAllUsers() {
    try {
      const wmas = await this.api.get(
        "wmas",
        {},
        {
          withCredentials: true,
        }
      );
      return wmas;
    } catch (error) {
      console.error("Error fetching wmas:", error.message);
      throw error;
    }
  }

  async deleteUser(id) {
    try {
      const deletedUser = await this.api.delete(`wmas/${id}`, {
        withCredentials: true,
      });
      return deletedUser.data;
    } catch (error) {
      console.error("Error deleting wma:", error.message);
      throw error;
    }
  }

  async updateUser(profileData) {
    try {
      const response = await this.api.put("wmas/profile", profileData, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error("Error updating wma profile:", error);
      throw error;
    }
  }

  async logoutCurrentUser() {
    try {
      const response = await this.api.post("wmas/logout");
      // console.log(`response => `, response);
      // alert(response.message); // Display the success message
      // Perform any additional actions like redirecting the wma to the login page
    } catch (error) {
      console.error("Error logging out:", error);
    }
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("wmaId");
    // You might want to perform additional cleanup here
  }

  isAuthenticated() {
    return localStorage.getItem("token") !== null;
  }

  getToken() {
    return localStorage.getItem("token");
  }

  getUserId() {
    return localStorage.getItem("wmaId");
  }
}

export default new AuthService();
