import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function Population() {
  return (
    <main className="container px-4 py-4">
      <div className="row">
        <aside className="col-md-3">
          <nav className="sticky-top pt-3" aria-label="Зміст сторінки">
            <h2 className="h4">Зміст</h2>
            <ul className="nav flex-column">
              <a href="#continentsList" className="nav-link" data-bs-toggle="collapse">Континенти</a>
              <a href="#subcontinentsList" className="nav-link" data-bs-toggle="collapse">Субконтиненти</a>
              <a href="#countriesList" className="nav-link" data-bs-toggle="collapse">Країни</a>
              <a href="#introducedList" className="nav-link" data-bs-toggle="collapse">Інтродуковані</a>
              <a href="#biogeographicList" className="nav-link" data-bs-toggle="collapse">Біогеографічні зони</a>
              <a href="#biomesList" className="nav-link" data-bs-toggle="collapse">Біоми WWF</a>
            </ul>
          </nav>
        </aside>

        <article className="col-md-9">
          <h2 className="h2 text-success mb-4">Ареал поширення пум</h2>

          {/* Континенти */}
          <section id="continents" className="mt-4">
            <h3>
              <button className="btn btn-success w-100 text-start" data-bs-toggle="collapse" data-bs-target="#continentsList" aria-expanded="false">
                Континенти
              </button>
            </h3>
            <div className="collapse" id="continentsList">
              <ul className="list-group mb-3">
                <li className="list-group-item">Північна Америка</li>
                <li className="list-group-item">Південна Америка</li>
              </ul>
            </div>
          </section>

          {/* Субконтиненти */}
          <section id="subcontinents" className="mt-4">
            <h3>
              <button className="btn btn-success w-100 text-start" data-bs-toggle="collapse" data-bs-target="#subcontinentsList" aria-expanded="false">
                Субконтиненти
              </button>
            </h3>
            <div className="collapse" id="subcontinentsList">
              <ul className="list-group mb-3">
                <li className="list-group-item">Південна Америка (Андські країни)</li>
                <li className="list-group-item">Північна Америка (захід США, Канада, Мексика)</li>
              </ul>
            </div>
          </section>

          {/* Країни */}
          <section id="countries" className="mt-4">
            <h3>
              <button className="btn btn-success w-100 text-start" data-bs-toggle="collapse" data-bs-target="#countriesList" aria-expanded="false">
                Країни
              </button>
            </h3>
            <div className="collapse" id="countriesList">
              <ul className="list-group mb-3 list-columns">
                <li className="list-group-item">Канада</li>
                <li className="list-group-item">США</li>
                <li className="list-group-item">Мексика</li>
                <li className="list-group-item">Колумбія</li>
                <li className="list-group-item">Бразилія</li>
                <li className="list-group-item">Аргентина</li>
                <li className="list-group-item">Перу</li>
                <li className="list-group-item">Болівія</li>
                <li className="list-group-item">Чилі</li>
                <li className="list-group-item">Уругвай</li>
              </ul>
            </div>
          </section>

          {/* Інтродуковані */}
          <section id="introduced" className="mt-4">
            <h3>
              <button className="btn btn-success w-100 text-start" data-bs-toggle="collapse" data-bs-target="#introducedList" aria-expanded="false">
                Інтродуковані регіони
              </button>
            </h3>
            <div className="collapse" id="introducedList">
              <ul className="list-group mb-3">
                <li className="list-group-item">Не інтродукована – ендемік Америк</li>
              </ul>
            </div>
          </section>

          {/* Біогеографічні зони */}
          <section id="biogeographic" className="mt-4">
            <h3>
              <button className="btn btn-success w-100 text-start" data-bs-toggle="collapse" data-bs-target="#biogeographicList" aria-expanded="false">
                Біогеографічні зони
              </button>
            </h3>
            <div className="collapse" id="biogeographicList">
              <ul className="list-group mb-3">
                <li className="list-group-item">Неарктика</li>
                <li className="list-group-item">Неотропіка</li>
              </ul>
            </div>
          </section>

          {/* Біоми */}
          <section id="biomes" className="mt-4">
            <h3>
              <button className="btn btn-success w-100 text-start" data-bs-toggle="collapse" data-bs-target="#biomesList" aria-expanded="false">
                Біоми WWF
              </button>
            </h3>
            <div className="collapse" id="biomesList">
              <ul className="list-group">
                <li className="list-group-item">Тропічні та субтропічні ліси</li>
                <li className="list-group-item">Пустелі і напівпустелі</li>
                <li className="list-group-item">Гірські біоми</li>
                <li className="list-group-item">Савани та чагарники</li>
              </ul>
            </div>
          </section>
        </article>
      </div>
    </main>
  );
}

export default Population;
