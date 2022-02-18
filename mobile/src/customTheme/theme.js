import {extendTheme} from 'native-base';

const customTheme = extendTheme({
  colors: {
    // Add new color
    primary: {
      50: '#dbf4ff',
      100: '#addbff',
      200: '#7cc2ff',
      300: '#4aa9ff',
      400: '#1a91ff',
      500: '#0077e6',
      600: '#007AB8',
      700: '#004282',
      800: '#002851',
      900: '#000e21',
    },
  },
  components: {
    Button: {
      // Can simply pass default props to change default behaviour of components.
      baseStyle: {
        rounded: 'md',
      },
      defaultProps: {
        colorScheme: 'primary',
      },
    },
    Input: {
      baseStyle: {
        rounded: 'md',
      },
    },
    Heading: {
      baseStyle: {
        color: 'primary.500',
      },
    },
  },
  config: {
    // Changing initialColorMode to 'dark'
    initialColorMode: 'light',
  },
});

export default customTheme;
