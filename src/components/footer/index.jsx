function Footer() {
  return (
    <>
      <section className="bg-success bg-opacity-50 pt-3" >
        <footer>
          <div className="d-flex flex-wrap  justify-content-center align-items-center gap-4">
            © 2025 Criadoras:
            <h6>
              <a
                className="text-body"
                target="_blank"
                href="https://www.github.com/iingridliveira"
              >
                @iingridliveira
              </a>
            </h6>
            <h6>
              <a
                className="text-body"
                target="_blank"
                href="https://www.github.com/xeniabia"
              >
                @xeniabia
              </a>
            </h6>
            <h6>
              <a
                className="text-body"
                target="_blank"
                href="https://github.com/Equipe-5AVANTE"
              >
                Organização Git hub
              </a>
            </h6>
          </div>
          <div className="text-center py-3">
            <p className="text-muted">
              Atividade proposta pelo projeto Capacita Brasil Residência em Tic,
              junto à Escola Atlântico Avanti e professor Eliakim Gama
            </p>
          </div>
        </footer>
      </section>
    </>
  );
}
export default Footer;
