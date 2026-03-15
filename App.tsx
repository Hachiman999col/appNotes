import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RouterContext, RouterProvider } from './src/context/routerContext';
import {
  Fragment,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import Login from './src/views/Login';

import MainContainer from './src/components/containers/MainContainer';
import View404 from './src/views/View404';
import Main from './src/views/Main';
import Folder from './src/views/Folder';
import Config from './src/views/Config';
import TransitionModal from './src/components/ui/TransitionModal';
import MenuFooter from './src/components/sections/MenuFooter';
import Note from './src/views/Note';
import FolderNotes from './src/views/FolderNotes';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <RouterProvider defaultRoute="Login">
      <SafeAreaProvider>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <AppContent />
      </SafeAreaProvider>
    </RouterProvider>
  );
}

function AppContent() {
  const { routeName } = useContext(RouterContext);

  const [showTransition, setShowTransition] = useState(false);
  const [internalName, setInternalName] = useState(routeName);

  const renderView: ReactNode = useMemo(() => {
    switch (internalName) {
      case 'Login':
        return <Login />;

      case 'note':
        return <Note />;
      case 'homeMain':
        return <Main />;

      case 'folderMain':
        return <Folder />;
      case 'folderNotes':
        return <FolderNotes />;
      case 'configMain':
        return <Config />;

      default:
        return <View404 />;
    }
  }, [internalName]);

  useEffect(() => {
    if (routeName === 'Login') return;

    setShowTransition(true);
    setTimeout(() => {
      setInternalName(routeName);
    }, 300);
    setTimeout(() => {
      setShowTransition(false);
    }, 1200);

    return () => {
      setShowTransition(false);
    };
  }, [routeName]);

  return (
    <Fragment>
      <TransitionModal open={showTransition} />

      <MainContainer>
        {renderView}
        {internalName !== 'Login' && internalName !== 'note' && <MenuFooter />}
      </MainContainer>
    </Fragment>
  );
}

export default App;
