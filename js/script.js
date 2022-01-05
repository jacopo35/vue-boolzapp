/*
Milestone 1
Replica della grafica con la possibilità di avere messaggi scritti dall’utente(verdi) e dall’interlocutore(bianco) assegnando due classi CSS diverse.
Visualizzazione dinamica della lista contatti: tramite la direttiva v -for, visualizzare nome e immagine di ogni contatto.

Milestone 2
Visualizzazione dinamica dei messaggi: tramite la direttiva v-for, visualizzare tutti i messaggi relativi al contatto attivo all’interno del pannello della conversazione
Click sul contatto mostra la conversazione del contatto clic

Milestone 3
Aggiunta di un messaggio: l’utente scrive un testo nella parte bassa e digitando “enter” il testo viene aggiunto al thread sopra, come messaggio verde
Risposta dall’interlocutore: ad ogni inserimento di un messaggio, l’utente riceverà un “ok” come risposta, che apparirà dopo 1 secondo.

Milestone 4
Ricerca utenti: scrivendo qualcosa nell’input a sinistra, vengono visualizzati solo i contatti il cui nome contiene le lettere inserite (es, Marco, Matteo Martina -> Scrivo “mar” rimangono solo Marco e Martina)

Milestone 5
Cancella messaggio: cliccando sul messaggio appare un menu a tendina che permette di cancellare il messaggio selezionato
Visualizzazione ora e ultimo messaggio inviato/ricevuto nella lista dei contatti.
*/


const project = new Vue({
    el: "#app",
    data: {
        isOnline: false,
        isTexting: false,
        isClicked: false,
        isChoice: true,
        isHidden: true,
        counter: 0,
        addSend: "",
        filter: "",
        casualPhrases: [
            "si si contatemi pure", "assurdo", "secondo me è d'accordo", "ci sto", "ah va bene", "ciaooo", "come stai?",
        ],
        contacts: [
            {
                name: "Michele",
                avatar: "_1",
                visible: true,
                messages: [
                    {
                        date: "10/01/2020 15:30:55",
                        text: "Hai portato a spasso il cane?",
                        status: "sent",
                        condition: false,
                    },
                    {
                        date: "10/01/2020 15:50:00",
                        text: "Ricordati di dargli da mangiare",
                        status: "sent",
                        condition: false,
                    },
                    {
                        date: "10/01/2020 16:15:22",
                        text: "Tutto fatto!",
                        status: "received",
                        condition: false,
                    },
                ],
            },
            {
                name: "Fabio",
                avatar: "_2",
                visible: true,
                messages: [
                    {
                        date: "20/03/2020 16:30:00",
                        text: "Ciao come stai?",
                        status: "sent",
                        condition: false,
                    },
                    {
                        date: "20/03/2020 16:30:55",
                        text: "Bene grazie! Stasera ci vediamo?",
                        status: "received",
                        condition: false,
                    },
                    {
                        date: "20/03/2020 16:35:00",
                        text: "Mi piacerebbe ma devo andare a fare la spesa.",
                        status: "sent",
                        condition: false,
                    },
                ],
            },

            {
                name: "Samuele",
                avatar: "_3",
                visible: true,
                messages: [
                    {
                        date: "28/03/2020 10:10:40",
                        text: "La Marianna va in campagna",
                        status: "received",
                        condition: false,
                    },
                    {
                        date: "28/03/2020 10:20:10",
                        text: "Sicuro di non aver sbagliato chat?",
                        status: "sent",
                        condition: false,
                    },
                    {
                        date: "28/03/2020 16:15:22",
                        text: "Ah scusa!",
                        status: "received",
                        condition: false,
                    },
                ],
            },
            {
                name: "Luisa",
                avatar: "_4",
                visible: true,
                messages: [
                    {
                        date: "10/01/2020 15:30:55",
                        text: "Lo sai che ha aperto una nuova pizzeria?",
                        status: "sent",
                        condition: false,
                    },
                    {
                        date: "10/01/2020 15:50:00",
                        text: "Si, ma preferirei andare al cinema",
                        status: "received",
                        condition: false,
                    },

                ],
            },
        ],
    },
    methods: {
        change: function (index) {
            this.counter = index
            this.isChoice = false
            this.contacts[index].border = !this.contacts[index].border

        },

        lastAccess: function (messages) {
            let access = messages.filter((message) => {
                return message.status == 'received'
            })
            let lunghezza = access.length - 1;
            return access[lunghezza];
        },

        send: function () {
            dayjs.extend(window.dayjs_plugin_customParseFormat);
            let data = dayjs().format("D/M/YYYY HH:mm:ss");
            let send = this.addSend.trim();
            let casualLength = this.casualPhrases.length
            let casual = Math.floor(Math.random() * casualLength);

            if (send != '') {
                this.contacts[this.counter].messages.push({
                    date: data,
                    text: send,
                    status: "sent",
                    condition: false,
                })
                this.addSend = "";


                setTimeout(() => {
                    this.isTexting = true
                    this.isOnline = true
                    setTimeout(() => {
                        this.contacts[this.counter].messages.push({
                            date: data,
                            text: this.casualPhrases[casual],
                            status: "received",
                            condition: false,
                        })
                        this.isTexting = false
                        setTimeout(() => {
                            this.isOnline = false
                        }, 3000);
                    }, 4000);
                }, 2000);
            }
        },

        searchFilter: function () {
            this.contacts.forEach(element => {
                if (element.name.toLowerCase().includes(this.filter.toLowerCase())) {
                    element.visible = true
                } else {
                    element.visible = false
                }
            })
        },

        deleteMessages: function (index) {
            this.contacts[this.counter].messages.splice(index, 1)
        },

        appear: function () {
            this.isClicked = !this.isClicked
        },

        deleteAllMessages: function () {
            this.contacts[this.counter].messages = []
        },

        deleteUser: function () {
            this.contacts.splice(this.counter, 1)
        },

        ciao: function () {
            if (this.isHidden == true) {
                return 'hidden'
            } else if (this.hidden == false) {

            }
        },

        makeAppear: function () {
            setTimeout(() => {
                let splash = document.querySelector(".splash-page")
                splash.classList.add("hidden")
                setTimeout(() => {
                    splash.classList.add("d-none")
                }, 2000);
            }, 3000);
        }
    },

    created() {
        this.makeAppear()
    },

})