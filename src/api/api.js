import axios from "axios"

export const api = {
    getUsers(rows) {
        return axios
            .get(`http://www.filltext.com/?rows=${rows}&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}`)
            .then(response => response.data)
    },
}
