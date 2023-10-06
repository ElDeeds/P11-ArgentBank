import Form from '../containers/Form'
import Header from '../containers/Header'
import Footer from '../containers/Footer'

function SignIn() {
  return (
    <>
    <Header />
      <div className="formContainer">
        <main className="main bg-dark"> 
          <section className="sign-in-content">
            <i className="fa fa-user-circle sign-in-icon"></i>
            <h1>Sign In</h1>
            <Form />
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
}
  
export default SignIn