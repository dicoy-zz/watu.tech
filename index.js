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

localStorage.setItem(
  "homeBoxes",
  JSON.stringify(["nuevoRecibo", "alumnos", "reporte"])
);

uid = (() => {
  let i = 0;
  return () => {
    return i++;
  };
})();


const gc = React.createContext();

/* A "smart" container to hold state */
class gcc extends React.Component {
  state = {
    homeBoxes: local('homeBoxes'),
    nombre: "",
    items:[],
    monto: 0    
  }

  render() {
    const { companyName, employees, name, teamName, teams, title } = this.state;
    
    return (
      // Create a Provider from the Context, pass in state values
      <CompanyContext.Provider
        value={{
          companyName,
          employees,
          name,
          teamName,
          teams,
          title,
        }} >
        <Company />
      </CompanyContext.Provider>
    )
  }
}

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
                className="link dim white dib mr3"
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
const bigBox = props => {};
const Home = props => {
  return (
    <Fragment>
      <NuevoRecibo />
      <Reportes />
      <Cajas />
      <Admin />
    </Fragment>
  );
};
const NuevoRecibo = props => {
  const now = new Date();
  const fecha = `${("0" + now.getDate()).slice(-2)} / ${
    [
      "Ene","Feb","Mar","Abr",
      "May","Jun","Jul","Ago",
      "Sep","Oct","Nov","Dic"
    ][now.getMonth()]
  } / ${now.getYear() - 100} `;
  return (
    <section className="avenir w-100 pa2 pt5">
      <article className="fl w-100 pa2">
        <div className="bg-green white w-100 mt3 pa3 br3">
          <div className="w-100 pb1 bb b--white-50  inline-flex items-center justify-between">
            <div className="ttu f6 fw2">Recibo</div>
            <div className="ttu f6 fw2">{fecha}</div>
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
        </div>
      </article>
    </section>
  );
};
const Reportes = props => {
  return (
    <section className="avenir w-100 pa2 pt5">
      <article className="fl w-100 pa2">
        <div className="bg-red white w-100 mt3 pa3 br3">
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
        </div>
      </article>
    </section>
  );
};
const Cajas = props => {
  return (
    <section className="avenir w-100 pa2 pt5">
      <article className="fl w-100 pa2">
        <div className="bg-blue white w-100 mt3 pa3 br3">
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
        </div>
      </article>
    </section>
  );
};
const Admin = props => {
  return (
    <section className="avenir w-100 pa2 pt5">
      <article className="fl w-100 pa2">
        <div className="bg-gold white w-100 mt3 pa3 br3">
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
        </div>
      </article>
    </section>
  );
};

const Root = () => {
  return (
    <HashRouter>
      <div>
        <Nav
          links={[
            { text: "Home", href: "home", color: "pink" },
            { text: "Nuevo recibo", href: "nuevoRecibo", color: "gold" },
            { text: "Reportes", href: "reportes", color: "light-blue" },
            { text: "Cajas", href: "cajas", color: "red" },
            { text: "Admin", href: "admin", color: "green" }
          ]}
        />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/home" component={Home} />
          <Route path="/nuevoRecibo" component={NuevoRecibo} />
          <Route path="/reportes" component={Reportes} />
          <Route path="/cajas" component={Cajas} />
          <Route path="/admin" component={Admin} />
        </Switch>
      </div>
    </HashRouter>
  );
};

render(<Root />, document.querySelector("#app"));

