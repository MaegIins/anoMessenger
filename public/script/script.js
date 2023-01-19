//anoMessenger
//
//@author : 	Tristan Belmont
//


let myVueApp = Vue.createApp({
    data() {
        return {
            message: '',
            color: '#26dcff',
            listMessages: [],
            chars : 640,
            socket : null,
        }

    },
    created()
    {
        this.socket = io(':3000');
        console.log("Socket created");

        if(window.localStorage.getItem('color') !== null){
            this.color = window.localStorage.getItem('color');
            console.log("Color loaded");
            this.socket.emit('handcheck', this.color);
        }else{
            console.log("Color not loaded");
            this.socket.emit('handcheck');
        }

    },
    mounted() {
        this.socket.on('handcheck',  (data) => {
            this.color = data.color;
            this.listMessages = data.messages;
            this.saveColor();
        });
        this.socket.on('newMessage',  (msg)=> {
            this.listMessages.push(msg);
        });
    },
    methods: {
        sendMessage() {
            let date = new Date();
            let h = date.getHours();
            let m = date.getMinutes();
            if(h<10){
                h = "0"+h;
            }
            if(m<10){
                m = "0"+m;
            }
            let messageSent = {
                message: this.message,
                date: h+":"+m,
                color: this.color,
            }

            if (this.message !== '') {

                this.listMessages.push(messageSent)
                this.socket.emit('newMessage', messageSent);

            }
            this.message = ''
        },
        saveColor(){
            console.log("save")
            window.localStorage.setItem('color', this.color);
        }
    }
})


myVueApp.mount('#container');