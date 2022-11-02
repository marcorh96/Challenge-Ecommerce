export class login{
    #username;
    #password;
    #direction;
    #phone;
    #email;
    #birth;
    #id;
    #status;

    constructor(username, password, direction, phone, email, birth){
        this.#username = username;
        this.#password = password;
        this.#direction = direction;
        this.#phone =phone;
        this.#email = email;
        this.#birth = birth;
    }
}