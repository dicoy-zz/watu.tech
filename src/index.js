const {
  HashRouter,
  Switch,
  Route,
  IndexRoute,
  NavLink,
  hashHistory
} = ReactRouterDOM;
const { render } = ReactDOM;
const Fragment = React.Fragment;

//funciones de ayuda
const datos = {
  agregar: (nombre, valor) => {
    datos[nombre] = valor;
    localStorage.setItem(nombre, JSON.stringify(valor));
  }
};
const uid = (() => {
  let i = 0;
  return () => {
    return i++;
  };
})();

//datos
datos.agregar("homeBoxes", [
  { box: "alumnos", size: "SmallBox" },
  { box: "pedidos", size: "SmallBox" },
  { box: "usuarios", size: "SmallBox" },
  { box: "nuevoRecibo", size: "BigBox" }
]);
datos.agregar("meses", [
  "Ene",
  "Feb",
  "Mar",
  "Abr",
  "May",
  "Jun",
  "Jul",
  "Ago",
  "Sep",
  "Oct",
  "Nov",
  "Dic"
]);
datos.agregar("conceptos", [
  {nombre:"Cuota Social", precio: 100},
  {nombre:"Materiales", precio: 600},
  {nombre:"Emergencias", precio: 200},
  {nombre:"Fotos", precio: 10},
  {nombre:"Rifa", precio: 10},
  {nombre:"Extraordinaria", precio: 100},
  {nombre:"Donaciones", precio: 100}
]);
datos.agregar("tamaños", [
  {medidas:"15 x 20", precio:10}, {medidas:"20 x 30", precio:20}, {medidas:"taza", precio:30}, {sdfmedidas:"llavero", precio:40}
]);
 
//contextos
const Gc = React.createContext();
class Gcc extends React.Component {

  constructor(props) { 
    super(props);
    this.state = {
      homeBoxes: datos.homeBoxes,
      items: [{concepto: "Cuota Social", mes: "Mar", precio: datos.conceptos.filter(c=>c.nombre=="Cuota Social")[0].precio}]
    };
  }

  render() {
    return (
      <Gc.Provider
        value={{
          state: this.state,
          nuevoItem: () => this.setState({items:this.state.items.concat({
            concepto: "Cuota Social", 
            mes: "Mar", 
            precio: datos.conceptos.filter(c=>c.nombre=="Cuota Social")[0].precio
          })}),
          quitarItem: (numero) => {
            
                console.log("lala", numero);
            this.setState({
              items:this.state.items.filter((item, index)=>{
                return index != numero
            })
           })},
          changers: {
            concepto: (numero, concepto) => {
              this.setState({
                items:this.state.items.map((item, index) =>
                  numero == index 
                    ? {...item, concepto, precio: datos.conceptos.filter(c=>c.nombre==concepto)[0].precio} 
                    : item
                )
              });
            },
            mes: (numero, mes) => {
             
              this.setState({
                items:this.state.items.map((item, index) =>
                  numero == index ? {...item, mes} : item
                )
              });
            },
            tamaño: (numero, tamaño) => {
              console.log(this.state.items.map((item, index) =>
                  numero == index 
                    ? {...item, tamaño, precio: datos.tamaños.filter(t=>t.medidas==tamaño)[0].precio} 
                    : item
                ));
              this.setState({
                items:this.state.items.map((item, index) =>
                  numero == index 
                    ? {...item, tamaño, precio: datos.tamaños.filter(t=>t.medidas==tamaño)[0].precio} 
                    : item
                )
              });
            },
          }
        }}
      >
        {this.props.children}
      </Gc.Provider>
    );
  }
}

