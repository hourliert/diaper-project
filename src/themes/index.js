import { Styles, Utils } from 'material-ui';

export default {
  spacing: Styles.Spacing,
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: Styles.Colors.blue500,
    primary2Color: Styles.Colors.blue700,
    primary3Color: Styles.Colors.grey400,
    accent1Color: Styles.Colors.redA200,
    accent2Color: Styles.Colors.grey100,
    accent3Color: Styles.Colors.grey500,
    textColor: Styles.Colors.darkBlack,
    alternateTextColor: Styles.Colors.white,
    canvasColor: Styles.Colors.white,
    borderColor: Styles.Colors.grey300,
    disabledColor: Utils.ColorManipulator.fade(Styles.Colors.darkBlack, 0.3),
  },
};
