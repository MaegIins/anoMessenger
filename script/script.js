//anoMessenger
//
//@author : 	Tristan Belmont
//


let myVueApp = Vue.createApp({
    data() {
        return {
            message: '',
            listMessages: [],
        }

    },
    methods: {
        sendMessage() {
            let messageSent = {
                message: this.message,
                hour : Date()
            }

            this.listMessages.push(messageSent)
            this.message = ''
        }
    }
})



myVueApp.mount('#container');