//elementos
const Nav = props => {
  const { links, children } = props;
  return (
    <Fragment>
      <section className="avenir w-100 pa2">
        <header className="bg-black-90 fixed w-100 ph3 pv3 pv4-ns ph4-m ph5-l br3">
          <nav className="f6 fw6 ttu tracked">
            {links.map(link => (
              <NavLink
                to={`/${link.href}`}
                className={`link dim white dib mr3 hover-${link.color}`}
                activeClassName={link.color}
                exact
                key={uid()}
              >
                {link.text}
              </NavLink>
            ))}
          </nav>
        </header>
      </section>
      {children}
    </Fragment>
  );
};
const BigBox = ({ color, children }) => {
  return (
    <section className="avenir w-100 pa2 pt5">
      <article className="fl w-100 pa2">
        <div className={`bg-${color} white w-100 mt3 pa3 br3`}>{children}</div>
      </article>
    </section>
  );
};
const SmallBox = ({ color, children }) => {
  return (
    <article className="fl w-100 w-third-ns pa2">
      <div className={`bg-${color} white w-100 mt3 pa3 br3`}>{children}</div>
    </article>
  );
};
const Campo = ({ css, nombre }) => {
  return (
    <div className="flex flex-column pt1 pr3">
      <label>{nombre}</label>
      <input className={`${css} mb3 f6 fw6 bb bw-3 bg`} />
    </div>
  );
};
const DropDown = ({ color, nombre, value, numero, changer, opciones }) => {
  return (
    <Gc.Consumer>
      { context => (
        <div className="flex flex-column pt1 pr3">
          <label>{nombre}</label>
          <select value={value} onChange={e=>changer(numero, e.target.value)} className={`${color} w-100 mb3 f6 fw6 bb`}>
            {opciones.map(opcion => <option key={uid()}>{opcion}</option>)}
          </select>
        </div>
      )}
    </Gc.Consumer>
  );
};
const Concepto = ({numero, changers, item, quitarItem}) => {
  console.log(numero);
  return (
    <div className="flex flex-row pt3">
      <button onClick={()=>quitarItem(numero)} className="br-pill b f4 gold w-10 bg-white b--white shadow-3">
                -
              </button>
      <DropDown color="gold" nombre="Concepto" numero={numero} value={item.concepto} changer={changers.concepto} opciones={datos.conceptos.map(c=>c.nombre)} />
      {item.concepto=='Cuota Social'?<DropDown color="gold" nombre="Mes" numero={numero} value={item.mes} changer={changers.mes} opciones={datos.meses} />:''}
      {item.concepto=='Fotos'?<Campo css="gold w-50" nombre="Acto" numero={numero} changer={changers.acto} />:''}
      {item.concepto=='Fotos'?<Campo css="gold w-50" nombre="Codigo" numero={numero} changer={changers.codigo} />:''}
      {item.concepto=='Fotos'?<DropDown color="gold" nombre="Tamaño" numero={numero} value={item.tamaño} changer={changers.tamaño} opciones={datos.tamaños.map(t=>t.medidas)} />:''}
      <div className="flex flex-column pt1 pr3">
        <label>Precio</label>
        <label>${datos.conceptos.filter(c=>c.nombre==item.concepto)[0].precio}</label>
      </div>
    </div>
  );
};

