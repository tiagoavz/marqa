import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Showreel } from './components/Showreel';
import { Services } from './components/Services';
import { SelectedWork } from './components/SelectedWork';
import { ClientPortfolio } from './components/ClientPortfolio';
import { Results } from './components/Results';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <Header />
      <main id="conteudo">
        <Hero />
        <Showreel />
        <Services />
        <SelectedWork />
        <ClientPortfolio />
        <Results />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
