//anoMessenger
//
//@author : 	Tristan Belmont
//


let myVueApp = Vue.createApp({
    data() {
        return {
            message: '',
            color: '',
            listMessages: [],
        }

    },
    methods: {
        sendMessage() {
            let date = new Date();
            let color = this.color;
            let messageSent = {
                message: this.message,
                hour: date.getHours(),
                minute: date.getMinutes(),
                color: color,
            }

            if (this.message !== '') {
                this.listMessages.push(messageSent)
            }
            this.message = ''
        }
    }
})


myVueApp.mount('#container');