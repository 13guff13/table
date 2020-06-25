import { mergeStyleSets } from '@fluentui/react/lib/Styling';
import { initializeIcons } from '@fluentui/react/lib/Icons';
initializeIcons();

export const theme = mergeStyleSets({
  moderateValue: {
    backgroundColor: '#FFE45E',
  },
  criticalValue: {
    backgroundColor: '#F50049',
  },
  heighlitedValue: {
    backgroundColor: 'yellow',
  },
  headerClassName: {
    background: '#5AA9E6',
  },
});