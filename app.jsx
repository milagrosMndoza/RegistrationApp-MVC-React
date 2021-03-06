class Model {
    constructor() {
        this.invitados = [];
        this.inputValue = null;
        this.callback = null;
    }
    subscribe(render) {
        this.callback = render;
    }

    notify() {
        this.callback();
    }
    addInvitados() {
    console.log(this.inputValue.value);
    if(this.inputValue!= null && this.inputValue.value !=''){
        this.invitados.push({
            name: this.inputValue.value,
            id: Utils.uuid(),
            confirmed: false,
            clase: ' '
        });
        this.inputValue.value = '';
        this.notify();
    }
    }
    deleteInvitados(id) {
        for (let i in this.invitados)
            if (this.invitados[i].id == id) {
                this.invitados.splice(i , 1);
            }
        this.notify();
    }

    clickCheckbox(e, index){
      this.invitados[index].clase= (e.target.checked) ? "responded": "";
      this.notify();
    }
}
const InvitadosList = ({
        title,
        model
    }) => {
        return ( < ul > {
                model.invitados.map((invita, index) => {
                    return <li  key = {invita.id} className={invita.clase}> 
                            {invita.name}
                           <label> Confirmed < input type='checkbox' onClick={ (e) => model.clickCheckbox(e, index)} / > < /label> 
                           <button onClick = { 
                            () => model.deleteInvitados(invita.id)
                        } > Remove < /button>
                           </li> ;
                })
            } </ul>);
        }

        const InvitadosApp = ({
            title,
            model
        }) => {
            return ( <
                div className = "wrapper" >
                <header >
                <h1> RSVP </h1> <p> Registration App </p> <
                form onSubmit = {
                    (e) => {
                        e.preventDefault();
                        model.addInvitados()
                    }
                } >
                <input type = "text"
                placeholder = "Invite Someone"
                onChange = {
                    e => (model.inputValue = e.target)
                }
                /> <
                button type = "submit" > Submit < /button> <
                /form> <
                /header> <
                div className = "main" >
                < h2 > Invitees < /h2> <
                InvitadosList model = {model}
                /> </div>
            </div>
            );
        }

        let INVITADOS = [];
        let model = new Model(INVITADOS);
        let counter = 1;

        let render = () => {
            ReactDOM.render( <
                InvitadosApp title = "RegistrationApp"
                model = {model}
                />,
                document.getElementById("container")
            );
        };

        model.subscribe(render);

        render();
