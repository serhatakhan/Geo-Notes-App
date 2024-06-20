import {Colors} from '../theme/colors';

// bu fonksiyona dışardan index sayısı gelecek
export const setColors = index => {
  // gelen sayının 10'a bölümünden kalanına göre durumlara bak
  switch (index % 10) {
    case 0:
      return Colors.BLUE;
    case 1:
      return Colors.GOOGLE;
    case 2:
      return Colors.YELLOW;
    case 3:
      return Colors.ORANGE;
    case 4:
      return Colors.BLUE2;
    case 5:
      return Colors.GREEN;
    case 6:
      return Colors.BLUE;
    case 7:
      return Colors.RED;
    case 8:
      return Colors.YELLOW;
    case 9:
      return Colors.ORANGE;
    case 10:
      return Colors.BLUE2;
    default:
      return Colors.ORANGE;
  }
};
