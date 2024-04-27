// --- JSX --- 
var nombre = "Ale"

var Titulo = ({texto}) => <h1>Agenda {texto}</h1>
var Pagina = ()=> <div>Hola {nombre} <Titulo texto="Mundo"/></div>

ReactDOM.render(<Pagina />, document.getElementById('root'))

var Prueba = () => <div>
    <h1>Agenda Mundo</h1>
    <li>
        <ul><div>Uno</div><span>One</span></ul>
        <ul><div>Dos</div><span>Two</span></ul>
        <ul><div>Tres</div><span>Three</span></ul>
        <ul><div>Cuatro</div><span>Four</span></ul>
    </li>
</div>

//--- JS --- 
var nombre = "Ale";

var Titulo = ({texto}) => React.createElement('h1', null, `Agenda ${texto}`);
var Pagina = () => React.createElement('div', null, `Hola ${nombre}`, React.createElement(Titulo, {texto: "Mundo"}));

ReactDOM.render(React.createElement(Pagina, null), document.getElementById('root'));

const Prueba = () => React.createElement(
    'div',  null,
    React.createElement('h1', null, 'Agenda Mundo'),
    React.createElement(
        'li', null,
        React.createElement('ul', null, React.createElement('div', null, 'Uno'), React.createElement('span', null, 'One')),
        React.createElement('ul', null, React.createElement('div', null, 'Dos'), React.createElement('span', null, 'Two')),
        React.createElement( 'ul', null, React.createElement('div', null, 'Tres'), React.createElement('span', null, 'Three')),
        React.createElement('ul', null, React.createElement('div', null, 'Cuatro'), React.createElement('span', null, 'Four'))
    )
);

