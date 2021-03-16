import Header from '../components/header'
import Footer from '../components/footer'
import { withNamespaces } from 'react-i18next';
import i18n from '../src/i18n';
import Tutol from '../components/tutol'
function Layout({ children, t }) {
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  }
  return (
    <>
      <Header />
        <button onClick={() => changeLanguage('vi')}>vi</button>
        <button onClick={() => changeLanguage('en')}>en</button>
        <h1>{t('Welcome to React')}</h1>
        <h1>{t('t')}</h1>
        <Tutol/>
        <main>
          {children}
        </main>
      <Footer />
    </>
  )
}
export default withNamespaces()(Layout);