import {Navigate,useLocation} from 'react-router-dom';
import {useAuth} from './authContext';
import AuthPage from './AuthPage';
import './account.css';
export default function AuthGate({children}){
  const {user,loading,error,retry}=useAuth();const location=useLocation();
  const authRoute=['/login','/signup'].includes(location.pathname);
  if(loading)return <main className="ac-loading" role="status"><img src="/images/main-logo.png" alt="JVLIVN"/><p>Opening your learning space…</p></main>;
  if(error)return <main className="ac-loading"><img src="/images/main-logo.png" alt="JVLIVN"/><h1>Let’s get you connected.</h1><p role="alert">{error}</p><button onClick={retry}>Try again</button></main>;
  if(user)return authRoute?<Navigate to="/profile" replace/>:children;
  if(!authRoute)return <Navigate to={`/login?next=${encodeURIComponent(location.pathname+location.search)}`} replace/>;
  return <AuthPage key={location.pathname} mode={location.pathname==='/signup'?'signup':'login'}/>;
}
