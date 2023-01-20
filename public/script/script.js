//anoMessenger
//
//@author : 	Tristan Belmont / Kévin Bully Cimbaluria
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
        this.socket = io('https://SaneExhaustedArchitecture.therealeureka.repl.co');
        if(window.localStorage.getItem('color') !== null){
            this.color = window.localStorage.getItem('color');
            this.socket.emit('handcheck', this.color);
        }else{
            this.socket.emit('handcheck');
        }

    },
    mounted() {
        this.socket.on('handcheck',  (data) => {
            this.color = data.color;
            if(data.messages){
                data.messages.forEach((message) => {
                    this.addMessage(message);
                });
            }
            this.saveColor();
        });
        this.socket.on('newMessage',  (msg)=> {
            this.addMessage(msg);
        });
    },
    methods: {
        sendMessage() {

            if (this.message.trim() !== '') {
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
                this.addMessage(messageSent)
                this.socket.emit('newMessage', messageSent);

            }
            this.message = ''
        },
        addMessage(message) {
            let regex = /(\[.*][^\]]*\[\/.*])/g;
            let content = message.message.split(regex);

            message.content = [];
          content.forEach((item, index) => {
                    let obj = {
                        data: "",
                        type: "",
                    }
                    if(item.includes('img')){
                        console.log('itinial '  +item)
                        obj.data = item.replace("[img]", "").replace("[/img]", "").replace(/\\n|\/n/,"");
                        console.log('edited' + obj.data)
                        obj.type = "img";
                        message.content.push(obj);

                    }
                    else if (item.includes('url')){
                        obj.data = item.replace("[url]", "").replace("[/url]", "").trim().replace(/\\n|\/n/,"");
                        obj.type = "url";
                        message.content.push(obj);

                    }else{
                        let lines = item.split("\n");
                        lines.forEach((line, index) => {
                            let obj = {
                                data: line,
                                type: "text",
                            };
                            message.content.push(obj);
                        });
                    }



          });
            this.listMessages.push(message);

            window.scroll(0, document.getElementById("messageGlobal").scrollHeight + document.getElementById("spacer").scrollHeight);

        },
        saveColor(){
            window.localStorage.setItem('color', this.color);
        }
    }
})


myVueApp.mount('#container');