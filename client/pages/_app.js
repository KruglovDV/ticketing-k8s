import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../api/build-client';
import Header from '../components/header';

const AppComponent = ({ Component, pageProps, currentUser }) => {
  return <div>
      <Header currentUser={currentUser} />
      <Component {...pageProps} currentUser={currentUser} />
    </div>;
};

AppComponent.getInitialProps = async (context) => {
  let pageProps = {};

  if (context.Component.getInitialProps) {
    pageProps = await context.Component.getInitialProps(context.ctx)
  }
  
  try {
    const { data } = await buildClient(context.ctx).get('/api/users/currentuser');
    return { ...data, pageProps };
  } catch (error) {
    return { currentUser: null, pageProps };
  }
};

export default AppComponent;