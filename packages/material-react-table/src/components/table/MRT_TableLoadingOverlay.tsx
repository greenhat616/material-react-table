import Box from '@mui/material/Box';
import CircularProgress, {
  type CircularProgressProps,
} from '@mui/material/CircularProgress';
import { alpha } from '@mui/material/styles';
import { type MRT_RowData, type MRT_TableInstance } from '../../types';
import { parseFromValuesOrFunc } from '../../utils/utils';
import { colorMixAlpha } from '../../utils/style.utils';

export interface MRT_TableLoadingOverlayProps<TData extends MRT_RowData>
  extends CircularProgressProps {
  table: MRT_TableInstance<TData>;
}

export const MRT_TableLoadingOverlay = <TData extends MRT_RowData>({
  table,
  ...rest
}: MRT_TableLoadingOverlayProps<TData>) => {
  const {
    options: {
      id,
      localization,
      mrtTheme: { baseBackgroundColor, baseBackgroundDarkColor },
      muiCircularProgressProps,
    },
  } = table;

  const circularProgressProps = {
    ...parseFromValuesOrFunc(muiCircularProgressProps, { table }),
    ...rest,
  };

  return (
    <Box
      sx={(theme) => ({
        alignItems: 'center',
        backgroundColor: theme.vars
          ? colorMixAlpha(baseBackgroundColor, 0.5)
          : alpha(baseBackgroundColor, 0.5),
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        left: 0,
        maxHeight: '100vh',
        position: 'absolute',
        right: 0,
        top: 0,
        width: '100%',
        zIndex: 3,
        ...theme.applyStyles('dark', {
          backgroundColor: theme.vars
            ? colorMixAlpha(baseBackgroundDarkColor, 0.5)
            : alpha(baseBackgroundDarkColor, 0.5),
        }),
      })}
    >
      {circularProgressProps?.Component ?? (
        <CircularProgress
          aria-label={localization.noRecordsToDisplay}
          id={`mrt-progress-${id}`}
          {...circularProgressProps}
        />
      )}
    </Box>
  );
};
