import { Api } from "@/api/api";

class Auth extends Api {
  /*
   * - GET: obtiene si el usuario es administrador o no
   * - POST: cambia el estado de administrador del usuario
   * */
  login(formData) {
    const params = { username: formData.email, password: formData.password };
    const data = Object.keys(params)
      .map((key) => `${key}=${encodeURIComponent(params[key])}`)
      .join("&");
    return this.post(`/auth/login`, data, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  }

  signup(formData, phoneCode) {
    const params = {
      username: formData.email,
      password: formData.password,
      email: formData.email,
      name: formData.name,
      address: formData.address,
      age: formData.age,
      phone: `${phoneCode}${formData.phone}`,
      avatar: formData.avatarUrl,
      isAdmin: formData.isAdmin,
    };
    return this.post(`/auth/signup`, params);
  }

  uploadAvatar(avatar) {
    const formData = new FormData();
    formData.append("avatar", avatar);
    return this.post(`/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
}

const auth = new Auth();

export default auth;
