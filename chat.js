class createElement {

    constructor() {
        const app = document.getElementById('app');
        this.createForm(app);
        this.createMain(app);
    }

    createForm(app) {
        const form = document.createElement('form');
        form.method = 'POST';
        app.appendChild(form);

        const logInput = document.createElement('input');
        logInput.type = 'text';
        logInput.name = 'login';
        logInput.required = 'required';
        form.appendChild(logInput);

        const pasInput = document.createElement('input');
        pasInput.type = 'password';
        pasInput.name = 'password';
        pasInput.required = 'required';
        form.appendChild(pasInput);

        const butInput = document.createElement('input');
        butInput.type = 'submit';
        butInput.value = 'Войти';
        butInput.id = 'login';
        form.appendChild(butInput);
    }

    createMain(app){
        const main = document.createElement('main');
        app.appendChild(main);

        const usersSection = document.createElement('section');
        main.appendChild(usersSection);
        usersSection.classList.add("users");

        const chatSection = document.createElement('section');
        main.appendChild(chatSection);
        chatSection.classList.add("chat");

        const divMessages = document.createElement('div');
    
        chatSection.appendChild(divMessages);
        divMessages.classList.add("messages");
        divMessages.setAttribute("id", "messages");

        const divMessage = document.createElement('div');
    
        chatSection.appendChild(divMessage);
        divMessage.classList.add("message");

        const inputFrom = document.createElement('input');
        divMessage.appendChild(inputFrom);
        inputFrom.type = 'hidden';
        inputFrom.setAttribute("id", "from")
        
        const inputTo = document.createElement('input');
        divMessage.appendChild(inputTo);
        inputTo.type = 'hidden';
        inputTo.setAttribute("id", "to")
        
        const textA = document.createElement('textarea');
        divMessage.appendChild(textA);
        textA.setAttribute("id", "message");

        const buttonSubmit = document.createElement('button');
        divMessage.appendChild(buttonSubmit);
        buttonSubmit.setAttribute("id", "submit_message");
        buttonSubmit.innerHTML = "Отправить";
    }
    
}

const test = new createElement();



class Helpers {
    static apiUrl = '/zheltov/';
    static headers = () => ({
        'Content-Type': 'application/json',
        'Application-Type': 'application/json'
    });
}

class Chat {
    from = ''; // свойство / поле
    to = '';
    token = '';
    lastUpdate = new Date();

    constructor() {
    }

    login(login, password) { // действие / метод
        const self = this;
        fetch(
            Helpers.apiUrl + '/login.php',
            {
                method: 'post',
                headers: Helpers.headers,
                body: JSON.stringify({
                    login: login,
                    password: password
                })
            }
        ).then(function (res) { return res.json() }).then(function (res) {
            self.token = res.token;
            self.from = login;

        }).catch(function (err) {
            console.log(err);
        });
    }

    changeDialog(to) {
        this.to = to;
        return fetch(
            Helpers.apiUrl + '/messages.php?from=' + this.from + '&to=' + this.to,
            {
                method: 'get',
                headers: Helpers.headers
            }
        ).then(function (res) { return res.json() }).catch(function (err) { console.log(err) });
    }

    sendMessage(text) {
        fetch(
            Helpers.apiUrl + '/message.php',
            {
                method: 'post',
                headers: Helpers.headers,
                body: JSON.stringify({
                    from: this.from,
                    to: this.to,
                    message: text
                })
            }
        ).catch(function (err) { console.log(err) });
    }

    getNewMessages = () => new Promise(function (resolve, reject) {
        fetch(
            Helpers.apiUrl + '/now_messages.php?from=' + this.from + '&to=' + this.to + '&datetime=' + this.lastUpdate.getTime(),
            {
                method: 'get',
                headers: Helpers.headers
            }
        ).then(res => res.json()).then((res) => {
            if (res.messages.length > 0) {
                lastUpdate = new Date();
            }
            return resolve(res.messages);
        }).catch(err => reject(err))
    });

}

const chat = new Chat();

document.getElementById('login').addEventListener('click', function (event) {
    event.preventDefault();
    chat.login(
        document.getElementsByName('login')[0].value,
        document.getElementsByName('password')[0].value
    );

    // fetch(
    //     '/login.php',
    //     {
    //         method: 'post',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Application-Type': 'application/json'
    //         },
    //         body: JSON.stringify({
    //             login: document.getElementsByName('login')[0].value,
    //             password: document.getElementsByName('password')[0].value
    //         })
    //     }
    // ).then(function (res) { return res.json() }).then(function (res) {
    //     console.log(res);

    //     const input = document.createElement('input');
    //     input.type = 'hidden';
    //     input.id = 'token';
    //     input.value = res.token;
    //     document.body.appendChild(input);

    //     // debugger

    //     document.getElementById('from').value = document.getElementsByName('login')[0].value;
    // }).catch(function (err) {
    //     console.log(err);
    // });
});

[...document.getElementsByClassName('user')].map(function (item) {
    item.addEventListener('click', function () {
        [...document.getElementsByClassName('user')].map(function (el) {
            el.classList.remove('active');
        });
        this.classList.add('active');
        // document.getElementById('to').value = this.innerText;

        chat.changeDialog(this.innerText).then(function (res) {
            // fetch(
            //     '/messages.php?from=' + document.getElementById('from').value + '&to=' + document.getElementById('to').value,
            //     {
            //         method: 'get',
            //         headers: {
            //             'Content-Type': 'application/json',
            //             'Application-Type': 'application/json'
            //         }
            //     }

            document.getElementById('messages').innerHTML = '';
            for (const item of res.messages) {
                const el = document.createElement('div');
                el.classList.toggle(item.myself ? 'from' : 'to');
                el.innerText = item.text;
                document.getElementById('messages').appendChild(el);
                // lastUpdate = new Date();
            }

        });
    });
});

document.getElementById('submit_message').addEventListener('click', function (event) {
    const text = document.getElementById('message').value;
    const message = document.createElement('div');
    message.innerText = text;
    message.classList.add('from');
    document.getElementById('messages').appendChild(message);
    document.getElementById('message').value = '';

    chat.sendMessage(text);


    // fetch(
    //     '/message.php',
    //     {
    //         method: 'post',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Application-Type': 'application/json'
    //         },
    //         body: JSON.stringify({
    //             from: document.getElementById('from').value,
    //             to: document.getElementById('to').value,
    //             message: text
    //         })
    //     }
    // )/*.then(function(res){return res.json()}).then(function(res){
    //     console.log(res);
    // })*/.catch(function (err) { console.log(err) });
});

const id = setInterval(
    function () {

        if (!!chat.from && !!chat.to) {
            chat.getNewMessages().then(function (messages) {


                for (const item of res.messages) {
                    const el = document.createElement('div');
                    el.classList.add(item.meself ? 'from' : 'to');
                    el.innerText = item.text;
                    document.getElementById('messages').appendChild(el);
                }
            }).catch(function (err) { console.log(err) });
        }
    }, 3000
);


console.log(chat.from);
console.log(chat.to);
chat.login();



class privateChat extends Chat {
    constructor() {
        super();
    }

    login = (login, password) => {
        password = some_cript(password);
        super.login(login, password);
        console.log('private');
    }
}
// }

// class NewChat extends privateChat{

// }

// const privateChat = new privateChat();
// privateChat.login();
// privateChat.getNewMessages();


// const ar = [new privateChat(), new NewChat()];

// for(const el of ar){
//     console.log(el);
//     er.login('','');
// }

// let app = null;

