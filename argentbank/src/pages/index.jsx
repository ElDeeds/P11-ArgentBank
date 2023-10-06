import Banner from '../containers/Banner'
import Features from '../containers/Features'
import Header from '../containers/Header'
import Footer from '../containers/Footer'


function Index() {
  return (
    <>
      <Header />
      <main>
        <Banner />
        <Features />
      </main>
      <Footer />
    </>
  );
}
  
export default Index