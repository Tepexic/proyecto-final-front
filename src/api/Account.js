import { Api } from "@/api/api";

class Account extends Api {
  /*
   * - GET: obtiene si el usuario es administrador o no
   * - POST: cambia el estado de administrador del usuario
   * */
  getUserRole() {
    return this.get(`/admin`);
  }
  toggleUserRole() {
    return this.post(`/admin`);
  }
}

const account = new Account();

export default account;
