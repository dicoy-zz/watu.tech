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
  "Couta Social",
  "Materiales",
  "Emergencias",
  "Fotos",
  "Rifa",
  "Extraordinaria",
  "Donaciones"
]);
datos.agregar("tamaños", ["15 x 20", "20 x 30"]);

//contextos
const Gc = React.createContext();
class Gcc extends React.Component {
  state = {
    homeBoxes: datos.homeBoxes,
    items: [{}]
  };

  render() {
    return (
      <Gc.Provider
        value={{
          state: this.state,
          nuevoItem: () => this.setState({items:this.state.items.concat("")})
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
const Campo = ({ color, nombre }) => {
  return (
    <div className="flex flex-column pt1 pr3">
      <label>{nombre}</label>
      <input className={`${color} w5 mb3 f6 fw6 bb bw-3 bg`} />
    </div>
  );
};
const DropDown = ({ color, nombre, opciones }) => {
  return (
     <div className="flex flex-column pt1 pr3">
      <label>{nombre}</label>
      <select className={`${color} w-100 mb3 f6 fw6 bb`}>
        {opciones.map(opcion => <option key={uid()}>{opcion}</option>)}
      </select>
    </div>
  );
};
const Concepto = ({}) => {
  return (
    <div className="flex flex-row pt3">
      <DropDown color="gold" nombre="Concepto" opciones={datos.conceptos} />
      <DropDown color="gold" nombre="Mes" opciones={datos.meses} />
      <Campo color="gold" nombre="Acto" />
      <Campo color="gold" nombre="Codigo" />
      <DropDown color="gold" nombre="Tamaño" opciones={datos.tamaños} />
      <div className="flex flex-column pt1 pr3">
        <label>Precio</label>
        <label>${}</label>
      </div>
    </div>
  );
};

//secciones
const Home = props => {
  return (
    <Gcc>
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
    </Gcc>
  );
};
const NuevoRecibo = props => {
  const now = new Date();
  const fecha = `${("0" + now.getDate()).slice(-2)} / ${
    datos.meses[now.getMonth()]
  } / ${now.getYear() - 100} `;
  return (
    <Gc.Consumer>
      { context => (
        <Fragment>
          <div className="w-100 pb1 bb b--white-50  inline-flex items-center justify-between">
            <div className="ttu f6 fw2">Recibo</div>
            <div className="ttu f6 fw2">{fecha}</div>
            <div className="ttu f6 fw2">nro 0000 - 0000</div>
          </div>
          <div className="flex flex-column pt3">
            <Campo color="gold" nombre="Nombre" />
            {context.state.items.map((c)=><Concepto key={uid()} />)}
            <button onClick={context.nuevoItem} className="br-pill b f4 gold w-10 bg-white b--white shadow-3">
              +
            </button>
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
      )}
    </Gc.Consumer>
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

