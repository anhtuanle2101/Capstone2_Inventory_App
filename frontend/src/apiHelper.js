import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class ApiHelper {
    // the token for interactive with the API will be stored here.
    static token;

    static async request(endpoint, data = {}, method = "get") {
        console.debug("API Call:", endpoint, data, method);
        //there are multiple ways to pass an authorization token, this is how you pass it in the header.
        //this has been provided to show you another way to pass the token. 
        const url = `${BASE_URL}/${endpoint}`;
        const headers = ApiHelper.token?{ Authorization: `Bearer ${ApiHelper.token}` }:"";
        const params = (method === "get")
            ? data
            : {};
        try {
            return (await axios({ url, method, data, params, headers })).data;
        } catch (err) {
            console.error("API Error:", err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    }

    // Individual API routes

    // *** Inventories Routes ***
    // Get all inventories
    static async inventoryGetAll(){
        let res = await this.request(`inventories`);
        return res.inventories;
    }

    static async inventoryGet(id){
        let res = await this.request(`inventories/${id}`);
        console.log(res.inventory);
        return res.inventory;
    }

    static async inventoryUpdate(id, itemList){
        let res = await this.request(`inventories/${id}`, { itemList }, "patch");
        return res.inventory;
    }

    // ** Templates Routes ***
    // Get all templates
    static async templateGetAll(){
        let res = await this.request(`templates`);
        return res.templates;
    }

    static async templateGet(id){
        let res = await this.request(`templates/${id}`);
        return res.template;
    }

    // *** Users Routes ***
    // Users signs up with information
    static async userSignUp({ username, firstName, lastName, password, email }){
        let res = await this.request(`auth/register`, { username, firstName, lastName, password, email }, "post");
        return { token: res.token };
    }
    // User Signs In with credentials 
    static async userSignIn({ username, password }){
        console.log("Signing in")
        let res = await this.request(`auth/token`, { username, password }, "post");
        
        return { token: res.token };
    }
    // User get information with provided username
    static async userGet(username){
        let res = await this.request(`users/${username}`);
        return res.user;
    }
    // User update information with provided info
    static async userUpdate({ username, firstName, lastName, email }){
        let res = await this.request(`users/${username}`, { firstName, lastName, email }, "patch");
        return res.user;
    }

    // *** Items Routes ***
    // Items get all 
    static async itemGetAll(){
        let res = await this.request(`items`);
        return res.items;
    }
    
}
// for now, put token ("testuser" / "password" on class)
ApiHelper.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
    "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
    "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

export default ApiHelper;