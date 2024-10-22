import { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';

const useOrientation = () => {
  const [orientation, setOrientation] = useState({ width: 0, height: 0, isLandscape: false });

  const updateLayout = () => {
    const { width, height } = Dimensions.get('window');
    console.log(width>height)
    setOrientation({
        width,
        height,
        isLandscape: width > height,
      });
  };

  useEffect(() => {
    updateLayout();
    const subscription = Dimensions.addEventListener('change', updateLayout);
    return () => {
      subscription?.remove();
    };
  }, []);

  return orientation;
};

export default useOrientation;
