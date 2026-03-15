import { Text } from 'react-native';
import React, { useMemo } from 'react';
import { PropsIconSvg } from './types';
import Notes from './Icons/Notes';
import Search from './Icons/Search';
import Home from './Icons/Home';
import FolderPlus from './Icons/FolderPlus';
import ArrowRight from './Icons/ArrowRight';
import ArrowLeft from './Icons/ArrowLeft';
import Folder from './Icons/Folder';
import Gear from './Icons/Gear';

export default function IconsSvg(props: PropsIconSvg) {
  const { name, ...argsProp } = props;

  const memoIcon = useMemo(() => {
    switch (name) {
      case 'note':
        return <Notes {...argsProp} />;
      case 'folder':
        return <Folder {...argsProp} />;
      case 'gear':
        return <Gear {...argsProp} />;
      case 'search':
        return <Search {...argsProp} />;
      case 'home':
        return <Home {...argsProp} />;
      case 'folderPlus':
        return <FolderPlus {...argsProp} />;
      case 'arrowleft':
        return <ArrowLeft {...argsProp} />;
      case 'arrowRight':
        return <ArrowRight {...argsProp} />;
      default:
        return <Text>?</Text>;
    }
  }, [name, argsProp]);

  return memoIcon;
}
