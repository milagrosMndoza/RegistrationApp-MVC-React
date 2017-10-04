class Model{
    constructor(){
      this.invitados=[];
      this.inputValue = null;
      this.callback = null;
    }
  subscribe(render) {
    this.callback=render;
  }

  notify() {
    this.callback();
  }
    addInvitados(){
      
      this.invitados.push(
        {name:this.inputValue.value,
          id:Utils.uuid()});
      this.inputValue.value='';
      this.notify();
    }
    deleteInvitados(id){
      for(let del in this.invitados)
        if(this.invitados[del].id == id){
          this.invitados.splice(del, 1);
         }
      this.notify();
    }
}
const InvitadosList=({model})=>{
  return (<ul>
    {model.invitados.map((invita)=>{
      return <li key={invita.id}>{invita.name}
      <label>Confirmed<input type='checkbox'/></label>
      <button onClick={()=>model.deleteInvitados(invita.id)}>Remove</button></li>;
      })
    }
    </ul>);
}

const InvitadosApp=({title,model})=>{
  return (
    <div className="wrapper">
      <header>
        <h1>RSVP</h1>
        <p> Registration App </p>
        <form onSubmit={(e)=>{e.preventDefault();model.addInvitados()}}>
          <input type="text" placeholder="Invite Someone"  onChange={e => (model.inputValue = e.target)} />
          <button type="submit">Submit</button>
        </form>
      </header>
      <div className="main">	
        <h2>Invitees</h2>
        <InvitadosList model={model}/>
      </div>
    </div>
  );
}
 
let INVITADOS = [];
let model = new Model(INVITADOS);
let counter = 1;

let render = () => {
  ReactDOM.render(
    <InvitadosApp title="ReservaInvitacion" model={model} />,
    document.getElementById("container")
  );
};

model.subscribe(render);

render();