//secciones
const Home = props => {
  return (
    <Fragment>
      <section className="avenir w-100 pa2 pt5">
        <SmallBox color="pink">
          <Alumnos />
        </SmallBox>
        <SmallBox color="light-blue">
          <Reporte />
        </SmallBox>
        <SmallBox color="red">
          <Usuarios />
        </SmallBox>
      </section>
      <BigBox color="gold">
        <NuevoRecibo />
      </BigBox>
    </Fragment>
  );
};
const NuevoRecibo = props => {
  const now = new Date();
  const fecha = `${("0" + now.getDate()).slice(-2)} / ${
    datos.meses[now.getMonth()]
  } / ${now.getYear() - 100} `;
  return (
    <Gcc>
      <Gc.Consumer>
        { context => {
          return (
          <Fragment>
            <div className="w-100 pb1 bb b--white-50  inline-flex items-center justify-between">
              <div className="ttu f6 fw2">Recibo</div>
              <div className="ttu f6 fw2">{fecha}</div>
              <div className="ttu f6 fw2">nro 0000 - 0000</div>
            </div>
            <div className="flex flex-column pt3">
              <Campo color="gold" nombre="Nombre" />
              {context.state.items.map((c, i)=> <Concepto item={c} numero={i} quitarItem={context.quitarItem} changers={context.changers} key={uid()} />)}
              <button onClick={context.nuevoItem} className="br-pill b f4 gold w-10 bg-white b--white shadow-3">
                +
              </button>
            </div>
            <div className="pt3 f2 f2-m fw5 w-100 inline-flex items-center justify-end">
              $ {context.state.items.reduce((a, c)=>a+=c.precio,0)}
            </div>
            <div className="pt2 w-100 inline-flex items-center justify-end">
              <button className="br-pill b f4 gold w-20 bg-white b--white shadow-3">
                Cobrar
              </button>
            </div>
          </Fragment>
        )}}
      </Gc.Consumer>
    </Gcc>
  );
};
const Reportes = props => {
  return (
    <Fragment>
      <div className="w-100 pb1 bb b--white-50  inline-flex items-center justify-between">
        <div className="ttu f6 fw2">Recibo</div>
        <div className="ttu f6 fw2">26 / 01 / 2019</div>
        <div className="ttu f6 fw2">nro 0000 - 0000</div>
      </div>
      <div className="flex flex-column pt3">
        <label>Nombre</label>
        <input
          value="Bianca Mandaradoni"
          className="green w-30 ttu mb3 f6 fw6 bb bw-3 bg"
        />
        <div className="flex flex-row pt3">
          <div className="flex flex-column pt3 pr4">
            <label>Concepto</label>
            <select className="green w-100 ttu mb3 f6 fw6 bb">
              <option>Cuota Social</option>
            </select>
          </div>
          <div className="flex flex-column pt3 pr4">
            <label>Mes</label>
            <select className="green w-100 ttu mb3 f6 fw6 bb">
              <option>Marzo</option>
            </select>
          </div>
        </div>
        <div className="flex flex-row pt3">
          <div className="flex flex-column pt3 pr4">
            <label>Concepto</label>
            <select className="green w-100 ttu mb3 f6 fw6 bb">
              <option>Pedido de Fotos</option>
            </select>
          </div>
          <div className="flex flex-column pt3 pr4">
            <label>Codigo</label>
            <input
              value="123456"
              className="green w-100 ttu mb3 f6 fw6 bb bw-3 bg"
            />
          </div>
          <div className="flex flex-column pt3 pr4">
            <label>Tamaño</label>
            <select className="green w-100 ttu mb3 f6 fw6 bb">
              <option>15 x 20</option>
            </select>
          </div>
        </div>
        <button className="br-pill green w-10 bg-white b--white">+</button>
      </div>
      <div className="pt3 f2 f2-m fw5 w-100 inline-flex items-center justify-end">
        $ 50
      </div>
      <div className="pt2 w-100 inline-flex items-center justify-end">
        <a className="link dim white ttu f6 fw6" href="#" title="Contact">
          Cobrar
        </a>
      </div>
    </Fragment>
  );
};
const Cajas = props => {
  return (
    <Fragment>
      <div className="w-100 pb1 bb b--white-50  inline-flex items-center justify-between">
        <div className="ttu f6 fw2">Recibo</div>
        <div className="ttu f6 fw2">26 / 01 / 2019</div>
        <div className="ttu f6 fw2">nro 0000 - 0000</div>
      </div>
      <div className="flex flex-column pt3">
        <label>Nombre</label>
        <input
          value="Bianca Mandaradoni"
          className="green w-30 ttu mb3 f6 fw6 bb bw-3 bg"
        />
        <div className="flex flex-row pt3">
          <div className="flex flex-column pt3 pr4">
            <label>Concepto</label>
            <select className="green w-100 ttu mb3 f6 fw6 bb">
              <option>Cuota Social</option>
            </select>
          </div>
          <div className="flex flex-column pt3 pr4">
            <label>Mes</label>
            <select className="green w-100 ttu mb3 f6 fw6 bb">
              <option>Marzo</option>
            </select>
          </div>
        </div>
        <div className="flex flex-row pt3">
          <div className="flex flex-column pt3 pr4">
            <label>Concepto</label>
            <select className="green w-100 ttu mb3 f6 fw6 bb">
              <option>Pedido de Fotos</option>
            </select>
          </div>
          <div className="flex flex-column pt3 pr4">
            <label>Codigo</label>
            <input
              value="123456"
              className="green w-100 ttu mb3 f6 fw6 bb bw-3 bg"
            />
          </div>
          <div className="flex flex-column pt3 pr4">
            <label>Tamaño</label>
            <select className="green w-100 ttu mb3 f6 fw6 bb">
              <option>15 x 20</option>
            </select>
          </div>
        </div>
        <button className="br-pill green w-10 bg-white b--white">+</button>
      </div>
      <div className="pt3 f2 f2-m fw5 w-100 inline-flex items-center justify-end">
        $ 50
      </div>
      <div className="pt2 w-100 inline-flex items-center justify-end">
        <a className="link dim white ttu f6 fw6" href="#" title="Contact">
          Cobrar
        </a>
      </div>
    </Fragment>
  );
};
const Admin = props => {
  return (
    <Fragment>
      <div className="w-100 pb1 bb b--white-50  inline-flex items-center justify-between">
        <div className="ttu f6 fw2">Recibo</div>
        <div className="ttu f6 fw2">26 / 01 / 2019</div>
        <div className="ttu f6 fw2">nro 0000 - 0000</div>
      </div>
      <div className="flex flex-column pt3">
        <label>Nombre</label>
        <input
          value="Bianca Mandaradoni"
          className="green w-30 ttu mb3 f6 fw6 bb bw-3 bg"
        />
        <div className="flex flex-row pt3">
          <div className="flex flex-column pt3 pr4">
            <label>Concepto</label>
            <select className="green w-100 ttu mb3 f6 fw6 bb">
              <option>Cuota Social</option>
            </select>
          </div>
          <div className="flex flex-column pt3 pr4">
            <label>Mes</label>
            <select className="green w-100 ttu mb3 f6 fw6 bb">
              <option>Marzo</option>
            </select>
          </div>
        </div>
        <div className="flex flex-row pt3">
          <div className="flex flex-column pt3 pr4">
            <label>Concepto</label>
            <select className="green w-100 ttu mb3 f6 fw6 bb">
              <option>Pedido de Fotos</option>
            </select>
          </div>
          <div className="flex flex-column pt3 pr4">
            <label>Codigo</label>
            <input
              value="123456"
              className="green w-100 ttu mb3 f6 fw6 bb bw-3 bg"
            />
          </div>
          <div className="flex flex-column pt3 pr4">
            <label>Tamaño</label>
            <select className="green w-100 ttu mb3 f6 fw6 bb">
              <option>15 x 20</option>
            </select>
          </div>
        </div>
        <button className="br-pill green w-10 bg-white b--white">+</button>
      </div>
      <div className="pt3 f2 f2-m fw5 w-100 inline-flex items-center justify-end">
        $ 50
      </div>
      <div className="pt2 w-100 inline-flex items-center justify-end">
        <a className="link dim white ttu f6 fw6" href="#" title="Contact">
          Cobrar
        </a>
      </div>
    </Fragment>
  );
};
const Reporte = props => {
  return (
    <Fragment>
      <div className="w-100 pb1 bb b--white-50  inline-flex items-center justify-between">
        <div className="ttu f6 fw2">Pedidos</div>
      </div>
      <div className="pt3 f2 f2-m fw5 w-100 inline-flex items-center">49</div>
      <div className="pt2 w-100 inline-flex items-center justify-between">
        <a className="link dim white ttu f6 fw6" href="#" title="Contact">
          Ver Lista
        </a>
        <a className="link dim white ttu f6 fw6" href="#" title="Contact">
          Editar
        </a>
      </div>
    </Fragment>
  );
};
const Alumnos = props => {
  return (
    <Fragment>
      <div className="w-100 pb1 bb b--white-50  inline-flex items-center justify-between">
        <div className="ttu f6 fw2">Alumnos</div>
      </div>
      <div className="pt3 f2 f2-m fw5 w-100 inline-flex items-center">256</div>
      <div className="pt2 w-100 inline-flex items-center justify-between">
        <a className="link dim white ttu f6 fw6" href="#" title="Contact">
          Reporte
        </a>
        <a className="link dim white ttu f6 fw6" href="#" title="Contact">
          Agregar
        </a>
      </div>
    </Fragment>
  );
};
const Usuarios = props => {
  return (
    <Fragment>
      <div className="w-100 pb1 bb b--white-50  inline-flex items-center justify-between">
        <div className="ttu f6 fw2">Usuarios</div>
      </div>
      <div className="pt3 f2 f2-m fw5 w-100 inline-flex items-center">13</div>
      <div className="pt2 w-100 inline-flex items-center justify-between">
        <a className="link dim white ttu f6 fw6" href="#" title="Contact">
          Reporte
        </a>
        <a className="link dim white ttu f6 fw6" href="#" title="Contact">
          Agregar
        </a>
      </div>
    </Fragment>
  );
};

const Root = () => {
  return (
    <HashRouter>
      <div>
        <Nav
          links={[
            { text: "Home", href: "", color: "pink" },
            { text: "Nuevo recibo", href: "nuevoRecibo", color: "gold" },
            { text: "Reportes", href: "reportes", color: "light-blue" },
            { text: "Cajas", href: "cajas", color: "red" },
            { text: "Admin", href: "admin", color: "green" }
          ]}
        />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/home" component={Home} />
          <Route
            path="/nuevoRecibo"
            component={() => (
              <Gcc>
                <BigBox color="gold">
                  <NuevoRecibo />
                </BigBox>
              </Gcc>
            )}
          />
          <Route
            path="/reportes"
            component={() => (
              <BigBox color="light-blue">
                <Reportes />
              </BigBox>
            )}
          />
          <Route
            path="/cajas"
            component={() => (
              <BigBox color="red">
                <Cajas />
              </BigBox>
            )}
          />
          <Route
            path="/admin"
            component={() => (
              <BigBox color="green">
                <Admin />
              </BigBox>
            )}
          />
        </Switch>
      </div>
    </HashRouter>
  );
};

render(<Root />, document.querySelector("#app"));
