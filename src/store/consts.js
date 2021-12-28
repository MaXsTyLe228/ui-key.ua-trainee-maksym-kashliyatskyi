const PATH = 'https://v2hl01gc6g.execute-api.us-east-2.amazonaws.com/dev'
//'http://localhost:3000/dev'

let headers = {
    "Authorization": "Bearer " + localStorage.getItem('idToken')
};

export {PATH, headers}